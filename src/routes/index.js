import React from 'react';
import { BrowserRouter ,Route,Switch} from 'react-router-dom';
import { PublicRoute } from './publicRoutes';
import { Routes } from './mapper';
import ProtectedRoute from './protectedRoutes';
import Home from "./../pages/home"
export default function Router() {
  return (
      <BrowserRouter>
      <Switch>
        {
            Routes.map((item,index)=>{
                return item.type==="public"?
                <PublicRoute exact component={item.component} path={item.path}></PublicRoute>:
                <ProtectedRoute exact component={item.component} path={item.path}></ProtectedRoute>
            })
        }
        </Switch>
      </BrowserRouter>

  );
}
