"use strict";

const socket = io();

function appendElement(message) {
    const item = document.createElement("p");
    item.innerText = message;
    const ch = document.getElementById("chat-history");

    // append message and scroll down
    ch.appendChild(item);
    ch.scrollTop = ch.scrollHeight;
}

document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    const inp = document.getElementById("m");
    socket.emit("chat message", inp.value);
    inp.value = "";
});

socket.on("chat message", msg => {
    appendElement(msg);
});


