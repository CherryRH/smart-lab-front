'use client';

import React from "react";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {format} from "date-fns";

interface LabDetailedCardProp {
  id: number,
  title: string,
  testTubeRacks: any[],
  createdAt: Date,
  updatedAt: Date
}

const LabDetailedCard: React.FC<LabDetailedCardProp> = ({id, title, createdAt, updatedAt, testTubeRacks}) => {
  return (
    <div>
      {id === 0 ?
        <Card>
          <CardHeader>
            <p>暂无实验数据</p>
          </CardHeader>
        </Card> :
        <Card>
          <CardHeader>
            <p>{title}</p>
          </CardHeader>
          <CardBody>

          </CardBody>
          <CardFooter className="flex flex-row justify-between">
            <p className="text-sm text-gray-400">{`创建：${format(createdAt, 'yyyy-MM-dd')}`}</p>
            <p className="text-sm text-gray-400">{`上一次更新：${format(updatedAt, 'yyyy-MM-dd')}`}</p>
          </CardFooter>
        </Card>
      }
    </div>
  )
}

export default LabDetailedCard;
