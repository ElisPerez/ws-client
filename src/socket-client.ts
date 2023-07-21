import { Manager, Socket } from 'socket.io-client';
import { NAMESPACE_ROOT, SOCKET_SERVER_SIDE_URL } from './dictionary';

// ..............................

export const connetToServer = () => {
  const manager = new Manager(SOCKET_SERVER_SIDE_URL);

  const socket = manager.socket(NAMESPACE_ROOT); // Conexion a un NameSpace (nsp)

  // console.log({ socket });

  addListeners(socket);
};

const addListeners = (socket: Socket) => {
  const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!; // El "!" indica que estamos indicando que siempre va a existir

  const clientsUl = document.querySelector<HTMLUListElement>('#clients-ul')!; // El "!" indica que estamos indicando que siempre va a existir
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
  const messageUl = document.querySelector<HTMLUListElement>('#messages-ul')!; // El "!" indica que estamos indicando que siempre va a existir

  // Escuchar el evento "connect"
  socket.on('connect', () => {
    // console.log('CONNECTED')
    serverStatusLabel.innerHTML = 'Online';
  });

  // Escuchar el evento "disconnect"
  socket.on('disconnect', () => {
    serverStatusLabel.innerHTML = 'Offline';
    // console.log('DISCONNECTED')
  });

  // Escuchar cuando un cliente se conecta
  socket.on('clients-updates', (clients: string[]) => {
    // console.log({ clients })
    let clientsHtml = '';
    clients.forEach(clientId => {
      clientsHtml += `
        <li>${clientId}</lid>
      `;
    });

    clientsUl.innerHTML = clientsHtml;
  });

  // Escuchar el submit del formulario
  messageForm.addEventListener('submit', e => {
    e.preventDefault();

    if (messageInput.value.trim().length <= 0) return;

    // console.log({ id: 'Yo!!', message: messageInput.value });

    socket.emit('message-from-client', { id: 'Yo!!', message: messageInput.value });

    messageInput.value = ''; // Limpiar el formulario
  });

  socket.on('message-from-server', (payload: { fullName: string; message: string }) => {
    const newMessage = `
        <strong>${payload.fullName}</strong>
        <span>${payload.message}</span>
    `;

    const li = document.createElement('li');
    li.innerHTML = newMessage;

    messageUl.append(li);
  });
};
