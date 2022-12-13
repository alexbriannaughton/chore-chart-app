import { NavLink } from "react-router-dom"

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
            <NavLink
            className="nav-buttons"
            to="/"
            >
                <span>Login</span>
            </NavLink>

            </>
        )
    }

    function withUser() {
        return (
            <>
                <NavLink
                    className="nav-buttons"
                    to="create-new-chart"
                >
                    <span>Create New Chart</span>
                </NavLink>

                <NavLink
                    className="nav-buttons"
                    to="your-chart"
                >
                    <span>Your Fam's Chart</span>
                </NavLink>

                <NavLink
                    className="nav-buttons"
                    exact to="/"
                    onClick={handleLogout}
                >
                    <span>Logout</span>
                </NavLink>

            </>
        )
    }
    
    return (
        <nav id="navbar">

            {user ? withUser() : noUser()}

        </nav>
    )
}

export default NavBar