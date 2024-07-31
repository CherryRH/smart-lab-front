'use client';

import React, {useEffect, useState} from "react";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {format} from "date-fns";
import {Lab, LabItem, LabItemType, TestTubeRack} from "@src/types/lab";
import {
  Button,
  Divider, Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger, Input,
  Listbox,
  ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
  Tooltip, useDisclosure
} from "@nextui-org/react";
import TestTubeRackCard from "@src/app/components/TestTubeRackCard";
import {Add, Settings} from "@mui/icons-material";
import {CreateLab, CreateTestTubeRack} from "@src/services/lab";

interface LabCardProp {
  lab: Lab,
  getCurrentLab: Function
}

const LabCard: React.FC<LabCardProp> = ({lab, getCurrentLab}) => {
  // 实验物品、器材
  const [labItems, setLabItems] = useState<LabItem[]>([]);
  // 从实验数据设置
  const setLabItemFromLab  = (lab: Lab) => {
    const items: LabItem[] = [];
    lab.testTubeRacks.forEach((rack: TestTubeRack) => {
      items.push({
        type: LabItemType.TestTubeRack,
        label: rack.label,
        item: rack,
      });
    });
    setLabItems(items);
  }

  useEffect(() => {
    if (lab.id !== 0) {
      setLabItemFromLab(lab);
    }
  }, [lab]);

  const [isLoading, setIsLoading] = useState(false);
  const [labItemMessage, setLabItemMessage] = useState('');
  const [createTestTubeRackForm, setCreateTestTubeRackForm] = useState({
    label: ''
  })

  const {isOpen: isCreateTestTubeRackOpen, onOpen: onCreateTestTubeRackOpen, onOpenChange: onCreateTestTubeRackOpenChange, onClose: onCreateTestTubeRackClose} = useDisclosure();

  const handleCreateTestTubeRack = async () => {
    setIsLoading(true);
    const result = await CreateTestTubeRack(lab.id, createTestTubeRackForm.label);
    if (result.ok) {
      await getCurrentLab(lab.id);
      setLabItemMessage('');
      setCreateTestTubeRackForm({
        label: ''
      });
      onCreateTestTubeRackClose();
    }
    else {
      setLabItemMessage(result.message);
    }
    setIsLoading(false);
  }

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
          <Divider/>
          <CardBody className='gap-3'>
            <Listbox className='max-h-96 overflow-scroll' items={labItems} aria-label="LabItemsList" emptyContent='没有实验物品' variant={"bordered"}>
              {(item: LabItem) => (
                <ListboxItem key={item.label}>
                  {item.type === LabItemType.TestTubeRack &&
                    <TestTubeRackCard testTubeRack={item.item} getCurrentLab={getCurrentLab} labId={lab.id}/>
                  }
                </ListboxItem>
              )}
            </Listbox>

            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly color="primary" aria-label='新建实验物品' className='self-end'>
                  <Tooltip content='新建实验物品'><Add/></Tooltip>
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => {setLabItemMessage('');onCreateTestTubeRackOpen();}}>试管架</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </CardBody>
          <Divider/>
          <CardFooter className="flex flex-row justify-between">
            <p className="text-sm text-gray-400">{`创建：${format(lab.createdAt, 'yyyy-MM-dd HH:mm')}`}</p>
            <p className="text-sm text-gray-400">{`上一次更新：${format(lab.updatedAt, 'yyyy-MM-dd HH:mm')}`}</p>
          </CardFooter>
        </Card>
      }

      <Modal isOpen={isCreateTestTubeRackOpen} onOpenChange={onCreateTestTubeRackOpenChange} aria-label='createTestTubeRackFormModal'>
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader>新建试管架</ModalHeader>
              <ModalBody>
                <p className="text-red-500">{labItemMessage}</p>
                <Input label={"标签"} defaultValue={createTestTubeRackForm.label} isRequired onChange={(event) => {
                  createTestTubeRackForm.label = event.target.value;
                }}/>
              </ModalBody>
              <ModalFooter>
                <Button color="default" onClick={onClose}>取消</Button>
                <Button color="primary" isLoading={isLoading} onClick={handleCreateTestTubeRack}>创建</Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>

    </div>
  )
}

export default LabCard;
