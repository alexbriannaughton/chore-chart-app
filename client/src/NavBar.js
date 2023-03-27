import { NavLink } from "react-router-dom"
import styled from "styled-components";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom"
import logo from "./images/logo.png"


function NavBar({ user, setUser }) {
    const navigate = useNavigate()

    function handleLogout() {
        if (user) {
            fetch("/logout", { method: "DELETE" }).then((r) => {
                if (r.ok) {
                    setUser(null)
                }
            })
        }
    }

    const size = window.matchMedia("(max-width: 600px)")

    function logoMediaQuery() {
        if (size.matches) {
            return 18
        } else return 30
    }

    function renderButtons() {
        return (
            <>
                <Wrapper>
                    <NavLink
                        to="/"
                        className="nav-logo"
                    >
                        <Logo>
                            {"chore"}
                            <img alt="Chore Heroes Logo" style={{ height: `${logoMediaQuery()}px` }} src={logo}></img>
                            {"heroes"}
                        </Logo>
                    </NavLink>
                </Wrapper>

                <NavLink to="/">
                    {user ?
                        <LogButton onClick={handleLogout}>
                            <span>Logout</span>
                        </LogButton>
                        :
                        <LogButton>
                            <span>Login</span>
                        </LogButton>
                    }
                </NavLink>
            </>
        )
    }

    return (
        <>
            {renderButtons()}
        </>
    )
}

const LogButton = styled(Button)`
position: absolute;
right: 0;
top: 0;
margin-top: 3px;
margin-right: 3px;
font-size: .75rem;
border-width: 6px;
@media only screen and (max-width: 600px) {
    font-size: .65rem;
    border-width: 4px;
  }
`
const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;
const Logo = styled.h1`
  font-family: "Londrina Outline", cursive;
  font-size: 3rem;
  color: chartreuse;
  background-color: dimgray;
  border: double;
  border-color: chartreuse;
  border-radius: 10px;
  margin: 0;
  text-align: center;
  text-decoration: none;
  padding-left: 15px;
  padding-right: 15px;

  &:hover {
    background-color: black;
    color: rgb(242, 98, 255);
  }

  

  @media only screen and (max-width: 600px) {
    font-size: 1.6rem;
    max-width: 200px;
  }
`;

export default NavBar