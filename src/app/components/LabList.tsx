'use client';

import {
  Avatar, Button,
  Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input,
  Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure
} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import LabCard from "@src/app/components/LabCard";
import {GetLabs, LabItem} from "@src/services/lab";
import {
  ListAlt,
  Remove,
  RemoveCircle,
  Settings,
  Update,
  Delete,
  SystemUpdate,
  Edit,
  SystemUpdateAlt, Add
} from "@mui/icons-material";
import {format} from "date-fns";

interface LabListProp {
  login: boolean
}

const LabList: React.FC<LabListProp> = ({login}) => {
  // 实验列表数据
  const [labs, setLabs] = useState<LabItem[]>([]);
  // 实验数据
  const [lab, setLab] = useState({
    id: 0,
    title: '实验',
    testTubeRacks: [],
    createdAt: new Date(2024, 7, 1),
    updatedAt: new Date(2024, 7, 1)
  })
  const [labListMessage, setLabListMessage] = useState('');
  const [labMessage, setLabMessage] = useState('');

  const {isOpen: isLabListOpen, onOpen: onLabListOpen, onOpenChange: onLabListOpenChange, onClose: onLabListClose} = useDisclosure();

  useEffect(() => {
    const getLabs = async () => {
      const result = await GetLabs();
      if (result.ok) {
        setLabListMessage('');
        setLabs(result.labs);
      }
      else {
        setLabListMessage('获取实验列表数据失败');
      }
    }

    if (login) {
      getLabs();
    }
    else {
      setLabs([]);
    }
  }, [login]);

  const columns = [
    {
      key: "title",
      label: "标题",
    },
    {
      key: "createdAt",
      label: "创建时间",
    },
    {
      key: "updatedAt",
      label: "更新时间",
    },
    {
      key: "actions",
      label: "操作",
    },
  ];

  const renderCell = (item: LabItem, columnKey: React.Key) => {
    switch (columnKey) {
      case 'title': return (<p>{item.title}</p>)
      case 'createdAt': return (<p>{format(item.createdAt, 'yyyy-MM-dd HH:mm')}</p>)
      case 'updatedAt': return (<p>{format(item.updatedAt, 'yyyy-MM-dd HH:mm')}</p>)
      case 'actions': return (
        <div className='flex flex-row gap-3 items-center'>
          <Tooltip content='加载到实验面板'>
            <Button isIconOnly color="default"><SystemUpdateAlt/></Button>
          </Tooltip>
          <Tooltip content='编辑实验信息'>
            <Button isIconOnly color="default"><Edit/></Button>
          </Tooltip>
          <Tooltip content='删除实验'>
            <Button isIconOnly color="danger"><Delete/></Button>
          </Tooltip>
        </div>
      )
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between p-3 items-center">
        <p>实验数据面板</p>
        <div className="flex flex-row gap-3 items-center">
          <Tooltip content='打开实验列表'>
            <Button isIconOnly color="default" onClick={onLabListOpen}><ListAlt/></Button>
          </Tooltip>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly color="default">
                <Tooltip content='打开实验面板设置'><Settings/></Tooltip>
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem >设置</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <p className="text-red-500">{labMessage}</p>
      <LabCard id={lab.id} title={lab.title} testTubeRacks={lab.testTubeRacks} createdAt={lab.createdAt}
               updatedAt={lab.updatedAt}/>

      <Modal isOpen={isLabListOpen} onOpenChange={onLabListOpenChange} size='5xl'>
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader>
                <p>实验列表</p>
              </ModalHeader>
              <ModalBody>
                <Table>
                  <TableHeader columns={columns}>
                    {(column) => (<TableColumn key={column.key}>{column.label}</TableColumn>)}
                  </TableHeader>
                  <TableBody emptyContent='没有实验' items={labs}>
                    {(item: LabItem) => (
                      <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Tooltip content='新建实验'>
                  <Button isIconOnly color="primary"><Add/></Button>
                </Tooltip>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default LabList;
