import { db } from "./config";
import { getDatabase, ref, push, set, onValue, update, remove } from "firebase/firebase-database.js";

const reels = [
    'DJFjImbOmnM/',
    'DIkKFZTuDq9/',
    'DIe4W0pu427/',
    'DH9nnVFuQOq/',
    'DIPiEbKOg_V/',
    'DHJ8B3WuKm6/',
    'DG39ftMOm4y/',
    'DHE5NcSuPAs/',
    'DGobQw1uISc/',
    'DGT32QIuPGr/',
    'DF_RL5bSFKR/',
    'DFtNOJ4SdKg/',
    'DEqcEutSpzQ/',
    'DFBYe9qS9NB/',
    'DEipGOXyAi9/',
    'DEVr7afShdX/',
    'DEIy64Cy1mI/',
    'DDiLO0oSCqw/',
    'DCpmOxySvpB/',
    'DCxcnHLsg_q/',
    'DDDdyITuzZl/',
    'DCh_xH6sotx/',
    'DCXrhcYv2T-/',
    'DCIJfk9Sehd/',
    'DB7U7IBP3__/',
    'DBzby1_ya7G/',
    'DBpUBE1sCVF/',
    'DBZ5F16tdus/',
    'DBPiixAMgMC/',
    'DBFRtq_MWWl/',
    'DA9cvfBSa4T/',
    'DAzMkv6vFm-/',
    'DARxM7GMsoX/',
    'C_wRdqEM9Vs/',
    'C_eQyLgMjs3/',
    'C_Os5kev4Nt/',
    'C_B0GwrSU7P/',
    'C-0_mldP3fe/',
    'C-oMZtIPv6O/',
    'C-d1PwAPrsN/',
    'C9yG69XvNGt/',
    'C-LylpOvC9t/',
    'C9s3dmQPIW6/',
    'C9VpY3ivcSK/',
    'C9lPCSXvyEk/',
    'C9QnDzFPlF5/',
    'C825wCBss8f/',
    'C8kzo0zvwZW/',
    'C8VfE45scCX/',
    'C8NqgQOP46E/',
    'C8BEFZEtc9c/',
    'C8IZpzfvSEq/'
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
    }, 5000);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text !== "") {
        push(itemsRef, { text, done: false });
        input.value = "";
    }
});

function openRandomReel() {
    const random = reels[Math.floor(Math.random() * reels.length)];
    const appUrl = `instagram://reel/${random}`;
    const webUrl = `https://www.instagram.com/reel/${random}`;

    window.location.href = appUrl;

    setTimeout(() => {
        window.location.href = webUrl;
    }, 1500);
}

console.log('Tremendo viaje MOOOR')