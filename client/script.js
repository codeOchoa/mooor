const checkboxes = document.querySelectorAll('.checkbox');

function checkAllSelected() {
    const allSelected = Array.from(checkboxes).every(checkbox => checkbox.checked);
    if (allSelected) {
        alert("¡Ya están todo!");
    }
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', checkAllSelected);
});

const socket = io('https://mooor.vercel.app/');

const form = document.getElementById('form');
const input = document.getElementById('itemInput');
const list = document.getElementById('itemList');

let localBackup = JSON.parse(localStorage.getItem('materiales')) || [];

function renderItems(items) {
    list.innerHTML = '';
    items.forEach((item, index) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = item.text;
        if (item.done) span.classList.add('done');
        span.addEventListener('click', () => {
            socket.emit('toggleItem', index);
        });

        const removeBtn = document.createElement('button');
        removeBtn.textContent = '❌';
        removeBtn.onclick = () => socket.emit('removeItem', index);

        li.appendChild(span);
        li.appendChild(removeBtn);
        list.appendChild(li);
    });

    localStorage.setItem('materiales', JSON.stringify(items));
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (text !== '') {
        socket.emit('addItem', text);
        input.value = '';
    }
});

socket.on('updateList', items => {
    renderItems(items);
});

socket.on('connect_error', () => {
    renderItems(localBackup);
});

console.log('Tremendo viaje esquizo')