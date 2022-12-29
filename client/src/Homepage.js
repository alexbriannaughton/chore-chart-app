import { useState } from "react"
import LoginForm from "./components/LoginForm"
import SignUpForm from "./components/SignUpForm"
import styled from "styled-components";
import Button from "./components/Button";
import { Link, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom";

function Homepage({ setUser, user }) {

    const navigate = useNavigate()

    const [showLogin, setShowLogin] = useState(true)

    function loginStuff() {
        return (
            <Wrapper>
                <Logo>{"chore :~) heroes"}</Logo>
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

    function renderAllCharts() {
        return (
            user && user.chore_wheels.map((cw) => {
                return (
                    <div align="center">
                        <Link
                            key={cw.id}
                            to={`${cw.id}`}
                        >
                            {cw.name}
                        </Link>
                    </div>
                )
            })
        )
    }
    function newChartClick() {
        navigate("/create-new-chart")
    }
    function renderWhichHomePage() {
        if (user.chore_wheels.length >= 1) {
            return (
                <>
                    <h2 align="center">Yo, {user.username}!</h2>
                    <h4 align="center">view your charts:</h4>
                    {renderAllCharts()}
                    <NewButton onClick={newChartClick}color="secondary">
                        <span>
                            Make a new chart!
                        </span>
                    </NewButton>
                </>
            )
        }
        if (user.chore_wheels.length < 1) {
            return (
                <>
                    <h2 align="center">Welcome, {user.username}!</h2>
                    <NewButton onClick={newChartClick}color="secondary">
                        <span>
                            Make a new chart!
                        </span>
                    </NewButton>
                </>
            )
        }
    }

    return (
        <>
            {user ? renderWhichHomePage() : loginStuff()}
        </>
    )
}

const NewButton = styled(Button)`
border-radius: 50%;
height: 130px;
width: 130px;
margin: auto;
display: block;
margin-top: 35px;
`
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