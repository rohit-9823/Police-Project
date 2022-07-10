import React from 'react';
import { Link } from 'react-router-dom';
import SwitchButton from './switchButton';
import { Form, Formik,ErrorMessage,Field } from 'formik';
import * as yup from "yup"
import { useHistory } from 'react-router-dom';
import { httpClient } from '../../constants/httpClient';
import { notify } from '../../constants/notify';

const initialValues={
  username:"",
  password:""
}
let validationSchema = yup.object().shape({
  username: yup.string().email("Must be a valid email").required("Email is a required field").min(8,'Password is too short-should be 8 chars minimum.'),
  password: yup.string().required("Password  is a required field"),
});

export default function Login() {
  const history=useHistory()
  const login=(values)=>{
    console.log("values are",values)
    httpClient.UPLOAD("POST","oauth/token",values,"password")
    .then(resp=>{
      localStorage.setItem("user",resp)
      notify.success("Login success")
      history.push("/")
    })
    .catch(err=>{
      notify.error("Failed")
      console.log("error occurred",err)
    })
  }
  return <>
        <h1>this is login page</h1>

        </>;
}
