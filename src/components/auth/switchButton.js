import React from 'react';
import { Link } from 'react-router-dom';

export default function SwitchButton() {
  return<>
              <Link to={"/auth/register"}><a className="btn btn-register">Register</a></Link>
            <Link to={"/auth/login"}><a className="btn btn-signin">Sign In</a></Link>
        </>
  ;
}
