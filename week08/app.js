const app = require('express')();
const wsInstance = require('express-ws')(app);
const { v4: uuidv4 } = require('uuid');

const users = new Map();

let rooms = [];

app.ws('/', ws => {
	ws.on('message', (e) => {
		const data = JSON.parse(e);
		const { message } = data;
		switch (message) {
			case 'create room': {
				const { name } = data;
				const uuid = uuidv4();
				rooms.push({
					name,
					uuid
				});
				users.set(uuid, [name]);
				ws.send(JSON.stringify({
					message: 'feedback tickect',
					uuid
				}), (err) => {
					console.log('312',e);
				});
				break;
			}
			case "join": {
				console.log('here');
				const { name, uuid } = data;
				users.get(uuid).push(name);
				console.log('here', users.get(uuid).length);
				if (users.get(uuid).length >= 2) {
					console.log('here', users.get(uuid).length);
					wsInstance.getWss().clients.forEach(server => {
						if (server !== ws) {
							server.send(JSON.stringify({
								message: 'member join'
							}));
						}
					});
				}
				break;
			}
			default:
				console.log('zhe li');
				wsInstance.getWss().clients.forEach(server => {
					if (server !== ws) {
						server.send(e);
					}
				});
				break;
		}
		console.log(e);
		// switch (message) {
		// 	case 'create': 
		// 		break;
		// 	case 'add': 
		// 		break;
		// 	case 'start': 
		// 		break;
		// }
		// 未做业务处理，收到消息后直接广播

	});
});

app.listen(8080);