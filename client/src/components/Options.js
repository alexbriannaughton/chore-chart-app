import styled from "styled-components"
import { useState } from 'react'
import Button from "./Button"
import { useParams } from 'react-router-dom'
import Error from "./Error"
import { useNavigate } from "react-router-dom"

function Options({ memberTasks, setMemberTasks, setActiveButton, user, setUser }) {

    const navigate = useNavigate()

    const params = useParams()

    const [subMenu, setSubMenu] = useState(null)

    const [errors, setErrors] = useState([])

    const [rotateBool, setRotateBool] = useState(null)

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

    const [autoRotateMenu, setAutoRotateMenu] = useState(false)

    const [renameChart, setRenameChart] = useState(false)
    const [newChartName, setNewChartName] = useState(memberTasks[0].chore_wheel.name)

    const [deleteChartMenu, showDeleteChartMenu] = useState(false)

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
        setAutoRotateMenu(false)
        setRenameChart(false)
        showDeleteChartMenu(false)
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

    function updateAutoRotate(e) {
        e.preventDefault()

        fetch(`/chore_wheels/${params.chartId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ auto_rotate: rotateBool })
        }).then((r) => {
            if (r.ok) {
                setErrors(["Updated!"])
            }
            else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }
    function updateChartName(e) {
        e.preventDefault()

        fetch(`/chore_wheels/${params.chartId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newChartName })
        }).then((r) => {
            if (r.ok) {
                fetch(`/chore_wheels/${params.chartId}`)
                    .then((res) => res.json())
                    .then((mt) => {
                        setMemberTasks(mt)
                        setActiveButton("Wheel")
                    })
            }
            else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }
    function handleDeleteChart() {
        fetch(`/chore_wheels/${params.chartId}`, {
            method: "DELETE"
        }).then((r) => {
            if (r.ok) {
                fetch(`/users/${user.id}`)
                .then((res) => res.json()).then((updatedUser) => setUser(updatedUser))
                navigate("/")
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
                                <span>Submit changes</span>
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
                                <span>Submit changes</span>
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
        if (autoRotateMenu) {
            return (
                <>
                    <OptionsHeader>Chart settings:</OptionsHeader>
                    <Subhead>Auto-rotate chores every Monday morning?</Subhead>
                    <form onSubmit={updateAutoRotate}>
                        <BoolWrapper>
                            <RadioInput
                                type="radio"
                                value={true}
                                onChange={(e) => setRotateBool(e.target.value)}
                                name="auto-rotate"
                            />
                            <BoolLabel style={{ fontWeight: "400" }}>Yes</BoolLabel>
                            <br></br>
                            <RadioInput
                                type="radio"
                                value={0}
                                onChange={(e) => setRotateBool(e.target.value)}
                                name="auto-rotate"
                            />
                            <BoolLabel style={{ fontWeight: "400" }}>No, I'll rotate it myself</BoolLabel>
                        </BoolWrapper>
                        <SubButton type="submit">
                            <span>Update</span>
                        </SubButton>
                        <div style={{ maxWidth: "70%", width: "500px", margin: "auto" }}>
                            <FormField>
                                {errors.map((err) => (
                                    <Error1 key={err}>{err}</Error1>
                                ))}
                            </FormField>
                        </div>
                    </form>
                    <BackButton
                        onClick={handleBackButtonClick}
                    ><span>Go back</span></BackButton>
                </>
            )
        }
        if (renameChart) {
            return (
                <>
                    <OptionsHeader>Chart settings:</OptionsHeader>
                    <Subhead>Enter chart's new name:</Subhead>
                    <form onSubmit={updateChartName}>
                        <FormField>
                            <Input
                                type="text"
                                value={newChartName}
                                onChange={(e) => setNewChartName(e.target.value)}
                            />
                        </FormField>
                        <div style={{ maxWidth: "80%", width: "500px", margin: "auto" }}>
                            <FormField>
                                {errors.map((err) => (
                                    <Error1 key={err}>{err}</Error1>
                                ))}
                            </FormField>
                        </div>
                        <SubButton type="submit">
                            <span>Update</span>
                        </SubButton>
                    </form>
                    <BackButton
                        onClick={handleBackButtonClick}
                    ><span>Go back</span></BackButton>
                </>
            )
        }
        if (deleteChartMenu) {
            return (
                <>
                    <OptionsHeader>Are you sure</OptionsHeader>
                    <Subhead>you want to delete this chart<br></br> and all of its data?</Subhead>
                    <DeleteAllButton onClick={handleDeleteChart}>
                        <span>Delete</span>
                    </DeleteAllButton>
                    <BackButton
                        onClick={handleBackButtonClick}
                    >
                        <span>Go back</span>
                    </BackButton>
                </>
            )
        }
        if (!subMenu) {
            return (
                <>
                    <OptionsHeader>Settings</OptionsHeader>
                    <OptionsButtons onClick={(e) => setSubMenu(e.target.innerText)}><span>Chart</span></OptionsButtons>
                    <OptionsButtons onClick={(e) => setSubMenu(e.target.innerText)}><span>Chores</span></OptionsButtons>
                    <OptionsButtons onClick={(e) => setSubMenu(e.target.innerText)}><span>Heroes</span></OptionsButtons>
                    
                    
                    <OptionsButtons onClick={(e) => setSubMenu(e.target.innerText)}><span>Add a user</span></OptionsButtons>

                </>
            )
        }
        if (subMenu === "Add a user") {
            return (
                <>
                    <OptionsHeader>Add new user</OptionsHeader>
                    <Subhead>Provide a pre-existing username below to add another user to this chart.<br /><small>Gives view, edit and post access to this chore wheel.</small></Subhead>
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
        if (subMenu === "Chores") {

            function renderTasks() {
                return (
                    memberTasks.map((mt) => {
                        function longName() {
                            if (mt.task.name.length > 13) {
                                return `${mt.task.name.substring(0, 13)}...`
                            } else return mt.task.name
                        }
                        return (
                            <OptionsButtons key={mt.id} onClick={(e) => handleEditTaskClick(mt.task)}><span>{longName()}</span></OptionsButtons>
                        )
                    })
                )
            }

            return (
                <>
                    <OptionsHeader>Chore Settings</OptionsHeader>
                    <Subhead>Which chore would you like to edit?</Subhead>
                    {renderTasks()}
                    <OptionsButtons onClick={(e) => setSubMenu(e.target.innerText)}><span>Add new chore</span></OptionsButtons>
                    <BackButton
                        onClick={handleBackButtonClick}
                    ><span>Go back</span></BackButton>

                </>
            )
        }
        if (subMenu === "Heroes") {

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
                    <OptionsHeader>Hero settings</OptionsHeader>
                    <Subhead>Which hero would you like to edit?</Subhead>
                    {renderMembers()}
                    <OptionsButtons onClick={(e) => setSubMenu(e.target.innerText)}><span>Add new hero</span></OptionsButtons>
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
        if (subMenu === "Chart") {
            return (
                <>
                    <OptionsHeader>Chart settings</OptionsHeader>
                    <OptionsButtons onClick={(e) => setAutoRotateMenu(true)}><span>Auto-rotate</span></OptionsButtons>
                    <OptionsButtons onClick={(e) => setRenameChart(true)}><span>Rename</span></OptionsButtons>
                    <OptionsButtons onClick={(e) => showDeleteChartMenu(true)}><span>Delete</span></OptionsButtons>
                    <BackButton
                        onClick={handleBackButtonClick}
                    ><span>Go back</span></BackButton>
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
const BoolWrapper = styled.div`
/* display: ;
justify-content: center;
margin: auto; */
text-align: center;
margin-bottom: 15px;
`
const RadioInput = styled.input`
   
    @media only screen and (max-width: 600px) {
    
    }
`;
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
const BoolLabel = styled.label`
  color: dimgray;

  font-size: 1rem;
  font-weight: 500;
`;
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
const DeleteAllButton = styled(Button)`
margin: auto;
margin-top: 15px;
display: block;
background-color: red;
border-color: #F5C2C1;
`

const OptionsButtons = styled(Button)`
margin: auto;
  display: block;
  border-radius: 50%;
  font-size: 1.4rem;
  margin-top: 14px;
  background-color: dimgray;
  border-color: #e8e8e8;
  min-width: 175px;

  @media only screen and (max-width: 600px) {
    min-width: 140px;
    font-size: 1rem;
    margin-top: 6px;
  }
  
`
const BackButton = styled(OptionsButtons)`
background-color: rgb(250, 194, 255);
color: black;
border-color: whitesmoke;
border-radius: 50%;
min-width: 0;
padding: 4px;
margin-top: 22px;
border-width: 5px;
font-size: 1rem;

@media only screen and (max-width: 600px) {
    font-size: small;
    margin-top: 15px;
  }
`

const SubButton = styled(Button)`
margin: auto;
display: block;
/* width: 149px; */
`

const OptionsHeader = styled.h1`
text-align: center;
text-decoration: underline;
font-size: 2.5rem;
@media only screen and (max-width: 600px) {
  font-size: 2rem;
  }
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