'use client';

import React, {useEffect, useState} from "react";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {format} from "date-fns";
import {Lab, TestTube, TestTubeRack} from "@src/types/lab";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip} from "@nextui-org/react";
import {Settings, SixteenMp} from "@mui/icons-material";
import TestTubeButton from "@src/app/components/TestTubeButton";

interface TestTubeRackCardProp {
  testTubeRack: TestTubeRack,
  getCurrentLab: Function,
  labId: number
}

const TestTubeRackCard: React.FC<TestTubeRackCardProp> = ({testTubeRack, getCurrentLab, labId}) => {
  // 16个试管的数据
  const [testTubes, setTestTubes] = useState<(TestTube | null)[]>([
    null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null
  ])
  // 处理试管数据
  const makeTestTubeState = (rack: TestTubeRack) => {
    let tubeItems: (TestTube | null)[] = [];
    for (let i = 0; i < 16; i++) {
      tubeItems.push(null);
    }
    for (let item of rack.testTubes) {
      if (item.indexInRack > 0) {
        tubeItems[item.indexInRack - 1] = item;
      }

    }
    setTestTubes(tubeItems);
  }

  useEffect(() => {
    makeTestTubeState(testTubeRack);
  }, [testTubeRack]);

  return (
    <Tooltip content='试管架'>
      <div className='flex flex-col gap-3 p-3'>
        <div className='flex flex-row justify-between'>
          <p className="text-sm font-bold">{`${testTubeRack.label}`}</p>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly color="default" size={"sm"}><Settings/></Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem isDisabled>{`创建：${format(testTubeRack.createdAt, 'yyyy-MM-dd HH:mm')}`}</DropdownItem>
              <DropdownItem isDisabled>{`上一次更新：${format(testTubeRack.updatedAt, 'yyyy-MM-dd HH:mm')}`}</DropdownItem>
              <DropdownItem>修改试管架标签</DropdownItem>
              <DropdownItem color={"danger"}>删除试管架</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className='flex flex-row justify-between'>
          <div className='flex flex-row gap-3 text-purple-500'>
            <p className="text-sm">坐标</p>
            <p className="text-sm">{`x : ${testTubeRack.x}`}</p>
            <p className="text-sm">{`y : ${testTubeRack.y}`}</p>
            <p className="text-sm">{`z : ${testTubeRack.z}`}</p>
          </div>
          <p className='text-blue-500'>{`ID: ${testTubeRack.id}`}</p>
        </div>

        <div className='flex flex-row gap-1'>
          <TestTubeButton testTube={testTubes[0]} indexInRack={1} getCurrentLab={getCurrentLab}
                          testTubeRackId={testTubeRack.id} labId={labId}/>
          <TestTubeButton testTube={testTubes[1]} indexInRack={2} getCurrentLab={getCurrentLab}
                          testTubeRackId={testTubeRack.id} labId={labId}/>
          <TestTubeButton testTube={testTubes[2]} indexInRack={3} getCurrentLab={getCurrentLab}
                          testTubeRackId={testTubeRack.id} labId={labId}/>
          <TestTubeButton testTube={testTubes[3]} indexInRack={4} getCurrentLab={getCurrentLab}
                          testTubeRackId={testTubeRack.id} labId={labId}/>
          <TestTubeButton testTube={testTubes[4]} indexInRack={5} getCurrentLab={getCurrentLab}
                          testTubeRackId={testTubeRack.id} labId={labId}/>
          <TestTubeButton testTube={testTubes[5]} indexInRack={6} getCurrentLab={getCurrentLab}
                          testTubeRackId={testTubeRack.id} labId={labId}/>
          <TestTubeButton testTube={testTubes[6]} indexInRack={7} getCurrentLab={getCurrentLab}
                          testTubeRackId={testTubeRack.id} labId={labId}/>
          <TestTubeButton testTube={testTubes[7]} indexInRack={8} getCurrentLab={getCurrentLab}
                          testTubeRackId={testTubeRack.id} labId={labId}/>
        </div>
        <div className='flex flex-row gap-1'>
          <TestTubeButton testTube={testTubes[8]} indexInRack={9} getCurrentLab={getCurrentLab}
                          testTubeRackId={testTubeRack.id} labId={labId}/>
          <TestTubeButton testTube={testTubes[9]} indexInRack={10} getCurrentLab={getCurrentLab}
                          testTubeRackId={testTubeRack.id} labId={labId}/>
          <TestTubeButton testTube={testTubes[10]} indexInRack={11} getCurrentLab={getCurrentLab}
                          testTubeRackId={testTubeRack.id} labId={labId}/>
          <TestTubeButton testTube={testTubes[11]} indexInRack={12} getCurrentLab={getCurrentLab}
                          testTubeRackId={testTubeRack.id} labId={labId}/>
          <TestTubeButton testTube={testTubes[12]} indexInRack={13} getCurrentLab={getCurrentLab}
                          testTubeRackId={testTubeRack.id} labId={labId}/>
          <TestTubeButton testTube={testTubes[13]} indexInRack={14} getCurrentLab={getCurrentLab}
                          testTubeRackId={testTubeRack.id} labId={labId}/>
          <TestTubeButton testTube={testTubes[14]} indexInRack={15} getCurrentLab={getCurrentLab}
                          testTubeRackId={testTubeRack.id} labId={labId}/>
          <TestTubeButton testTube={testTubes[15]} indexInRack={16} getCurrentLab={getCurrentLab}
                          testTubeRackId={testTubeRack.id} labId={labId}/>
        </div>

      </div>
    </Tooltip>
  )
}

export default TestTubeRackCard;
