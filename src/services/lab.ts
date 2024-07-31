import {urlHeader} from "@src/utils/common";
import {Lab} from "@src/types/lab";

interface GetLabsResponse {
  ok: boolean,
  labs: Lab[]
}

interface GetLabResponse {
  ok: boolean,
  lab: Lab | null
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

export async function GetLabById(id: number): Promise<GetLabResponse> {
  try {
    const response = await fetch(`${urlHeader}/lab?id=${id}`, {
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
        lab: result.lab
      }
    }
    else {
      return {
        ok: false,
        lab: null
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
      lab: null
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
      case 400: throw Error('新建实验请求错误');
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
      case 400: throw Error('删除实验请求错误');
      case 403: throw Error('无法删除实验');
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
      case 400: throw Error('修改实验标题请求错误');
      case 403: throw Error('修改实验标题失败');
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

export async function CreateTestTubeRack(labId: number, label: string): Promise<CreateLabResponse> {
  try {
    if (!label || label.length === 0) throw Error('试管架标签不能为空');

    const response = await fetch(`${urlHeader}/lab/testTubeRack/create?id=${labId}&label=${label}`, {
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
      case 400: throw Error('新建试管架请求错误');
      case 403: throw Error('创建试管架失败');
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

export async function CreateTestTube(testTubeRackId: number, label: string, type: string, indexInRack: number): Promise<CreateLabResponse> {
  try {
    if (!label || label.length === 0) throw Error('试管标签不能为空');
    if (!type || type.length === 0) throw Error('试管类型不能为空');

    const response = await fetch(`${urlHeader}/lab/testTube/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        testTubeRackId: testTubeRackId,
        label: label,
        type: type,
        indexInRack: indexInRack
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
      case 400: throw Error('新建试管请求错误');
      case 403: throw Error('无法创建试管');
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

export async function UpdateTestTubeIndexInRack(id: number, indexInRack: number): Promise<boolean> {
  try {
    const response = await fetch(`${urlHeader}/lab/testTube/indexInRack?id=${id}&indexInRack=${indexInRack}`, {
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
      case 400: throw Error('更新试管架位置序号请求错误');
      case 403: throw Error('无法更新试管架位置序号');
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
