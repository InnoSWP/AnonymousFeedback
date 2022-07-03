import { io } from 'socket.io-client';
import { host } from './static/constants';
const URL = 'http://' + host; // server socket.io
export const socket = io(URL, {
    autoConnect: false,
});