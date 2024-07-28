import {urlHeader} from "@src/utils/common";

interface GetLabsResponse {
  ok: boolean,
  labs: any[]
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
  catch (e) {
    console.log(e.message);
    return {
      ok: false,
      labs: []
    }
  }
}

export async function f() {

}
