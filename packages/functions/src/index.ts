import jwt_decode from 'jwt-decode';

export const jwtDecode = jwt_decode;
  
export enum Role {
    Traveler = 'traveler',
    Advertiser = 'advertiser',
    Admin = 'admin',
  }
  