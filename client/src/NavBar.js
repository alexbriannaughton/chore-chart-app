import { NavLink } from "react-router-dom"

function NavBar() {
    return (
        <nav id="navbar">

            <NavLink className="nav-buttons" to="create-new-chart">
                <span>Create New Chart</span>
            </NavLink>
            <NavLink className="nav-buttons" exact to="/">
                <span>Home</span>
            </NavLink>
            <NavLink className="nav-buttons" to="your-chart">
                <span>Your Fam's Chart</span>
            </NavLink>
        </nav>
    )
}

export default NavBar