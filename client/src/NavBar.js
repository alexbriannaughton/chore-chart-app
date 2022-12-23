import { NavLink } from "react-router-dom"
import styled from "styled-components";
import Button from "./components/Button";
import { Link } from "react-router-dom";


function NavBar({ user, setUser }) {

    function handleLogout() {
        if (user) {
            fetch("/logout", { method: "DELETE" }).then((r) => {
                if (r.ok) {
                    setUser(null)
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
            <Wrapper>
                <Button
                    as={Link}
                    to="create-new-chart"
                >
                    <span>New Chart</span>
                </Button>

                <NavLink         
                    to="your-charts"
                    className="nav-logo"
                >
                    <Logo>{"chore :~) changr"}</Logo>
                </NavLink>

                <Button
                    as={Link}
                    exact to="/"
                    onClick={handleLogout}
                >
                    <span>Logout</span>
                </Button>

            </Wrapper>
        )
    }
    
    return (
        <>

            {user ? withUser() : noUser()}

        </>
    )
}
const NavButt = styled(Button)`
max-width: 100px;
`
const Wrapper = styled.header`
  display: flex;
  justify-content: space-evenly;
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
    font-size: 1.3rem;
    max-width: 100px;
  }
`;

export default NavBar