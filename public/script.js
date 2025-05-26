const reels = [
    'https://www.instagram.com/vivamosba/reel/DJFjImbOmnM/',
    'https://www.instagram.com/vivamosba/reel/DIkKFZTuDq9/',
    'https://www.instagram.com/vivamosba/reel/DIe4W0pu427/',
    'https://www.instagram.com/vivamosba/reel/DH9nnVFuQOq/',
    'https://www.instagram.com/vivamosba/reel/DIPiEbKOg_V/',
    'https://www.instagram.com/vivamosba/reel/DHJ8B3WuKm6/',
    'https://www.instagram.com/vivamosba/reel/DG39ftMOm4y/',
    'https://www.instagram.com/vivamosba/reel/DHE5NcSuPAs/',
    'https://www.instagram.com/vivamosba/reel/DGobQw1uISc/',
    'https://www.instagram.com/vivamosba/reel/DGT32QIuPGr/',
    'https://www.instagram.com/vivamosba/reel/DF_RL5bSFKR/',
    'https://www.instagram.com/vivamosba/reel/DFtNOJ4SdKg/',
    'https://www.instagram.com/vivamosba/reel/DEqcEutSpzQ/',
    'https://www.instagram.com/vivamosba/reel/DFBYe9qS9NB/',
    'https://www.instagram.com/vivamosba/reel/DEipGOXyAi9/',
    'https://www.instagram.com/vivamosba/reel/DEVr7afShdX/',
    'https://www.instagram.com/vivamosba/reel/DEIy64Cy1mI/',
    'https://www.instagram.com/vivamosba/reel/DDiLO0oSCqw/',
    'https://www.instagram.com/vivamosba/reel/DCpmOxySvpB/',
    'https://www.instagram.com/vivamosba/reel/DCxcnHLsg_q/',
    'https://www.instagram.com/vivamosba/reel/DDDdyITuzZl/',
    'https://www.instagram.com/vivamosba/reel/DCh_xH6sotx/',
    'https://www.instagram.com/vivamosba/reel/DCXrhcYv2T-/',
    'https://www.instagram.com/vivamosba/reel/DCIJfk9Sehd/',
    'https://www.instagram.com/vivamosba/reel/DB7U7IBP3__/',
    'https://www.instagram.com/vivamosba/reel/DBzby1_ya7G/',
    'https://www.instagram.com/vivamosba/reel/DBpUBE1sCVF/',
    'https://www.instagram.com/vivamosba/reel/DBZ5F16tdus/',
    'https://www.instagram.com/vivamosba/reel/DBPiixAMgMC/',
    'https://www.instagram.com/vivamosba/reel/DBFRtq_MWWl/',
    'https://www.instagram.com/vivamosba/reel/DA9cvfBSa4T/',
    'https://www.instagram.com/vivamosba/reel/DAzMkv6vFm-/',
    'https://www.instagram.com/vivamosba/reel/DARxM7GMsoX/',
    'https://www.instagram.com/vivamosba/reel/C_wRdqEM9Vs/',
    'https://www.instagram.com/vivamosba/reel/C_eQyLgMjs3/',
    'https://www.instagram.com/vivamosba/reel/C_Os5kev4Nt/',
    'https://www.instagram.com/vivamosba/reel/C_B0GwrSU7P/',
    'https://www.instagram.com/vivamosba/reel/C-0_mldP3fe/',
    'https://www.instagram.com/vivamosba/reel/C-oMZtIPv6O/',
    'https://www.instagram.com/vivamosba/reel/C-d1PwAPrsN/',
    'https://www.instagram.com/vivamosba/reel/C9yG69XvNGt/',
    'https://www.instagram.com/vivamosba/reel/C-LylpOvC9t/',
    'https://www.instagram.com/vivamosba/reel/C9s3dmQPIW6/',
    'https://www.instagram.com/vivamosba/reel/C9VpY3ivcSK/',
    'https://www.instagram.com/vivamosba/reel/C9lPCSXvyEk/',
    'https://www.instagram.com/vivamosba/reel/C9QnDzFPlF5/',
    'https://www.instagram.com/vivamosba/reel/C825wCBss8f/',
    'https://www.instagram.com/vivamosba/reel/C8kzo0zvwZW/',
    'https://www.instagram.com/vivamosba/reel/C8VfE45scCX/',
    'https://www.instagram.com/vivamosba/reel/C8NqgQOP46E/',
    'https://www.instagram.com/vivamosba/reel/C8BEFZEtc9c/',
    'https://www.instagram.com/vivamosba/reel/C8IZpzfvSEq/'
];

function openRandomReel() {
    const randomIndex = Math.floor(Math.random() * reels.length);
    window.open(reels[randomIndex], '_blank');
}

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
        li.classList.add('custom-list');
        const span = document.createElement('span');
        span.textContent = item.text;
        span.classList.add('item-text');
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