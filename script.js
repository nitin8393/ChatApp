const socket = io();
let username = "";

function login() {
  const input = document.getElementById("username");
  if (input.value.trim() !== "") {
    username = input.value.trim();
    document.getElementById("login").classList.add("hidden");
    document.getElementById("chat").classList.remove("hidden");
    document.getElementById("userTitle").innerText = "Chatting as " + username;
    socket.emit("join", username);
  }
}

function logout() {
  location.reload();
}

document.getElementById("chat-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const messageInput = document.getElementById("message");
  const message = messageInput.value;
  if (message.trim() !== "") {
    socket.emit("message", { user: username, text: message });
    messageInput.value = "";
  }
});

socket.on("message", (data) => {
  const chatBox = document.getElementById("chat-box");
  const msg = document.createElement("p");
  msg.textContent = data.user + ": " + data.text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
});