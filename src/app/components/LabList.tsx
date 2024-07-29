'use client';

import {
  Avatar, Button,
  Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input,
  Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure
} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import LabCard from "@src/app/components/LabCard";
import {CreateLab, DeleteLab, GetLabs, LabItem, UpdateLabTitle} from "@src/services/lab";
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
import {Login} from "@src/services/user";

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
  const {isOpen: isCreateLabFormOpen, onOpen: onCreateLabFormOpen, onOpenChange: onCreateLabFormOpenChange, onClose: onCreateLabFormClose} = useDisclosure();
  const {isOpen: isUpdateLabFormOpen, onOpen: onUpdateLabFormOpen, onOpenChange: onUpdateLabFormOpenChange, onClose: onUpdateLabFormClose} = useDisclosure();
  const {isOpen: isDeleteLabOpen, onOpen: onDeleteLabOpen, onOpenChange: onDeleteLabOpenChange, onClose: onDeleteLabClose} = useDisclosure();

  // 创建实验表单
  const [createLabForm, setCreateLabForm] = useState({
    title: ''
  })

  // 更新实验表单
  const [updateLabForm, setUpdateLabForm] = useState({
    id: 0,
    title: ''
  })

  // 删除实验表单
  const [deleteLabForm, setDeleteLabForm] = useState({
    id: 0,
    title: ''
  })

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

  useEffect(() => {
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
            <Button isIconOnly color="default" onClick={() => {
              setUpdateLabForm({
                id: item.id,
                title: item.title
              });
              onUpdateLabFormOpen();
            }}><Edit/></Button>
          </Tooltip>
          <Tooltip content='删除实验'>
            <Button isIconOnly color="danger" onClick={() => {
              setDeleteLabForm({
                id: item.id,
                title: item.title
              });
              onDeleteLabOpen();
            }}><Delete/></Button>
          </Tooltip>
        </div>
      )
    }
  }

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateLab = async () => {
    setIsLoading(true);
    const result = await CreateLab(createLabForm.title);
    if (result.ok) {
      await getLabs();
      onCreateLabFormClose();
      setCreateLabForm({
        title: ''
      })
    }
    else {
      setLabListMessage(result.message);
    }
    setIsLoading(false);
  }

  const handleDeleteLab = async (id: number) => {
    setIsLoading(true);
    const result = await DeleteLab(id);
    if (result) {
      await getLabs();
      onDeleteLabClose();
      setDeleteLabForm({
        id: 0,
        title: ''
      })
    }
    else {
      setLabListMessage('删除失败');
    }
    setIsLoading(false);
  }

  const handleUpdateLab = async (id: number, title: string) => {
    setIsLoading(true);
    const result = await UpdateLabTitle(id, title);
    if (result) {
      await getLabs();
      onUpdateLabFormClose();
      setUpdateLabForm({
        id: 0,
        title: ''
      })
    }
    else {
      setLabListMessage('修改失败');
    }
    setIsLoading(false);
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
              <ModalHeader>实验列表</ModalHeader>
              <ModalBody>
                <p className="text-red-500">{labListMessage}</p>
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
                  <Button isIconOnly color="primary" onClick={onCreateLabFormOpen}><Add/></Button>
                </Tooltip>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isCreateLabFormOpen} onOpenChange={onCreateLabFormOpenChange}>
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader>新建实验</ModalHeader>
              <ModalBody>
                <Input label={"标题"} defaultValue={createLabForm.title} isRequired onChange={(event) => {
                  createLabForm.title = event.target.value;
                }}/>
              </ModalBody>
              <ModalFooter>
                <Button color="default" onClick={onClose}>取消</Button>
                <Button color="primary" isLoading={isLoading} onClick={handleCreateLab}>创建</Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isUpdateLabFormOpen} onOpenChange={onUpdateLabFormOpenChange}>
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader>编辑实验信息</ModalHeader>
              <ModalBody>
                <Input label={"标题"} defaultValue={updateLabForm.title} isRequired onChange={(event) => {
                  updateLabForm.title = event.target.value;
                }}/>
              </ModalBody>
              <ModalFooter>
                <Button color="default" onClick={onClose}>取消</Button>
                <Button color="primary" isLoading={isLoading} onClick={() => handleUpdateLab(updateLabForm.id, updateLabForm.title)}>更新</Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteLabOpen} onOpenChange={onDeleteLabOpenChange}>
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader>删除实验</ModalHeader>
              <ModalBody>
                <p>{`确定要删除实验[${deleteLabForm.title}]吗？删除后数据无法恢复。`}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" onPress={onClose}>取消</Button>
                <Button color="danger" onPress={() => handleDeleteLab(deleteLabForm.id)} isLoading={isLoading}>确定</Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default LabList;
