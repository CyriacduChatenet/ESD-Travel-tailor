import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const jwtDecode = jwt_decode;
export const reactRouter = { useNavigate };
  
export enum Role {
    Traveler = 'traveler',
    Advertiser = 'advertiser',
    Admin = 'admin',
  }
  