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

export async function f() {

}
