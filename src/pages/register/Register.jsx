import React, { useEffect, useState } from "react";
import homePageImg from "../../assets/homePageImg1.jpg";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { auth, database, googleProvider, refdb } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { update } from "firebase/database";
import { FaGoogle } from "react-icons/fa";

const Register = ({ setNoHeader, setNoFooter }) => {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  const [register, setRegister] = useState("signup");
  const [loginErr, setLoginErr] = useState("");
  const [signupErr, setSignupErr] = useState("");

  useEffect(() => {
    setNoHeader(true);
    setNoFooter(true);
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    if (displayName === "") {
      setSignupErr("Name field cannot be empty");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        // await sendEmailVerification(auth.currentUser)
        //   .then(() => {
        //     alert("Email verification Link send to your email address");
        //   })
        //   .catch((error) => {
        //     const errorMessage = error.message.substring(
        //       22,
        //       error.message.length - 2
        //     );
        //     setSignupErr(errorMessage);
        //   });

        await update(refdb(database, `users/` + res.user.uid), {
          username: displayName,
          email: email,
        });

        await updateProfile(res.user, {
          displayName,
        });

        setSignupErr("");
        setEmailInput("");

        navigate(`/home`);
      })
      .catch((error) => {
        const errorMessage = error.message.substring(
          22,
          error.message.length - 2
        );
        setSignupErr(errorMessage);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoginErr("");
        setEmailInput("");
        navigate(`/home`);
      })
      .catch((error) => {
        const errorMessage = error.message.substring(
          22,
          error.message.length - 2
        );
        setLoginErr(errorMessage);
      });
  };

  const handleForgetUser = () => {
    sendPasswordResetEmail(auth, emailInput)
      .then(() => {
        alert("Password reset link send to your email address");
      })
      .catch((error) => {
        const errorMessage = error.message.substring(
          22,
          error.message.length - 2
        );
        setLoginErr(errorMessage);
      });
  };

  const handleGoogleAuth = () => {
    signInWithPopup(auth, googleProvider).then(async (res) => {
      await update(refdb(database, `users/` + res.user.uid), {
        username: res.user.displayName,
        email: res.user.email,
      });
      setLoginErr("");
      setEmailInput("");
      navigate(`/home`);
    });
  };

  return register === "signup" ? (
    <div className="signup">
      <div className="wrapper">
        <img src={homePageImg} />
      </div>
      <div className="container">
        <div className="containerContent">
          <span className="heading">FilmFlare</span>
          <span className="registerState">SignUp</span>
          <form onSubmit={(e) => handleSignup(e)}>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Submit</button>
          </form>
          <span className="loginLink">
            Already a member?{" "}
            <span className="loginDirect" onClick={() => setRegister("login")}>
              Login
            </span>
          </span>
          {signupErr && <span className="err">{signupErr}</span>}
          <div className="iconsRegister">
            <span className="icon" onClick={() => handleGoogleAuth()}>
              <FaGoogle></FaGoogle>
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="login">
      <div className="wrapper">
        <img src={homePageImg} />
      </div>
      <div className="container">
        <div className="containerContent">
          <span className="heading">FilmFlare</span>
          <span className="registerState">Login</span>
          <form onSubmit={(e) => handleLogin(e)}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <input type="password" placeholder="Password" />
            <p className="forgetPassword" onClick={() => handleForgetUser()}>
              Forget Password ?
            </p>
            <button>Submit</button>
          </form>
          <span className="loginLink">
            Not a member?{" "}
            <span className="loginDirect" onClick={() => setRegister("signup")}>
              SignUp
            </span>
          </span>
          {loginErr && <span className="err">{loginErr}</span>}
          <div className="iconsRegister">
            <span className="icon" onClick={() => handleGoogleAuth()}>
              <FaGoogle></FaGoogle>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
