import { useState } from "react"
import LoginForm from "./components/LoginForm"
import SignUpForm from "./components/SignUpForm"
import styled from "styled-components";
import Button from "./components/Button";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import logo from "./images/logo.png"

function Homepage({ setUser, user }) {

    const navigate = useNavigate()

    const [showLogin, setShowLogin] = useState(true)

    function loginStuff() {
        return (
            <Wrapper>
                <Logo>
                    <h1 style={{ margin: "0", marginBottom: "-12px" }}>chore</h1>
                    <img style={{ height: "60px", position: "absolute", left: "0", right: "0", marginLeft: "auto", marginRight: "auto" }} src={logo}></img><br />
                    <h1 style={{ margin: "0", marginTop: "-24px" }}>heroes</h1>
                </Logo>
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
                <Wrapper>
                    <H2>Yo, {user.username}!</H2>
                    <H4>view your charts:</H4>
                    {renderAllCharts()}
                    <NewButton onClick={newChartClick} color="secondary">
                        <span>
                            Make a new chart!
                        </span>
                    </NewButton>
                </Wrapper>
            )
        }
        if (user.chore_wheels.length < 1) {
            return (
                <Wrapper>
                    <H2>Welcome, {user.username}!</H2>
                    <NewButton onClick={newChartClick} color="secondary">
                        <span>
                            Make a chore chart!
                        </span>
                    </NewButton>
                </Wrapper>
            )
        }
    }

    return (
        <>
            {user ? renderWhichHomePage() : loginStuff()}
        </>
    )
}
const H4 = styled.h4`
text-align: center;
font-size: large;
`
const H2 = styled.h2`
text-align: center;
font-size: 3rem;
@media only screen and (max-width: 600px) {
   font-size: xx-large;
  }
`
const NewButton = styled(Button)`
border-radius: 50%;
height: 130px;
width: 130px;
margin: auto;
display: block;
margin-top: 35px;
margin-bottom: 75px;
border-style: outset;
  &:active {
    border-style: inset;
  }

  @media only screen and (max-width: 600px) {
    margin-bottom: 45px;
  }
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
const Logo = styled.div`
position: relative;
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