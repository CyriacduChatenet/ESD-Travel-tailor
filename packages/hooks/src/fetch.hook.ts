import { Dispatch, SetStateAction } from "react"

const get = async (api_url: string, setError?: Dispatch<SetStateAction<any>> | any) => {
  try {
    const response = await fetch(api_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    const responseJSON = await response.json()
    if(response.status >= 400) {
      setError(response)
    }
    return responseJSON
  } catch (err) {
    console.error(err)
    // if(setError) {
    //   setError(err)
    // }
  }
}

const protectedGet = async (api_url: string, token: string, setError?: Dispatch<SetStateAction<any>> | any) => {
  try {
    const response = await fetch(api_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const responseJSON = await response.json()
    if(response.status >= 400) {
      setError(response)
    }
    return responseJSON
  } catch (err) {
    console.error(err)
    // if(setError) {
    //   setError(err)
    // }
  }
}

const post = async (api_url: string, body: any, setError?: Dispatch<SetStateAction<any>> | any) => {
  try {
    const response = await fetch(api_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    })
    const responseJSON = await response.json()
    if(response.status >= 400) {
      setError(response)
    }
    return responseJSON
  } catch (err) {
    console.error(err)
    // if(setError) {
    //   setError(err)
    // }
  }
}

const postFormData = async (api_url: string, body: any, setError?: Dispatch<SetStateAction<any>> | any) => {
  try {
    const response = await fetch(api_url, {
      method: 'POST',
      body: body,
    })
    const responseJSON = await response.json()
    if(response.status >= 400) {
      setError(response)
    }
    return responseJSON
  } catch (err) {
    console.error(err)
    // if(setError) {
    //   setError(err)
    // }
  }
}

const protectedPost = async (api_url: string, body: any, token: string, setError?: Dispatch<SetStateAction<any>> | any) => {
  try {
    const response = await fetch(api_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
    const responseJSON = await response.json()
    if(response.status >= 400) {
      setError(response)
    }
    return responseJSON
  } catch (err) {
    console.error(err)
    // if(setError) {
    //   setError(err)
    // }
  }
}

const protectedPostFormData = async (api_url: string, body: any, token: string, setError?: Dispatch<SetStateAction<any>> | any) => {
  try {
    const response = await fetch(api_url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: body,
    })
    const responseJSON = await response.json()
    if(response.status >= 400) {
      setError(response)
    }
    return responseJSON
  } catch (err) {
    console.error(err)
    // if(setError) {
    //   setError(err)
    // }
  }
}

const patch = async (api_url: string, body: Object, setError?: Dispatch<SetStateAction<any>> | any) => {
  try {
    const response = await fetch(api_url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    })
    const responseJSON = await response.json()
    if(response.status >= 400) {
      setError(response)
    }
    return responseJSON
  } catch (err) {
    console.error(err)
    // if(setError) {
    //   setError(err)
    // }
  }
}

const patchFormData = async (api_url: string, body: any, setError?: Dispatch<SetStateAction<any>> | any) => {
  try {
    const response = await fetch(api_url, {
      method: 'PATCH',
      body: body,
    })
    const responseJSON = await response.json()
    if(response.status >= 400) {
      setError(response)
    }
    return responseJSON
  } catch (err) {
    console.error(err)
    // if(setError) {
    //   setError(err)
    // }
  }
}

const protectedPatch = async (api_url: string, body: Object, token: string, setError?: Dispatch<SetStateAction<any>> | any) => {
  try {
    const response = await fetch(api_url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
    const responseJSON = await response.json()
    if(response.status >= 400) {
      setError(response)
    }
    return responseJSON
  } catch (err) {
    console.error(err)
    // if(setError) {
    //   setError(err)
    // }
  }
}

const protectedPatchFormData = async (api_url: string, body: any, token: string, setError?: Dispatch<SetStateAction<any>> | any) => {
  try {
    const response = await fetch(api_url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: body,
    })
    const responseJSON = await response.json()
    if(response.status >= 400) {
      setError(response)
    }
    return responseJSON
  } catch (err) {
    console.error(err)
    // if(setError) {
    //   setError(err)
    // }
  }
}

const remove = async (api_url: string, token: string, setError?: Dispatch<SetStateAction<any>> | any) => {
 try {
  const response = await fetch(api_url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const responseJSON = await response.json()
  if(response.status >= 400) {
    setError(responseJSON)
  }
  return responseJSON
 } catch (err) {
  console.error(err)
  // if(setError) {
  //   setError(err)
  // }
 }
}

const protectedRemove = async (api_url: string, token: string, setError?: Dispatch<SetStateAction<any>> | any) => {
  try {
    const response = await fetch(api_url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const responseJSON = await response.json()
    if(response.status >= 400) {
      setError(response)
    }
    return responseJSON
  } catch (err) {
    console.error(err)
    // if(setError) {
    //   setError(err)
    // }
  }
}

export const useFetch = {
  get,
  protectedGet,
  post,
  postFormData,
  protectedPost,
  protectedPostFormData,
  patch,
  patchFormData,
  protectedPatch,
  protectedPatchFormData,
  remove,
  protectedRemove,
}
