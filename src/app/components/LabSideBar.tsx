'use client';

import {Button, Divider} from "@nextui-org/react";
import UserCard from "@src/app/components/UserCard";
import LabList from "@src/app/components/LabList";
import React, {useState} from "react";

const LabSideBar: React.FC = () => {
  const [login, setLogin] = useState(false);

  return (
    <div className="w-1/4 h-full min-w-fit flex flex-col gap-3">
      <div className="flex flex-row gap-3 p-3 items-center">
        <p className="text-4xl font-light">智慧实验助手</p>
        <p className="text-xl font-light text-blue-500">2024-LoT</p>
      </div>

      <UserCard login={login} setLogin={setLogin}/>

      <Divider/>

      <LabList login={login}/>
    </div>
  )
}

export default LabSideBar;
