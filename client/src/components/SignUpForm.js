import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Button from "./Button"
import Error from "./Error";

function SignUpForm({ setUser }) {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    function handleSignUpSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        setErrors([])
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                password_confirmation: passwordConfirmation
            }),
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
        <form onSubmit={handleSignUpSubmit}>
            <FormField>
                <Label>
                    Username:
                </Label>
                <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </FormField>
            <FormField>
                <Label>
                    Password:
                </Label>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormField>
            <FormField>
                <Label>
                    Password confirmation:
                </Label>
                <Input
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
            </FormField>
            <Button type="submit">
                {isLoading ? "Loading" : <span>Sign Up!</span>}
            </Button>
            {errors.map((err) => (
                <Error key={err}>{err}</Error>
            ))}
        </form>
    )
}

const FormField = styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;
const Label = styled.label`
  color: dimgray;
  display: block;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 8px;
`;
const Input = styled.input`
  border-radius: 5px;
  border: 1px solid transparent;
  border-color: dimgray;
  -webkit-appearance: none;
  max-width: 100%;
  width: 100%;
  font-size: 1rem;
  line-height: 1.5;
  padding: 4px;
`;

export default SignUpForm