import React from 'react';
import SwitchButton from './switchButton';
import { Formik,ErrorMessage,Form,Field} from 'formik';
import * as yup from 'yup';
import { string } from 'yup';
import { httpClient } from '../../constants/httpClient';
import { useHistory } from 'react-router-dom';

const initialValues={
  username: "",
  password: "",
  mobileNumber: "",
  fullName: "",
  address: "",
  confirmPassword:""
}
let schema = yup.object().shape({
  username: yup.string().email("Must be a valid email").required("Email is a required field").min(8,'Password is too short-should be 8 chars minimum.'),
  password: yup.string().required("Password  is a required field"),
  mobileNumber: yup.string().required("Mobile Number is a required field"),
  fullName: yup.string().required("Full name is a required field"),
  address:yup.string().required("Address is a required field"),
  confirmPassword:string().required("Confirm password is a required field").test('passwords-match','Passwords must match', function(value){
    return this.parent.password === value
  })
});


export default function Register() {
  let history=useHistory()

  const registerUser=(values)=>{
    httpClient.POST("user/create",values)
    .then(resp=>{
      history.push("/auth/login")
      console.log("response is",resp.data.message)
    })
    .catch(err=>{
      console.log("error is",err)
    })
  }

  return <h1>this is register page</h1>

}
