import { useState } from "react"
import LoginForm from "./components/LoginForm"
import SignUpForm from "./components/SignUpForm"
import styled from "styled-components";
import Button from "./components/Button";

function Homepage({ setUser, user }) {

    const [showLogin, setShowLogin] = useState(true)

    function loginStuff() {
        return (
            <Wrapper>
                <Logo>{"chore :~) changr"}</Logo>
                {showLogin ? (
                    <>
                        <LoginForm
                            setUser={setUser}
                        />
                        <Divider />
                        
                            <p align="center">
                                don't have an account? &nbsp;
                                <div style={{ display: "flex", justifyContent: "right", marginTop: "23px", marginRight: "12px" }}>
                                    <Button color="secondary" onClick={e => setShowLogin(false)}>
                                        <span>Sign up!</span>
                                    </Button>
                                </div>
                            </p>
                        
                    </>
                ) : (
                    <>
                        <SignUpForm setUser={setUser} />
                        <Divider />
                        
                            <p align="center">
                                have an account? &nbsp;
                                <div style={{ display: "flex", justifyContent: "right", marginTop: "23px", marginRight: "12px" }}>

                                    <Button color="secondary" onClick={e => setShowLogin(true)}>
                                        <span>Log in!</span>
                                    </Button>
                                </div>
                            </p>
                        

                    </>
                )}
            </Wrapper>
        )
    }

    function userHome() {
        // if (user) {
        return (
            <div>
                <h1>
                    Welcome, {user.username}!
                </h1>
            </div>
        )
        // }
    }

    return (
        <>
            {user ? userHome() : loginStuff()}
        </>
    )
}


const Wrapper = styled.section`
  max-width: 500px;
  margin: 40px auto;
  padding: 16px;
  padding-bottom: 0;
  border: 3px solid rgb(250, 194, 255);
  border-radius: 5px;
  box-shadow: 0px 0px 20px black;

  @media only screen and (max-width: 600px) {
    max-width: 300px;
  }
`;
const Logo = styled.h1`
  font-family: "Londrina Outline", cursive;
  font-size: 3rem;
  color: chartreuse;
  background-color: dimgray;
  border: double;
  border-color: chartreuse;
  border-radius: 10px;
  margin: 8px 0 16px;
  text-align: center;


`;
const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;

export default Homepage