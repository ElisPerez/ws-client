import { connetToServer } from './socket-client';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>
    <input id="jw-token" placeholder="Json Web Token">
    <button id="btn-connect">Connect</button>
    <br/>
    <br/>

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

// connetToServer();

const jwToken = document.querySelector<HTMLInputElement>('#jw-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;
const serverStatus = document.querySelector<HTMLSpanElement>('#server-status')!;

btnConnect.disabled = serverStatus.innerText === 'Online';

btnConnect.addEventListener('click', () => {
  if (jwToken.value.length <= 0) return alert('Ingrese un JWT válido');

  connetToServer(jwToken.value.trim());
});
