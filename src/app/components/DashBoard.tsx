'use client';

import {Button} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import io from 'socket.io-client';

const DashBoard: React.FC = () => {
  const [message, setMessage] = useState('');
  const [input, setInput] = useState('aaa');
  const [socket, setSocket] = useState<WebSocket>();
  const [isConnect, setIsConnect] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.196.47:8000');

    ws.onopen = () => {
      console.log('Connected to server');
      ws.send('Hello Server');
      setIsConnect(true);
    };

    ws.onmessage = (event) => {
      console.log('Received:', event.data);
      setMessage(event.data);
    };

    ws.onclose = () => {
      console.log('Disconnected from server');
      setIsConnect(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const connectSocket = () => {
    if (socket) {
      socket.onopen = () => {
        console.log('Connected to server');
        socket.send('Hello Server');
        setIsConnect(true);
      };
      socket.onmessage = (event) => {
        console.log('Received:', event.data);
        setMessage(event.data);
      };
      socket.onclose = () => {
        console.log('Disconnected from server');
        setIsConnect(false);
      };
    }
  }

  const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(input);
      console.log('Sent:', input);
    } else {
      console.log('Socket is not open');
      setIsConnect(false);
    }
  }

  return (
    <div className="w-3/4 h-full min-w-96 min-h-48 border-5 rounded-xl border-gray-500 justify-center items-center p-5">
      <div className='flex flex-row w-full items-center gap-5'>
        {isConnect ?
          <p>Socket已连接</p>:
          <p>Socket未连接</p>
        }
        <Button onClick={() => {connectSocket();}}>连接Socket</Button>
      </div>

      <Button color={"primary"} onClick={() => {sendMessage('aaa');}}>Socket</Button>
    </div>
  )
}

export default DashBoard;
