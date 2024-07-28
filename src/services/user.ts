import {urlHeader} from "@src/utils/common";

interface UserAuthResponse {
  ok: boolean,
  message: string
}
interface UserGetMeResponse {
  ok: boolean,
  me: any
}

export async function Login(username: string, studentId: string, password: string): Promise<UserAuthResponse> {
  try {
    if (username.length == 0) {
      return {
        ok: false,
        message: '用户名不能为空'
      }
    }
    if (studentId.length == 0) {
      return {
        ok: false,
        message: '学号不能为空'
      }
    }
    if (password.length == 0) {
      return {
        ok: false,
        message: '密码不能为空'
      }
    }

    const response = await fetch(`${urlHeader}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        studentId: studentId,
        password: password
      }),
      credentials: "include"
    });

    const result = await response.json();
    console.log(result);
    switch (response.status) {
      case 200: {
        return {
          ok: true,
          message: ''
        }
      }
      case 400: {
        return {
          ok: false,
          message: '请求错误'
        }
      }
      case 403: {
        if (result.message === 'User was not found') {
          return {
            ok: false,
            message: '用户不存在'
          }
        }
        else if (result.message === 'StudentId was wrong') {
          return {
            ok: false,
            message: '学号错误'
          }
        }
        else if (result.message === 'Password was wrong') {
          return {
            ok: false,
            message: '密码错误'
          }
        }
        return {
          ok: false,
          message: result.message
        }
      }
      case 500: {
        return {
          ok: false,
          message: '服务器错误'
        }
      }
      default: {
        return {
          ok: false,
          message: '未知错误'
        }
      }
    }
  }
  catch (e) {
    console.log(e.message);
    return {
      ok: false,
      message: e.message
    }
  }
}

export async function Register(username: string, studentId: string, password: string, repeatPassword): Promise<UserAuthResponse> {
  try {
    if (username.length == 0) {
      return {
        ok: false,
        message: '用户名不能为空'
      }
    }
    if (studentId.length == 0) {
      return {
        ok: false,
        message: '学号不能为空'
      }
    }
    if (password.length == 0) {
      return {
        ok: false,
        message: '密码不能为空'
      }
    }
    if (repeatPassword.length == 0) {
      return {
        ok: false,
        message: '重复密码不能为空'
      }
    }
    if (password !== repeatPassword) {
      return {
        ok: false,
        message: '重复密码不匹配'
      }
    }

    const response = await fetch(`${urlHeader}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        studentId: studentId,
        password: password
      }),
      credentials: "include"
    });

    const result = await response.json();
    console.log(result);
    switch (response.status) {
      case 201: {
        return {
          ok: true,
          message: ''
        }
      }
      case 400: {
        return {
          ok: false,
          message: '请求错误'
        }
      }
      case 403: {
        return {
          ok: false,
          message: '用户已存在'
        }
      }
      case 500: {
        return {
          ok: false,
          message: '服务器错误'
        }
      }
      default: {
        return {
          ok: false,
          message: '未知错误'
        }
      }
    }
  }
  catch (e) {
    console.log(e.message);
    return {
      ok: false,
      message: e.message
    }
  }
}

export async function Logout(): Promise<UserAuthResponse> {
  try {
    const response = await fetch(`${urlHeader}/user/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include"
    });
    console.log(await response.json())
    return {
      ok: response.ok,
      message: '登出成功'
    }
  }
  catch (e) {
    console.log(e.message);
    return {
      ok: false,
      message: e.message
    }
  }
}

export async function GetMe(): Promise<UserGetMeResponse> {
  try {
    const response = await fetch(`${urlHeader}/user/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include"
    });
    const result = await response.json();
    console.log(result);

    if (response.ok) {
      return {
        ok: true,
        me: result.me
      }
    }
    else {
      return {
        ok: false,
        me: null
      }
    }
  }
  catch (e) {
    console.log(e.message);
    return {
      ok: false,
      me: null
    }
  }
}
