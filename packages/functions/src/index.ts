import jwt_decode from 'jwt-decode';
import { BrowserRouter, Routes, Route, redirect } from 'react-router-dom';

export const jwtDecode = jwt_decode;
export const reactRouter = { BrowserRouter, Routes, Route, redirect }