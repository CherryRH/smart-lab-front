'use client';

import {Button, Divider, Input} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import io from 'socket.io-client';

const DashBoard: React.FC = () => {
  const [message, setMessage] = useState('');
  const [input, setInput] = useState('aaa');
  const [socket, setSocket] = useState<WebSocket>();
  const [isConnect, setIsConnect] = useState(false);
  const [ip, setIp] = useState('192.168.196.47');
  const [port, setPort] = useState(8000);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

  }, []);

  const connectSocket = () => {
    try {
      const ws = new WebSocket(`ws://${ip}:${port}`);

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
    }
    catch (e) {
      console.warn(e);
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
    <div className="w-3/4 h-full min-w-96 min-h-48 border-5 gap-5 rounded-xl border-gray-500 flex flex-col p-5">
      {isConnect ?
        <p>Socket已连接</p>:
        <p>Socket未连接</p>
      }
      <div className='flex flex-row w-full items-center gap-5'>
        <Input label={"Ip地址"} defaultValue={ip} isRequired onChange={(event) => {
          setIp(event.target.value);
        }}/>
        <Input label={"端口"} defaultValue={port.toString()} type={"number"} isRequired onChange={(event) => {
          setPort(parseInt(event.target.value));
        }}/>
        <Button onClick={() => {connectSocket();}} isLoading={isLoading}>连接Socket</Button>
      </div>
      <Divider/>
      <Button color={"primary"} onClick={() => {sendMessage('aaa');}}>Socket</Button>
    </div>
  )
}

export default DashBoard;
