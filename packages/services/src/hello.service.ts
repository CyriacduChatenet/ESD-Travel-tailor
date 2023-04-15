import { Dispatch, SetStateAction } from '@travel-tailor/functions'
import { useFetch } from '@travel-tailor/hooks'

const getHello = (api_url: string, setError: Dispatch<SetStateAction<any>>) => {
  return useFetch.get(api_url, setError)
}

export const HelloService = {
  getHello,
}
