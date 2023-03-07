export type AccessToken = {
  id: string
  username: string
  email: string
  password: string
  roles: string
  iat: number
  exp: number
}

export type AccessTokenPayload = {
  username: string
  email: string
  password: string
  roles: string
}
