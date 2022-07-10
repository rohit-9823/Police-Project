import { React, useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import Loginverify from "../validation/loginVerify";
import { Form, Field } from "formik";
import { Formik } from "formik";
import { Button } from "../Button-loader/Button-load";
import { toast } from "react-toastify";
import { httpClient } from "../../constants/httpClient";
import { useHistory } from "react-router-dom";
import "./login.css";
import { useTranslation } from "react-i18next";
// import { useEffect } from "react";
import i18next from "i18next";

import { object } from "yup";
function Login(props) {
  // translation
  const { i18n, t } = useTranslation(["login"]);
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);
  const handleLanguageChange = (e) => {
    i18next.changeLanguage(e.target.value);
  };
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [showhide, setshowhide] = useState(false);

  const showhidePassword = () => {
    setshowhide(!showhide);
  };
  const history = useHistory();
  let cls = showhide ? "fas fa-eye" : "fas fa-eye-slash";
  // useEffect(() => {
  //   if( localStorage.getItem('Logindata')){
  //    history.push('/dashboard');
  //   }

  //   console.log(props);
  // }, []);

  return (
    <div className="body">
      {/* // Formik Started */}
      <Formik
        initialValues={{
          Username: "",
          password: "",
          state: true,
        }}
        validationSchema={Loginverify}
        onSubmit={async (values) => {
          console.log(values);
          let loginDetails = {
            username: values.Username,
            password: values.password,
            state: values.state,
          };
          httpClient
            .UPLOAD("POST", "oauth/token", loginDetails, "password", null)
            .then((resp) => {
              let response = JSON.parse(resp);
              let { access_token, refresh_token, expires_in, status } =
                response;
              console.log(access_token, refresh_token);
              localStorage.setItem("dm-access_token", access_token);
              localStorage.setItem("dm-refresh_token", refresh_token);
              localStorage.setItem("timeout", expires_in);
              localStorage.setItem("status", status);
              localStorage.setItem("Logindata", JSON.stringify(values.state));
              setIsButtonLoading(false);
              props.history.push("/vehicle");
              //window.location.reload()
              toast.success("Successfully Logged in", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
              });
            })
            .catch((err) => {
              setIsButtonLoading(false);
              toast.error("Bad Credential !!!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
              });
            });
        }}
      >
        {({ errors, touched }) => (
          // Formik form started
          <Form autocomplete="off" novalidate>
            <div class="content login_content">
              {/* Upper Display Part */}
              <div class="up">
                <img src={logo} class="logo" />
                <select 
                  class="languagelogin" 
                  value={localStorage.getItem("i18nextLng")}
                  onChange={handleLanguageChange}
                >
                  <option value="en">En</option>
                  <option value="ne">नेपा</option>
                </select>
                <p class="text1">{t("nepalpolice")}</p>
                <p class="text2">{t("fleetmanagementsystem")}</p>
                <p class="text3">{t("login")}</p>
              </div>
              {/* Form Started */}

              {/* Username Form Started */}
              <div class="boxes">
                <label class="boxlabel">{t("username")}</label>
                <Field
                  name="Username"
                  className={`form-control shadow-none inputbox ${
                    errors.Username && touched.Username && "is-invalid"
                  }`}
                />
              </div>

              {errors.Username && touched.Username ? (
                <div className="error-message">{errors.Username}</div>
              ) : null}
              {/* Username form ended */}
              <div className="gap-login"></div>
              {/* password form started */}
              <div class="boxes">
                <label class="boxlabel">{t("password")}</label>
                <Field
                  name="password"
                  type={showhide ? "text" : "password"}
                  className={`form-control shadow-none inputbox ${
                    errors.password && touched.password && "is-invalid"
                      ? "redborder"
                      : null
                  } `}
                />
                <i class={cls} id="errspan" onClick={showhidePassword}></i>
              </div>

              {errors.password && touched.password ? (
                <div className="error-message">{errors.password}</div>
              ) : null}

              {/* password form ended */}

              <input type="checkbox" class="check" />
              <label>{t("rememberme")}</label>
              <Button
                type="submit"
                onClick={() => {
                  setIsButtonLoading(true);
                  setTimeout(() => {
                    setIsButtonLoading(false);
                  }, 1100);
                }}
                isLoading={isButtonLoading}
                class="btn btn-primary button login_btn"
                style={{ float: "right", backgroundColor: "#3f51b5" }}
              >
                <span
                  style={{
                    margin: "auto",
                    display: "table",
                    border: "0px solid red",
                  }}
                ></span>{" "}
                {t("login")}
              </Button>
              {/* <div class="forgotpassword">
                <a href="">{t("forgotpassword")}</a>
              </div> */}
              {/*Form ended */}
            </div>
          </Form>
          // Formik form ended
        )}
      </Formik>
      {/* Formik ended */}
    </div>
  );
}

export default Login;
