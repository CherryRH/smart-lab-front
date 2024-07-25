'use client';

import {Button} from "@nextui-org/react";
import UserCard from "@src/app/components/UserCard";
import LabList from "@src/app/components/LabList";
import React, {useState} from "react";

const LabSideBar: React.FC = () => {
  const [login, setLogin] = useState(false);

  return (
    <div className="w-1/4 h-full flex flex-col gap-3">
      <p className="text-4xl font-light mb-3">智慧实验助手</p>

      <UserCard login={login} setLogin={setLogin}/>

      <LabList/>
    </div>
  )
}

export default LabSideBar;
