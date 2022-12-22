import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [submitBtn, setSubmitBtn] = useState("");
  const [submitBtnState, setSubmitBtnState] = useState(true);
  const [emailInputState, setEmailInputState] = useState("");

  const showToastMessage = () => {
    toast.error("Email is not correct!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  function checkIfValid() {
    if (email === "" || email.includes("@") === false) {
      console.log(email);
      setEmailInputState("red");
      showToastMessage();
    }
  }

  function isValid() {
    if (email && email.includes("@")) {
      setEmailInputState("");
    }
  }

  useEffect(() => {
    if (email && email.includes("@")) {
      setSubmitBtnState("/dashboard");
      setSubmitBtn("active");
    } else {
      setSubmitBtnState("");
      setSubmitBtn("");
    }
    isValid();
  }, [email]);

  return (
    <div className="mainContainer">
      <ToastContainer />
      <div className="loginCard">
        <span>LOGIN FORM</span>
        <form action="">
          <div className="emailInputPlaceholder">
            <label className={`${emailInputState}`} htmlFor="loginEmailInput">
              Email
            </label>
            <input
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              type="email"
              required
              id="loginEmailInput"
              className={`${emailInputState}`}
              value={email}
            />
          </div>
          <Link
            onClick={checkIfValid}
            to={`${submitBtnState}`}
            state={{ data: email }}
          >
            <input
              type="submit"
              value={"Submit"}
              className={`submitEmailBtn ${submitBtn}`}
            />
          </Link>
        </form>
      </div>
    </div>
  );
}
