import styled from "styled-components"
import { useState } from 'react'
import Button from "./Button"
import { useParams } from 'react-router-dom'
import Error from "./Error"

function Options({ memberTasks, setMemberTasks, setActiveButton }) {

    const params = useParams()

    const [subMenu, setSubMenu] = useState(null)

    const [errors, setErrors] = useState([])

    const [taskToEdit, setTaskToEdit] = useState(null)
    const [memberToEdit, setMemberToEdit] = useState(null)

    const [addNewUser, setAddNewUser] = useState("")

    const [editTaskName, setEditTaskName] = useState("")
    const [editTaskDetails, setEditTaskDetails] = useState("")
    const [editMemberName, setEditMemberName] = useState("")
    const [editMemberEmail, setEditMemberEmail] = useState("")
    const [newTaskName, setNewTaskName] = useState("")
    const [newTaskDetails, setNewTaskDetails] = useState("")
    const [newMemberName, setNewMemberName] = useState("")
    const [newMemberEmail, setNewMemberEmail] = useState("")

    function handleEditTaskClick(task) {
        setTaskToEdit(task)
        setEditTaskName(task.name)
        setEditTaskDetails(task.details)
    }
    function handleEditMemberClick(member) {
        setMemberToEdit(member)
        setEditMemberName(member.name)
        setEditMemberEmail(member.email)
    }
    function handleTaskEditSubmit(e) {

        e.preventDefault()

        const updateObj = {
            name: editTaskName,
            details: editTaskDetails,
        }

        fetch(`/tasks/${taskToEdit.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateObj)
        }).then((r) => {
            if (r.ok) {
                fetch(`/chore_wheels/${params.chartId}`)
                    .then((res) => res.json())
                    .then((mt) => {
                        setMemberTasks(mt)
                        setActiveButton("Wheel")
                    })

            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }
    function newUserSubmit(e) {
        e.preventDefault()
        console.log(addNewUser)
        fetch("/add_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chore_wheel_id: params.chartId,
                username: addNewUser
            })
        }).then((r) => {
            if (r.ok) {
                setErrors(["Success!"])
            } else {
                r.json().then((err) => {
                    if (err.errors[0] === 'User has already been taken') {
                        setErrors([`${addNewUser} has already been added`])
                    } else {
                        setErrors(err.errors)
                    }

                })
            }
        })
    }
    function handleMemberEditSubmit(e) {
        e.preventDefault()

        const updateObj = {
            name: editMemberName,
            email: editMemberEmail,
        }

        fetch(`/members/${memberToEdit.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateObj)
        }).then((r) => {
            if (r.ok) {
                fetch(`/chore_wheels/${params.chartId}`)
                    .then((res) => res.json())
                    .then((mt) => {
                        setMemberTasks(mt)
                        setActiveButton("Wheel")
                    })

            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }
    function handleBackButtonClick() {
        setSubMenu(null)
        setTaskToEdit(null)
        setMemberToEdit(null)
    }
    function handleDeleteMember() {
        fetch(`/members/${memberToEdit.id}`, {
            method: "DELETE"
        })
            .then((r) => {
                if (r.ok) {
                    fetch(`/chore_wheels/${params.chartId}`)
                        .then((res) => res.json())
                        .then((mt) => {
                            setMemberTasks(mt)
                            setActiveButton("Wheel")
                        })
                }
            })
    }
    function handleDeleteTask() {
        fetch(`/tasks/${taskToEdit.id}`, {
            method: "DELETE"
        })
            .then((r) => {
                if (r.ok) {
                    fetch(`/rotate/${params.chartId}`).then((r) => {
                        if (r.ok) {
                            fetch(`/chore_wheels/${params.chartId}`)
                                .then((res) => res.json())
                                .then((mt) => {
                                    setMemberTasks(mt)
                                    setActiveButton("Wheel")
                                })
                        }
                    })

                }
            })
    }
    function newTaskSubmit(e) {
        e.preventDefault()

        const taskObj = {
            name: newTaskName,
            details: newTaskDetails,
            chore_wheel_id: params.chartId,
        }

        fetch(`/new_task`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskObj)
        }).then((r) => {
            if (r.ok) {
                fetch(`/chore_wheels/${params.chartId}`)
                    .then((res) => res.json())
                    .then((mt) => {
                        setMemberTasks(mt)
                        setActiveButton("Wheel")
                    })

            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }
    function newMemberSubmit(e) {
        e.preventDefault()

        const memberObj = {
            name: newMemberName,
            details: newMemberEmail,
            chore_wheel_id: params.chartId,
        }

        fetch(`/new_member`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(memberObj)
        }).then((r) => {
            if (r.ok) {
                fetch(`/chore_wheels/${params.chartId}`)
                    .then((res) => res.json())
                    .then((mt) => {
                        setMemberTasks(mt)
                        setActiveButton("Wheel")
                    })

            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    function renderPage() {
        if (taskToEdit) {
            return (
                <>
                    <OptionsHeader>Edit chore:</OptionsHeader>
                    <form onSubmit={handleTaskEditSubmit}>
                        <FormField>
                            <Input
                                type="text"
                                value={editTaskName}
                                onChange={(e) => setEditTaskName(e.target.value)}
                            />
                        </FormField>
                        <FormField>
                            <TextArea
                                type="text"
                                value={editTaskDetails}
                                onChange={(e) => setEditTaskDetails(e.target.value)}
                            />
                        </FormField>
                        <div style={{ maxWidth: "80%", width: "500px", margin: "auto" }}>
                            <FormField>
                                {errors.map((err) => (
                                    <Error1 key={err}>{err}</Error1>
                                ))}
                            </FormField>
                        </div>
                        <FormField>
                            <SubButton type="submit">
                                Submit changes
                            </SubButton>
                        </FormField>
                    </form>
                    <DeleteButton onClick={handleDeleteTask}>
                        <span>Delete this chore</span>
                    </DeleteButton>
                    <BackButton
                        onClick={handleBackButtonClick}
                    ><span>Go back</span></BackButton>
                </>
            )
        }
        if (memberToEdit) {
            return (
                <>
                    <OptionsHeader>Edit hero:</OptionsHeader>
                    <form onSubmit={handleMemberEditSubmit}>
                        <LabelDiv><Label>name:</Label></LabelDiv>
                        <FormField>
                            <Input
                                type="text"
                                value={editMemberName}
                                onChange={(e) => setEditMemberName(e.target.value)}
                            />
                        </FormField>

                        <LabelDiv><Label>email:</Label></LabelDiv>
                        <FormField>
                            <Input
                                type="email"
                                value={editMemberEmail}
                                onChange={(e) => setEditMemberEmail(e.target.value)}
                            />
                        </FormField>
                        <NoteDiv><Note>{`*Leave email blank if ${memberToEdit.name} does not need chore reminder emails.`}</Note></NoteDiv>
                        <div style={{ maxWidth: "80%", width: "500px", margin: "auto" }}>
                            <FormField>
                                {errors.map((err) => (
                                    <Error1 key={err}>{err}</Error1>
                                ))}
                            </FormField>
                        </div>
                        <FormField>
                            <SubButton type="submit">
                                Submit changes
                            </SubButton>
                        </FormField>
                    </form>

                    <DeleteButton onClick={handleDeleteMember}>
                        <span>Delete this hero</span>
                    </DeleteButton>

                    <BackButton
                        onClick={handleBackButtonClick}
                    ><span>Go back</span></BackButton>
                </>
            )
        }
        if (!subMenu) {
            return (
                <>
                    <OptionsHeader>Options</OptionsHeader>

                    <OptionsButtons onClick={(e) => setSubMenu(e.target.innerText)}><span>Edit chores</span></OptionsButtons>
                    <OptionsButtons onClick={(e) => setSubMenu(e.target.innerText)}><span>Edit heroes</span></OptionsButtons>
                    <OptionsButtons onClick={(e) => setSubMenu(e.target.innerText)}><span>Add new chore</span></OptionsButtons>
                    <OptionsButtons onClick={(e) => setSubMenu(e.target.innerText)}><span>Add new hero</span></OptionsButtons>
                    <OptionsButtons onClick={(e) => setSubMenu(e.target.innerText)}><span>Add a user</span></OptionsButtons>

                </>
            )
        }
        if (subMenu === "Add a user") {
            return (
                <>
                    <OptionsHeader>Add new user</OptionsHeader>
                    <Subhead>Provide a pre-existing username below to add another user to this chart.<br /><br />Gives access to view, edit and post to this chore wheel.</Subhead>
                    <form onSubmit={newUserSubmit}>
                        <LabelDiv><Label>username:</Label></LabelDiv>
                        <FormField>
                            <Input
                                type="text"
                                value={addNewUser}
                                onChange={(e) => setAddNewUser(e.target.value)}
                            ></Input>
                        </FormField>
                        <div style={{ maxWidth: "80%", width: "500px", margin: "auto" }}>
                            <FormField>
                                {errors.map((err) => (
                                    <Error1 key={err}>{err}</Error1>
                                ))}
                            </FormField>
                        </div>

                        <FormField>
                            <SubButton type="submit">
                                Submit
                            </SubButton>
                        </FormField>
                    </form>
                    <BackButton
                        onClick={handleBackButtonClick}
                    ><span>Go back</span></BackButton>
                </>
            )
        }
        if (subMenu === "Edit chores") {

            function renderTasks() {
                return (
                    memberTasks.map((mt) => {
                        return (
                            <OptionsButtons key={mt.id} onClick={(e) => handleEditTaskClick(mt.task)}><span>{mt.task.name}</span></OptionsButtons>
                        )
                    })
                )
            }

            return (
                <>
                    <OptionsHeader>Options</OptionsHeader>
                    <Subhead>Which chore would you like to edit?</Subhead>
                    {renderTasks()}
                    <BackButton
                        onClick={handleBackButtonClick}
                    ><span>Go back</span></BackButton>

                </>
            )
        }
        if (subMenu === "Edit heroes") {

            function renderMembers() {
                return (
                    memberTasks.map((mt) => {
                        return (
                            <OptionsButtons key={mt.id} onClick={(e) => handleEditMemberClick(mt.member)}><span>{mt.member.name}</span></OptionsButtons>
                        )
                    })
                )
            }

            return (
                <>
                    <OptionsHeader>Options</OptionsHeader>
                    <Subhead>Which hero would you like to edit?</Subhead>
                    {renderMembers()}
                    <BackButton
                        onClick={handleBackButtonClick}
                    ><span>Go back</span></BackButton>
                </>
            )
        }
        if (subMenu === "Add new chore") {
            return (
                <>
                    <OptionsHeader>Add new chore:</OptionsHeader>
                    <form onSubmit={newTaskSubmit}>
                        <LabelDiv><Label>name:</Label></LabelDiv>
                        <FormField>
                            <Input
                                type="text"
                                value={newTaskName}
                                onChange={(e) => setNewTaskName(e.target.value)}
                            />
                        </FormField>
                        <LabelDiv><Label>details:</Label></LabelDiv>
                        <FormField>
                            <TextArea
                                type="text"
                                value={newTaskDetails}
                                onChange={(e) => setNewTaskDetails(e.target.value)}
                            />
                        </FormField>

                        <div style={{ maxWidth: "80%", width: "500px", margin: "auto" }}>
                            <FormField>
                                {errors.map((err) => (
                                    <Error1 key={err}>{err}</Error1>
                                ))}
                            </FormField>
                        </div>

                        <FormField>
                            <SubButton type="submit">
                                Submit chore
                            </SubButton>
                        </FormField>
                    </form>
                    <BackButton
                        onClick={handleBackButtonClick}
                    ><span>Go back</span></BackButton>
                </>
            )
        }
        if (subMenu === "Add new hero") {
            return (
                <>
                    <OptionsHeader>Add new hero:</OptionsHeader>
                    <form onSubmit={newMemberSubmit}>
                        <LabelDiv><Label>name:</Label></LabelDiv>
                        <FormField>
                            <Input
                                type="text"
                                value={newMemberName}
                                onChange={(e) => setNewMemberName(e.target.value)}
                            />
                        </FormField>
                        <LabelDiv><Label>email:</Label></LabelDiv>
                        <FormField>
                            <TextArea
                                type="email"
                                value={newMemberEmail}
                                onChange={(e) => setNewMemberEmail(e.target.value)}
                            />
                        </FormField>

                        <div style={{ maxWidth: "80%", width: "500px", margin: "auto" }}>
                            <FormField>
                                {errors.map((err) => (
                                    <Error1 key={err}>{err}</Error1>
                                ))}
                            </FormField>
                        </div>

                        <FormField>
                            <SubButton type="submit">
                                Submit
                            </SubButton>
                        </FormField>
                    </form>
                    <BackButton
                        onClick={handleBackButtonClick}
                    >
                        <span>
                            Go back
                        </span>
                    </BackButton>
                </>
            )
        }
    }

    return (
        <>
            {renderPage()}
        </>
    )
}
const NoteDiv = styled.div`
    width: 500px;
    margin: auto;
    display: block;
`
const Note = styled.label`
  color: dimgray;
  display: block;
  font-size: .9rem;
  font-weight: 450;
  margin-bottom: 15px;
  margin-top: -10px;

  @media only screen and (max-width: 600px) {

  }
`;
const LabelDiv = styled.div`
    width: 500px;
    margin: auto;
    display: block;
`
const Label = styled.label`
  color: dimgray;
  display: block;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 8px;

  @media only screen and (max-width: 600px) {
    margin-left: 40px;
  }
`;
const Error1 = styled(Error)`
width: 500px;
max-width: 80%;
`

const DeleteButton = styled(Button)`
margin: auto;
margin-top: 15px;
display: block;
background-color: red;
border-color: #F5C2C1;
width: 149px;
`

const OptionsButtons = styled(Button)`
margin: auto;
  display: block;
  border-radius: 50%;
  margin-top: 6px;
  background-color: dimgray;
  border-color: #e8e8e8;
  min-width: 140px;
`
const BackButton = styled(OptionsButtons)`
background-color: rgb(250, 194, 255);
color: black;
border-color: whitesmoke;
border-radius: 50%;
min-width: 0;
font-size: small;
padding: 4px;
margin-top: 15px;
border-width: 5px;
`

const SubButton = styled(Button)`
margin: auto;
display: block;
/* width: 149px; */
`

const OptionsHeader = styled.h1`
text-align: center;
text-decoration: underline;
`

const Subhead = styled.h4`
    text-align: center;
    font-weight: 500;
    margin-left: 4%;
    margin-right: 4%;
`

const FormField = styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;
const TextArea = styled.textarea`
  border-radius: 5px;
  border: 1px solid transparent;
  border-color: dimgray;
  -webkit-appearance: none;
  max-width: 80%;
  width: 500px;
  font-size: 1rem;
  line-height: 1.5;
  padding: 4px;
  margin: auto;
  display: block;
  font-family: BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
  font-weight: 400;
`
const Input = styled.input`
  border-radius: 5px;
  border: 1px solid transparent;
  border-color: dimgray;
  -webkit-appearance: none;
  max-width: 80%;
  width: 500px;
  font-size: 1rem;
  line-height: 1.5;
  padding: 4px;
  margin: auto;
  display: block;
`;

export default Options