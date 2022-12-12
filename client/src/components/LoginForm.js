import { useNavigate } from "react-router-dom"
import { useState } from "react"

function LoginForm( {setUser} ) {
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    function handleLoginSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((r) => {
            setIsLoading(false)
            if (r.ok) {
                r.json().then((user) => setUser(user))
                navigate("/")
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    } 

    return (
        <div>
            <form onSubmit={handleLoginSubmit}>
                <div>
                    <label>
                        Username:
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>
                        Password:
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">
                    {isLoading ? "Loading..." : "Login"}
                </button>
                {errors.map((err) => (
                    <p key={err}>{err}</p>
                ))}
            </form>
        </div>
    )
}

export default LoginForm