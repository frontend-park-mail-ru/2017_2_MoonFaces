import WebSocket from 'ws';
import RequestLogger from './utils/requestLogger';
import clientsList from './clientsList';
import gameList from './GameList';
import WsHandler from './handler';
const wsPort = 8081;

const sServer = new WebSocket.Server({
    port: wsPort
});

console.log(`WebSockets server started on port ${wsPort}`);

sServer.on('connection', (ws) => {
    RequestLogger.ws('new connection');

    const authHandler = (message) => {
        const data = JSON.parse(message);
        const username = data.payload.username;
        const wsHandler = new WsHandler(ws, username);
        if(data.type === 'auth') {
            clientsList.addUser(username, ws);
            RequestLogger.wsInfo(`User authorized ${username}`);
            ws.send(JSON.stringify({
                type:'UPDATE_LIST',
                payload: gameList.getOpenSessions()
            }));
            ws.removeListener('message', authHandler);
            wsHandler.start();
        }else{
            RequestLogger.wsError(`Wrong type ${data.type} [auth] expected`);
            ws.close();
        }
        ws.on('close', () => {
            RequestLogger.wsError(`User disconnected ${username}`);
            clientsList.deleteUser(username);
        });
    };

    ws.on('message', authHandler);
});
