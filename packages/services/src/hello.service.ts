import { Dispatch, SetStateAction } from '@travel-tailor/functions'
import { useFetch } from '@travel-tailor/hooks'

const getHello = (api_url: string) => {
  return useFetch.get(api_url)
}

export const HelloService = {
  getHello,
}
