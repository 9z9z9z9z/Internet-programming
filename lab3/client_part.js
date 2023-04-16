// Переменные

let userName;
let countReceived = 0;
let chatData;
let usedNames = [];

let socket = new WebSocket('ws://localhost:1337');

var chatList = document.querySelector(".chat-list");

// Заполнение сообщений при нажатии кнопки авторизации
var btnLogin = document.querySelector(".btn-login");
var inputName = document.querySelector(".input-name");

// Добавление новых сообщений
var btnSend = document.querySelector(".btn-send");
var inputMessage = document.querySelector(".input-message");

// Переменные



// События с сервера

window.addEventListener('beforeunload', function() {
	let data = JSON.stringify({ "close": userName });
	socket.send(data);
	console.log(data);
	socket.close();
});

socket.onopen = function(e) {
	console.log("[open] Соединение установлено");
};

socket.onmessage = function(event) {
	if (countReceived === 0) {
        chatData = JSON.parse(event.data);
    } else if (countReceived === 1) {
		usedNames = JSON.parse(event.data).list;
		console.log(JSON.parse(event.data).list);
	} else {
        chatData.messages.push(JSON.parse(event.data));
        let info = JSON.parse(event.data);
        newMessage(info[0], info[1], info[2], info[3]);
    }
    countReceived += 1;
};

socket.onclose = function(event) {
	if (event.wasClean) {
		console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
	} else {
		console.log('[close] Соединение прервано');
	}
};

socket.onerror = function(error) {
    console.log(error.data);
};

// Функции

function newMessage(id, author, time, message) {
    if (userName !== "") {
        var newMessage = {
            id: id,
            author: author,
            time: time,
            message: message
        };
        if (newMessage.message !== "") {
            chatData.messages.push(newMessage);
    
            var chatItem = document.createElement("div");
            var chatText = document.createElement("div");
            //var chatMeta = document.createElement("div");
            var chatName = document.createElement("span");
            var chatTime = document.createElement("span");
    
            if (newMessage.author === userName) {
                chatItem.classList.add("chat-item--outgoing");
                chatText.classList.add("chat-text--outgoing");
                //chatMeta.classList.add("chat-meta");
                chatName.classList.add("chat-name");
                chatTime.classList.add("chat-time");
                inputMessage.value = "";
            } else {
                chatItem.classList.add("chat-item");
                chatText.classList.add("chat-text");
                //chatMeta.classList.add("chat-meta");
                chatName.classList.add("chat-name");
                chatTime.classList.add("chat-time");
            }
    
            chatText.textContent = newMessage.message;
            chatName.textContent = newMessage.author;
            chatTime.textContent = newMessage.time;
    
            // chatMeta.appendChild(chatName);
            // chatMeta.appendChild(chatTime);
    
            chatItem.appendChild(chatText);
            //chatItem.appendChild(chatMeta);
    
            chatList.appendChild(chatItem);
        }
    } else {
        alert("Сначала небоходимо авторизоваться!");
    }
}


// Обработка нажатий на кнопки 

btnLogin.addEventListener("click", function() {
    userName = inputName.value;
    
        if (btnLogin.className === 'btn-login') {
            socket.send(JSON.stringify({ "auth": userName }));
        chatData.messages.forEach(function(message) {
            var chatItem = document.createElement("div");
            var chatText = document.createElement("div");
            //var chatMeta = document.createElement("div");
            var chatName = document.createElement("span");
            var chatTime = document.createElement("span");
        
            if (message.author === userName) {
                chatItem.classList.add("chat-item--outgoing");
                chatText.classList.add("chat-text--outgoing");
                chatName.classList.add("chat-name");
                chatTime.classList.add("chat-time");
            } else {
                chatItem.classList.add("chat-item");
                chatText.classList.add("chat-text");
                chatName.classList.add("chat-name");
                chatTime.classList.add("chat-time");
            }

            chatText.textContent = message.message;
            chatName.textContent = message.author;
            chatTime.textContent = message.time;

            chatItem.appendChild(chatText);
            //chatItem.appendChild(chatMeta);
            chatList.appendChild(chatItem); 
            
            btnLogin.classList.add('btn-logout');
            btnLogin.classList.remove('btn-login');
            btnLogin.querySelector('i.material-icons').innerHTML = 'reply';
        })
        inputName.disabled = true;
        }
        else {
            inputName.value = "";
            inputName.disabled = false;
            console.log("Connection closed");
            btnLogin.classList.add('btn-login');
            btnLogin.classList.remove('btn-logout');
            btnLogin.querySelector('i.material-icons').innerHTML = 'send';
            chatList.innerHTML = "";
        }
});

// отправление нового сообщения текущим пользователем
btnSend.addEventListener("click", function() {
    if (inputMessage.value !== "" && userName !== "") {
        const lastId = chatData.messages[chatData.messages.length - 1].id;
        let time = new Date().toLocaleTimeString();
        let text = inputMessage.value;
        let data = { "message": [userName, text] };

        newMessage(lastId + 1, userName, time, text);
        
        socket.send(JSON.stringify(data));
    }
});

// ==================Обработка нажатий на кнопки==================