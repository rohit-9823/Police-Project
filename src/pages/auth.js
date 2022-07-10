import React from 'react';
import { BrowserRouter, Route, Switch,useRouteMatch } from 'react-router-dom';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { PublicRoute } from '../routes/publicRoutes';
import Login from '../components/auth/login';
import Register from '../components/auth/register';

export default function Auth(){
  return <>
        <Navbar></Navbar>
          <Switch>
            <Route path={"/auth/login"}>
               <Login></Login>
            </Route>
            <Route path={"/auth/register"}>
               <Register></Register>
            </Route>
          </Switch>
          <Footer></Footer>
        </>;
}
