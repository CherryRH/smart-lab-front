'use client';

import {
  Avatar, Button,
  Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input,
  Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure
} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import LabCard from "@src/app/components/LabCard";
import {CreateLab, DeleteLab, GetLabById, GetLabs, UpdateLabTitle} from "@src/services/lab";
import {ListAlt, Remove, RemoveCircle, Settings, Update, Delete, SystemUpdate, Edit, SystemUpdateAlt, Add} from "@mui/icons-material";
import {format} from "date-fns";
import {Login, UpdateCurrentLabId} from "@src/services/user";
import {Lab} from "@src/types/lab";

interface LabListProp {
  login: boolean,
  currentLabId: number,
  setCurrentLabId: Function
}

const LabList: React.FC<LabListProp> = ({login, currentLabId, setCurrentLabId}) => {
  // 实验列表数据
  const [labs, setLabs] = useState<Lab[]>([]);
  // 实验数据
  const [lab, setLab] = useState<Lab>({
    id: 0,
    title: '',
    testTubeRacks: [],
    createdAt: new Date(2024, 7, 1),
    updatedAt: new Date(2024, 7, 1)
  })
  const setLabInit = () => {
    setLab({
      id: 0,
      title: '',
      testTubeRacks: [],
      createdAt: new Date(2024, 7, 1),
      updatedAt: new Date(2024, 7, 1)
    });
  }

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

  const getCurrentLab = async (id: number) => {
    if (id > 0) {
      const result = await GetLabById(id);
      if (result.ok && result.lab) {
        setLab({
          id: result.lab.id,
          title: result.lab.title,
          testTubeRacks: result.lab.testTubeRacks,
          createdAt: result.lab.createdAt,
          updatedAt: result.lab.updatedAt
        });
        setLabMessage('');
      }
      else {
        setLabMessage('获取实验数据失败');
      }
    }
  }

  useEffect(() => {
    if (login) {
      getCurrentLab(currentLabId);
    }
    else {
      setLabInit();
    }
  }, [currentLabId, login]);

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

  const renderCell = (item: Lab, columnKey: React.Key) => {
    switch (columnKey) {
      case 'title': return (<p>{item.title}</p>)
      case 'createdAt': return (<p>{format(item.createdAt, 'yyyy-MM-dd HH:mm')}</p>)
      case 'updatedAt': return (<p>{format(item.updatedAt, 'yyyy-MM-dd HH:mm')}</p>)
      case 'actions': return (
        <div className='flex flex-row gap-3 items-center'>
          <Tooltip content='加载到实验面板'>
            <Button isIconOnly color="default" aria-label='加载到实验面板' onClick={() => {
              handleLoadLab(item);
              onLabListClose();
            }}><SystemUpdateAlt/></Button>
          </Tooltip>
          <Tooltip content='编辑实验信息'>
            <Button isIconOnly color="default" aria-label='编辑实验信息' onClick={() => {
              setUpdateLabForm({
                id: item.id,
                title: item.title
              });
              onUpdateLabFormOpen();
            }}><Edit/></Button>
          </Tooltip>
          <Tooltip content='删除实验'>
            <Button isIconOnly color="danger" aria-label='删除实验' onClick={() => {
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
      // 如果删除的是用户当前实验
      if (id === currentLabId) {
        setLabInit();
        setCurrentLabId(0);
        await UpdateCurrentLabId(0);
      }
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
      // 如果是当前实验，则更新页面
      if (id === currentLabId) {
        await getCurrentLab(currentLabId);
      }
    }
    else {
      setLabListMessage('修改失败');
    }
    setIsLoading(false);
  }

  const handleLoadLab = async (lab: Lab) => {
    setLab({
      ...lab
    });
    setCurrentLabId(lab.id);
    // 同步后端的当前实验id
    await UpdateCurrentLabId(lab.id);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between p-3 items-center">
        <p>实验数据面板</p>
        <div className="flex flex-row gap-3 items-center">
          <Tooltip content='打开实验列表'>
            <Button isIconOnly color="default" aria-label='打开实验列表' onClick={onLabListOpen}><ListAlt/></Button>
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
      <LabCard lab={lab} getCurrentLab={getCurrentLab}/>

      <Modal isOpen={isLabListOpen} onOpenChange={onLabListOpenChange} size='5xl' aria-label='labListModal'>
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader>实验列表</ModalHeader>
              <ModalBody>
                <p className="text-red-500">{labListMessage}</p>
                <Table aria-label='LabTable' className='max-h-96 overflow-scroll'>
                  <TableHeader columns={columns}>
                    {(column) => (<TableColumn key={column.key}>{column.label}</TableColumn>)}
                  </TableHeader>
                  <TableBody emptyContent='没有实验' items={labs}>
                    {(item: Lab) => (
                      <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Tooltip content='新建实验'>
                  <Button isIconOnly color="primary" aria-label='新建实验' onClick={onCreateLabFormOpen}><Add/></Button>
                </Tooltip>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isCreateLabFormOpen} onOpenChange={onCreateLabFormOpenChange} aria-label='createLabFormModal'>
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

      <Modal isOpen={isUpdateLabFormOpen} onOpenChange={onUpdateLabFormOpenChange} aria-label='updateLabFormModal'>
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

      <Modal isOpen={isDeleteLabOpen} onOpenChange={onDeleteLabOpenChange} aria-label='deleteLabModal'>
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
