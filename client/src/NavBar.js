import { NavLink } from "react-router-dom"
import styled from "styled-components";
import Button from "./components/Button";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"


function NavBar({ user, setUser }) {
    const navigate = useNavigate()

    function handleLogout() {
        if (user) {
            fetch("/logout", { method: "DELETE" }).then((r) => {
                if (r.ok) {
                    setUser(null)
                    navigate("/")
                }
            })
        }
    }

    function noUser() {
        return (
            <>
            {/* <NavLink
            className="nav-buttons"
            to="/"
            >
                <span>Login</span>
            </NavLink> */}

            </>
        )
    }

    function withUser() {
        return (
            <><Wrapper>
                {/* <Button
                    as={Link}
                    to="create-new-chart"
                >
                    <span>New Chart</span>
                </Button> */}

                <NavLink         
                    to="/"
                    className="nav-logo"
                >
                    <Logo>{"chore :~) heroes"}</Logo>
                </NavLink>

                

            </Wrapper>
            
            <LogoutButton
                  
                    to="/"
                    onClick={handleLogout}
                >
                    <span>Logout</span>
                </LogoutButton>
                </>
        )
    }
    
    return (
        <>

            {user ? withUser() : noUser()}

        </>
    )
}
// const Wrapper2 = styled.div`
// position: relative;
// `
const LogoutButton = styled(Button)`
position: absolute;
right: 0;
top: 0;
margin-top: 3px;
margin-right: 3px;
font-size: .75rem;
border-width: 6px;


`
const NavButt = styled(Button)`
max-width: 100px;
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