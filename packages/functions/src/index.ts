import jwt_decode from 'jwt-decode';

export { createSlice, configureStore } from "@reduxjs/toolkit";
export type { Action, ThunkAction } from "@reduxjs/toolkit";
export { Provider as ReduxProvider, useDispatch, useSelector } from "react-redux";
export { BrowserRouter, Route, Routes, Navigate, Outlet, useParams, Link, useNavigate } from "react-router-dom";

export const jwtDecode = jwt_decode;
  
export enum Role {
    Traveler = 'traveler',
    Advertiser = 'advertiser',
    Admin = 'admin',
  }
  