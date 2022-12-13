import { useState } from "react"
import LoginForm from "./components/LoginForm"
import SignUpForm from "./components/SignUpForm"

function Homepage({ setUser, user }) {

    const [showLogin, setShowLogin] = useState(true)

    function loginStuff() {
        return (
            <>
                {showLogin ? (
                    <div>
                        <LoginForm
                            setUser={setUser}
                        />
                        <div>
                            <p>don't have an account?</p>
                            <button onClick={e => setShowLogin(false)}>
                                sign up!
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div>
                            <SignUpForm setUser={setUser} />
                            <p>already have an account?</p>
                            <button onClick={e => setShowLogin(true)}>
                                log in!
                            </button>
                        </div>
                    </div>
                )}
            </>
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
            {user ? userHome() : loginStuff() }
        </>
    )
}

export default Homepage