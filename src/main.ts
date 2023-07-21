import { connetToServer } from './socket-client';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocket - Client</h1>
    <span id="server-status">Offline</span>

    <ul id="clients-ul">
      <li>Ningun cliente conectado</li>
    </ul>

    <form id="message-form">
      <input placeholder="Message" id="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`;
connetToServer();
