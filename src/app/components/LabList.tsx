'use client';

import {Listbox} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import LabDetailedCard from "@src/app/components/LabDetailedCard";

interface LabListProp {
  login: boolean
}

interface LabItem {
  id: number,
  title: string,
  testTubeRacks: any[],
  createdAt: Date,
  updatedAt: Date
}

const LabList: React.FC<LabListProp> = ({login}) => {
  // 实验列表数据
  const [labs, setLabs] = useState([]);
  // 是否显示实验列表
  const [showLabList, setShowLabList] = useState(false);
  // 实验数据
  const [lab, setLab] = useState({
    id: 0,
    title: '实验',
    testTubeRacks: [],
    createdAt: new Date(2024, 7, 1),
    updatedAt: new Date(2024, 7, 1)
  })

  useEffect(() => {
    const getLabs = async () => {

    }

    getLabs()
  }, [login]);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm">实验数据面板</p>
      <LabDetailedCard id={lab.id} title={lab.title} testTubeRacks={lab.testTubeRacks} createdAt={lab.createdAt} updatedAt={lab.updatedAt}/>
    </div>
  )
}

export default LabList;
