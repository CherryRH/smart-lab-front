'use client';

import {Button, Divider} from "@nextui-org/react";
import UserCard from "@src/app/components/UserCard";
import LabList from "@src/app/components/LabList";
import React, {useState} from "react";

const LabSideBar: React.FC = () => {
  // 登录状态
  const [login, setLogin] = useState(false);
  // 当前实验id
  const [currentLabId, setCurrentLabId] = useState(0);

  return (
    <div className="w-1/4 h-full min-w-fit max-h-screen flex flex-col gap-3">
      <div className="flex flex-row gap-3 p-3 items-center">
        <p className="text-4xl font-light">智能实验助手</p>
        <p className="text-xl font-light text-blue-500">2024-LoT</p>
      </div>

      <UserCard login={login} setLogin={setLogin} setCurrentLabId={setCurrentLabId}/>

      <Divider/>

      <LabList login={login} currentLabId={currentLabId} setCurrentLabId={setCurrentLabId}/>
    </div>
  )
}

export default LabSideBar;
