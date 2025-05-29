import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getDatabase, ref, onValue, push, remove, update } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyB6zxXJIIc3w-tLK8VjKyeDoG1g7wjKDyU",
    authDomain: "mooor-f5d7e.firebaseapp.com",
    databaseURL: "https://mooor-f5d7e-default-rtdb.firebaseio.com/",
    projectId: "mooor-f5d7e",
    storageBucket: "mooor-f5d7e.firebasestorage.app",
    messagingSenderId: "201169950221",
    appId: "1:201169950221:web:80a3269232402d765b6744"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const reels = [
    'DJFjImbOmnM',
    'DIkKFZTuDq9',
    'DIe4W0pu427',
    'DH9nnVFuQOq',
    'DIPiEbKOg_V',
    'DHJ8B3WuKm6',
    'DG39ftMOm4y',
    'DHE5NcSuPAs',
    'DGobQw1uISc',
    'DGT32QIuPGr',
    'DF_RL5bSFKR',
    'DFtNOJ4SdKg',
    'DEqcEutSpzQ',
    'DFBYe9qS9NB',
    'DEipGOXyAi9',
    'DEVr7afShdX',
    'DEIy64Cy1mI',
    'DDiLO0oSCqw',
    'DCpmOxySvpB',
    'DCxcnHLsg_q',
    'DDDdyITuzZl',
    'DCh_xH6sotx',
    'DCXrhcYv2T-',
    'DCIJfk9Sehd',
    'DB7U7IBP3__',
    'DBzby1_ya7G',
    'DBpUBE1sCVF',
    'DBZ5F16tdus',
    'DBPiixAMgMC',
    'DBFRtq_MWWl',
    'DA9cvfBSa4T',
    'DAzMkv6vFm-',
    'DARxM7GMsoX',
    'C_wRdqEM9Vs',
    'C_eQyLgMjs3',
    'C_Os5kev4Nt',
    'C_B0GwrSU7P',
    'C-0_mldP3fe',
    'C-oMZtIPv6O',
    'C-d1PwAPrsN',
    'C9yG69XvNGt',
    'C-LylpOvC9t',
    'C9s3dmQPIW6',
    'C9VpY3ivcSK',
    'C9lPCSXvyEk',
    'C9QnDzFPlF5',
    'C825wCBss8f',
    'C8kzo0zvwZW',
    'C8VfE45scCX',
    'C8NqgQOP46E',
    'C8BEFZEtc9c',
    'C8IZpzfvSEq'
];

const itemsRef = ref(db, "items");

const form = document.getElementById("form");
const input = document.getElementById("itemInput");
const list = document.getElementById("itemList");

function renderItems(items) {
    list.innerHTML = "";
    Object.entries(items || {}).forEach(([key, item]) => {
        const li = document.createElement("li");
        li.classList.add("custom-list");

        const span = document.createElement("span");
        span.textContent = item.text;
        span.classList.add("item-text");
        if (item.done) span.classList.add("done");
        span.addEventListener("click", () => {
            update(ref(db, `items/${key}`), { done: !item.done });
        });

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "❌";
        removeBtn.classList.add("button-link");
        removeBtn.onclick = () => remove(ref(db, `items/${key}`));

        li.appendChild(span);
        li.appendChild(removeBtn);
        list.appendChild(li);
    });
}

let updateTimeout;
onValue(itemsRef, (snapshot) => {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
        renderItems(snapshot.val());
    }, 2000);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text !== "") {
        push(itemsRef, { text, done: false });
        input.value = "";
    }
});

window.openRandomReel = function() {
    console.log("Random Reel Opened!");
    const random = reels[Math.floor(Math.random() * reels.length)];
    const appUrl = `instagram://reel/${random}`;
    const webUrl = `https://www.instagram.com/reel/${random}`;

    window.location.href = appUrl;

    setTimeout(() => {
        window.location.href = webUrl;
    }, 1500);
}

window.db = db;
window.firebaseRefs = { ref, onValue, push, remove, update };

console.log('Tremendo viaje MOOOR')