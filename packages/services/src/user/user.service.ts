import { API_USER_ROUTE, ROLES } from '@travel-tailor/constants'
import { jwtDecode } from '@travel-tailor/functions'
import { useFetch } from '@travel-tailor/hooks'

import { TokenService } from '../tokens/token.service'
import { TravelerService } from '../traveler/traveler.service'
import { AdvertiserService } from '../advertiser/advertiser.service'

const updateUser = (api_url: string, id: string, body: { email?: string, username?: string, password?: string, roles?: string, advertiser?: string, traveler?: string}) => {
  return useFetch.protectedPatch(`${api_url}${API_USER_ROUTE}/${id}`, body, `${TokenService.getSigninToken()}`);
}

const getUserByToken = async (api_url: string, email: string) => {
  return await useFetch.get(`${api_url}${API_USER_ROUTE}/${email}`)
}

const getUserInfo = async (api_url: string) => {
  const token = TokenService.getAccessToken()
  const decodedToken = jwtDecode(String(token)) as any
  const user = await getUserByToken(api_url, decodedToken.email)

  if ((await user.roles) === ROLES.TRAVELER) {
    const traveler = await TravelerService.findTravelerById(
      api_url,
      user.traveler.id
    )
    return { ...user, ...traveler }
  }

  if ((await user.roles) === ROLES.ADVERTISER) {
    const advertiser = await AdvertiserService.findAdvertiserById(
      api_url,
      user.advertiser.id
    )
    return { ...user, ...advertiser }
  }
}

export const UserService = {
  updateUser,
  getUserByToken,
  getUserInfo,
}
