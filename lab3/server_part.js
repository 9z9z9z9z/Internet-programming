const fs = require('fs');

let chatData;
let usedNames = { list: [] };

function readChatData() {
	const data = fs.readFileSync('chat_messages.json', 'utf-8');
	chatData = JSON.parse(data);
}

function addMessage(id, author, time, message) {
	const newMessage = {
	  	id: id,
	  	author: author,
	  	time: time,
	  	message: message
	};
	chatData.messages.push(newMessage);
	
	if (chatData.users.includes(author) != true) {
		chatData.users.push(author);
	}

	// Записываем обновленные данные в файл
	const newData = JSON.stringify(chatData, null, 2);
	fs.writeFileSync('chat_messages.json', newData, 'utf-8');
}

function sendData(socket) {
	socket.send(JSON.stringify(chatData));
	socket.send(JSON.stringify(usedNames));
	console.log(usedNames);
}

// загружаем данные из файла chat_messages.json в chatData
readChatData();

// подключаем библиотеку WebSocket
const WebSocket = require('ws');

// создаем новый сервер WebSocket
const server = new WebSocket.Server({ port: 1337 });

// обработчик подключения нового клиента
server.on('connection', function (socket) {
	console.log('New client entered.');
	sendData(socket);
	// обработчик сообщений от клиента
	socket.on('message', function(message) {
		console.log('A new message:', message.toString());
		const data = JSON.parse(message);
		if (data.hasOwnProperty("message")) {
			let lastId = chatData.messages[chatData.messages.length - 1].id;
			let user = data.message[0];
			let time = new Date().toLocaleTimeString();
			let text = data.message[1];
			addMessage(lastId + 1, user, time, text);
			server.clients.forEach(function (client) {
				if (client !== socket) {
					let info = [lastId + 1, user, time, text];
					let jsonString = JSON.stringify(info);
					client.send(jsonString);
				}
			});
		} else if (data.hasOwnProperty("auth")) {
			usedNames.list.push(data.auth);
		} else if (data.hasOwnProperty("close")) {
			let index = usedNames.list.indexOf(data.close);
			console.log("fsdfsdfsdf");
			usedNames.list.splice(index, 1);
		}
	});
});
