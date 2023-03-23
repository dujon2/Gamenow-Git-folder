import "./login.css";
import { useRef,useContext } from "react";
import {loginCall} from "../../apiCalls"
import {AuthContext} from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

export default function Login() {

    const email = useRef();
    const password = useRef();
    const{user,isFetching,error,dispatch} = useContext(AuthContext);//making context accessible 


    const handleClick = (e)=>{//e.preventdefault stops page from refreshing witheery click
    e.preventDefault();
    console.log(email);
    loginCall({email:email.current.value,password: password.current.value},dispatch);//email is just a ref so we had to use .current.value
  };

  console.log(user);
  return (
    <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
              <h3 className="loginLogo"> Lama social</h3>
                <span className="loginDesc">
                    Connect with friends to game
                </span>
          </div>  
          <div className="loginRight">
              <form className="loginBox" onSubmit={handleClick}>
                  <input placeholder="Email" type="email" className="loginInput" ref={email}/>
                  <input 
                    placeholder="Password" 
                    type="password" 
                    required
                    minLength={6}
                    className="loginInput"
                    ref={password}
                  />
                  <button className="loginButton" type="submit" disabled={isFetching}>{/* disables loggin button while is fr=etching is true*/}
                    {isFetching ? <CircularProgress color="white" size="20px"/>:"Log In"}
                  </button>
                  <span className="loginForgot"> Forgot Password</span>
                  <button className="loginRegisterButton">
                   {isFetching ? <CircularProgress color="white" size="20px"/>:" Create a New Account"}

                   </button>
                
              </form>
          </div>
        </div>
    </div>
  )
}
