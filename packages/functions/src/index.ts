import jwt_decode from 'jwt-decode';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

export const jwtDecode = jwt_decode;
export const reactRouter = { BrowserRouter, Routes, Route, useNavigate };
  
export enum Role {
    Traveler = 'traveler',
    Advertiser = 'advertiser',
    Admin = 'admin',
  }
  