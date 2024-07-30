'use client';

import React from "react";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {format} from "date-fns";
import {LabItem} from "@src/services/lab";

interface LabCardProp {
  lab: LabItem
}

const LabCard: React.FC<LabCardProp> = ({lab}) => {
  return (
    <div>
      {lab.id === 0 ?
        <Card>
          <CardHeader>
            <p className="text-sm">暂无实验数据</p>
          </CardHeader>
        </Card> :
        <Card>
          <CardHeader>
            <p>{lab.title}</p>
          </CardHeader>
          <CardBody>

          </CardBody>
          <CardFooter className="flex flex-row justify-between">
            <p className="text-sm text-gray-400">{`创建：${format(lab.createdAt, 'yyyy-MM-dd HH:mm')}`}</p>
            <p className="text-sm text-gray-400">{`上一次更新：${format(lab.updatedAt, 'yyyy-MM-dd HH:mm')}`}</p>
          </CardFooter>
        </Card>
      }
    </div>
  )
}

export default LabCard;
