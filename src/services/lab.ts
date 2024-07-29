import {urlHeader} from "@src/utils/common";

export interface LabItem {
  id: number,
  title: string,
  testTubeRacks: any[],
  createdAt: Date,
  updatedAt: Date
}

interface GetLabsResponse {
  ok: boolean,
  labs: LabItem[]
}

interface CreateLabResponse {
  ok: boolean,
  message: string
}

export async function GetLabs(): Promise<GetLabsResponse> {
  try {
    const response = await fetch(`${urlHeader}/lab/all`, {
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
        labs: result.labs
      }
    }
    else {
      return {
        ok: false,
        labs: []
      }
    }
  }
  catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    else {
      console.error('Unknown error');
    }
    return {
      ok: false,
      labs: []
    }
  }
}

export async function CreateLab(title: string): Promise<CreateLabResponse> {
  try {
    if (!title || title.length === 0) throw Error('实验标题不能为空');

    const response = await fetch(`${urlHeader}/lab/create?title=${title}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
      case 400: throw Error('新建请求错误');
      case 500: throw Error('服务器错误');
      default: throw Error('未知错误');
    }
  }
  catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
      return {
        ok: false,
        message: e.message
      }
    }
    else {
      console.error('Unknown error');
      return {
        ok: false,
        message: '未知错误'
      }
    }
  }
}

export async function DeleteLab(id: number): Promise<boolean> {
  try {
    if (!id) throw Error('实验不存在');

    const response = await fetch(`${urlHeader}/lab/delete?id=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include"
    });
    const result = await response.json();
    console.log(result);

    switch (response.status) {
      case 200: {
        return true;
      }
      case 400: throw Error('删除请求错误');
      case 403: throw Error('无法删除');
      case 500: throw Error('服务器错误');
      default: throw Error('未知错误');
    }
  }
  catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    else {
      console.error('Unknown error');
    }
    return false;
  }
}

export async function UpdateLabTitle(id: number, title: string): Promise<boolean> {
  try {
    if (!id) throw Error('实验不存在');
    if (!title || title.length === 0) throw Error('实验标题不能为空');

    const response = await fetch(`${urlHeader}/lab/title?id=${id}&title=${title}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include"
    });
    const result = await response.json();
    console.log(result);

    switch (response.status) {
      case 200: {
        return true;
      }
      case 400: throw Error('修改请求错误');
      case 403: throw Error('修改失败');
      case 500: throw Error('服务器错误');
      default: throw Error('未知错误');
    }
  }
  catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    else {
      console.error('Unknown error');
    }
    return false;
  }
}
