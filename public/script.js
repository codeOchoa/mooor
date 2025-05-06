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

const socket = io('https://mooor-server.onrender.com/');

const form = document.getElementById('form');
const input = document.getElementById('itemInput');
const list = document.getElementById('itemList');

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
        removeBtn.classList.add('button-link');
        removeBtn.onclick = () => socket.emit('removeItem', index);

        li.appendChild(span);
        li.appendChild(removeBtn);
        list.appendChild(li);
    });

    const STORAGE_KEY = 'mooor_materiales';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
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

console.log('Tremendo viaje esquizo')