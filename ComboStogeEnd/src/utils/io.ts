// 客户端 src/utils/io
import { io } from 'socket.io-client'
// 稍微封装一下socket.io， 然后暴露出去。
const socket = (): any => {
    //强制指定 ws 协议
    // const _io = io('ws://127.0.0.1:7001/');
    const _io = io('ws://127.0.0.1:7001/', { query: { token: '11111111111' }, reconnectionAttempts: 10, transports: ['websocket']});
    //  reconnection: false, autoConnect: false 
    // _io.open();
    _io.on('connection', function () {
        console.log('连接成功');
    });
    _io.on('disconnect', function () {
        console.log('断开连接');
    });
    return _io
}


export default socket;