'use client';

import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Tooltip} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {GetMe, Login, Logout, Register} from "@src/services/user";
import {User} from "@src/types/user";
import {format} from "date-fns";

interface UserCardProp {
  login: boolean,
  setLogin: Function,
  setCurrentLabId: Function
}

const UserCard: React.FC<UserCardProp> = ({login, setLogin, setCurrentLabId}) => {

  const [user, setUser] = useState<User>({
    id: 0,
    username: '',
    studentId: '',
    avatar: '',
    currentLabId: 0,
    createdAt: new Date(0),
    updatedAt: new Date(0),
    loginAt: new Date(0)
  });

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
    studentId: '',
  });
  const [loginMessage, setLoginMessage] = useState('');

  const [registerForm, setRegisterForm] = useState({
    username: '',
    studentId: '',
    password: '',
    repeatPassword: ''
  });
  const [registerMessage, setRegisterMessage] = useState('');

  const {isOpen: isLoginOpen, onOpen: onLoginOpen, onOpenChange: onLoginOpenChange, onClose: onLoginClose} = useDisclosure();
  const {isOpen: isRegisterOpen, onOpen: onRegisterOpen, onOpenChange: onRegisterOpenChange, onClose: onRegisterClose} = useDisclosure();
  const {isOpen: isLogoutOpen, onOpen: onLogoutOpen, onOpenChange: onLogoutOpenChange, onClose: onLogoutClose} = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const result = await GetMe();
      if (result.ok && result.me) {
        setUser({
          id: result.me.id,
          username: result.me.username,
          studentId: result.me.studentId,
          avatar: result.me.username,
          currentLabId: result.me.currentLabId,
          createdAt: result.me.createdAt,
          updatedAt: result.me.updatedAt,
          loginAt: result.me.loginAt
        })
        setCurrentLabId(result.me.currentLabId);
        setLogin(true);
      }
      else {
        setUser({
          id: 0,
          username: '点击头像登录',
          studentId: '',
          avatar: '',
          currentLabId: 0,
          createdAt: new Date(0),
          updatedAt: new Date(0),
          loginAt: new Date(0)
        })
        setCurrentLabId(0);
        setLogin(false);
      }
    }

    getUser();
  }, [login, setCurrentLabId, setLogin]);

  const handleLogin = async () => {
    setIsLoading(true);
    const result = await Login(loginForm.username, loginForm.studentId, loginForm.password);
    if (result.ok) {
      setLogin(true);
      onLoginClose();
    }
    else {
      setLoginMessage(result.message);
    }
    setIsLoading(false);
  }

  const handleRegister = async () => {
    setIsLoading(true);
    const tmpUsername = registerForm.username;
    const tmpStudentId = registerForm.studentId;
    const result = await Register(tmpUsername, tmpStudentId, registerForm.password, registerForm.repeatPassword);
    if (result.ok) {
      onRegisterClose();
      onLoginOpen();
      setLoginForm({
        username: tmpUsername,
        studentId: tmpStudentId,
        password: ''
      })
    }
    else {
      setRegisterMessage(result.message);
    }
    setIsLoading(false);
  }

  const handleLogout = async () => {
    setIsLoading(true);
    const result = await Logout();
    if (result.ok) {
      setLogin(false);
      onLogoutClose();
    }
    setIsLoading(false);
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        {login ?
          <Dropdown>
            <DropdownTrigger>
              <Avatar name={user.avatar} size={"lg"}/>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem isDisabled>{`用户创建时间: ${format(user.createdAt, 'yyyy-MM-dd HH:mm')}`}</DropdownItem>
              <DropdownItem isDisabled>{`上次登录时间: ${format(user.loginAt, 'yyyy-MM-dd HH:mm')}`}</DropdownItem>
              <DropdownItem color={"danger"} onClick={onLogoutOpen}>退出登录</DropdownItem>
            </DropdownMenu>
          </Dropdown> :
          <Dropdown>
            <DropdownTrigger>
              <Avatar name={user.avatar} size={"lg"}/>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem onClick={() => {
                setLoginMessage('');
                onLoginOpen();
              }}>登录</DropdownItem>
              <DropdownItem onClick={() => {
                setRegisterMessage('');
                onRegisterOpen();
              }}>注册</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        }
        <div className="flex flex-col">
          <p className="text-xl">{user.username}</p>
          <p className="text-gray-400">{`学号：${user.studentId}`}</p>
        </div>
      </CardHeader>

      <Modal isOpen={isLoginOpen} onOpenChange={onLoginOpenChange} aria-label='loginModal'>
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader>登录</ModalHeader>
              <ModalBody>
                <p className="text-red-500">{loginMessage}</p>
                <Input label={"用户名"} defaultValue={loginForm.username} isRequired onChange={(event) => {
                  loginForm.username = event.target.value;
                }}/>
                <Input label={"学号"} defaultValue={loginForm.studentId} isRequired onChange={(event) => {
                  loginForm.studentId = event.target.value;
                }}/>
                <Input label={"密码"} defaultValue={loginForm.password} type={"password"} isRequired onChange={(event) => {
                  loginForm.password = event.target.value;
                }}/>
              </ModalBody>
              <ModalFooter>
                <Button color="default" onPress={onClose}>取消</Button>
                <Button color="primary" onPress={handleLogin} isLoading={isLoading}>登录</Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isRegisterOpen} onOpenChange={onRegisterOpenChange} aria-label='registerModal'>
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader>注册</ModalHeader>
              <ModalBody>
                <p className="text-red-500">{registerMessage}</p>
                <Input label={"用户名"} defaultValue={registerForm.username} isRequired onChange={(event) => {
                  registerForm.username = event.target.value;
                }}/>
                <Input label={"学号"} defaultValue={registerForm.studentId} isRequired onChange={(event) => {
                  registerForm.studentId = event.target.value;
                }}/>
                <Input label={"密码"} defaultValue={registerForm.password} type={"password"} isRequired onChange={(event) => {
                  registerForm.password = event.target.value;
                }}/>
                <Input label={"重复密码"} defaultValue={registerForm.repeatPassword} type={"password"} isRequired onChange={(event) => {
                  registerForm.repeatPassword = event.target.value;
                }}/>
              </ModalBody>
              <ModalFooter>
                <Button color="default" onPress={onClose}>取消</Button>
                <Button color="primary" onPress={handleRegister} isLoading={isLoading}>注册</Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isLogoutOpen} onOpenChange={onLogoutOpenChange} aria-label='logoutModal'>
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader>退出登录</ModalHeader>
              <ModalBody>
                <p>确定要退出登录吗？</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" onPress={onClose}>取消</Button>
                <Button color="danger" onPress={handleLogout} isLoading={isLoading}>确定</Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </Card>
  )
}

export default UserCard;
