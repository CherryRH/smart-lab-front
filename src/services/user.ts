
const urlHeader = 'http://localhost:8080/api'

export async function Login(username: string, studentId: string, password: string) {
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
    return {
      ok: false,
      message: e.message
    }
  }
}

export async function Logout() {
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
      ok: response.ok
    }
  }
  catch (e) {
    return {
      ok: false
    }
  }
}

export async function GetMe() {
  try {
    const response = await fetch(`${urlHeader}/user/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include"
    });
    console.log(await response.json())
    return {
      ok: response.ok
    }
  }
  catch (e) {
    return {
      ok: false
    }
  }
}
