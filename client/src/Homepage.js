import { useState } from "react"
import LoginForm from "./components/LoginForm"
import SignUpForm from "./components/SignUpForm"

function Homepage({ setUser }) {

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
                        <SignUpForm setUser={setUser}/>
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

    return (
        <>
            {loginStuff()}
        </>
    )
}

export default Homepage