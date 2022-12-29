import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./components/Button";
import Error from "./components/Error";

function CreatePage({ user }) {

    const navigate = useNavigate()

    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const [chartName, setChartName] = useState("")

    const memberInputArr = [
        {
            nameValue: "",
            emailValue: ""
        }
    ]

    const taskInputArr = [
        {
            nameValue: "",
            detailsValue: ""
        }
    ]

    const [membersArr, setMembersArr] = useState(memberInputArr)
    const [tasksArr, setTasksArr] = useState(taskInputArr)

    function addMembersInput(e) {
        setMembersArr(s => {
            return [
                ...s,
                {
                    nameValue: "",
                    emailValue: ""
                }
            ]
        })
    }

    function addTasksInput(e) {
        setTasksArr(s => {
            return [
                ...s,
                {
                    nameValue: "",
                    detailsValue: ""
                }
            ]
        })
    }
    function removeMemberInput(i) {
        const updated =
            membersArr.filter((task, index) => index !== i)
        setMembersArr(updated)
    }

    function removeTaskInput(i) {
        const updated =
            tasksArr.filter((task, index) => index !== i)
        setTasksArr(updated)
    }

    function handleMembersChange(e) {
        e.preventDefault()

        const index = e.target.id
        setMembersArr(s => {
            const newArr = s.slice()
            newArr[index].nameValue = e.target.value

            return newArr
        })
    }

    function handleEmailsChange(e) {
        e.preventDefault()

        const index = e.target.id
        setMembersArr(s => {
            const newArr = s.slice()
            newArr[index].emailValue = e.target.value

            return newArr
        })
    }

    function handleTaskNameChange(e) {
        e.preventDefault()

        const index = e.target.id
        setTasksArr(s => {
            const newArr = s.slice()
            newArr[index].nameValue = e.target.value

            return newArr
        })
    }
    function handleTaskDetailsChange(e) {
        e.preventDefault()

        const index = e.target.id
        setTasksArr(s => {
            const newArr = s.slice()
            newArr[index].detailsValue = e.target.value

            return newArr
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)

        try {
            //no blank fields catcher
            membersArr.map((member) => {
                if (member.nameValue === "" || member.emailValue === "") {
                    throw ['no blank fields may be submitted']
                }
            })
            tasksArr.map((task) => {
                if (task.nameValue === "" || task.detailsValue === "") {
                    throw ['no blank fields may be submitted']
                }
            })

            //create chore wheel
            const chartResp =
                await fetch("/chore_wheels", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: chartName,
                        user_id: user.id
                    })
                })
            const newChart = await chartResp.json()
            if (!chartResp.ok) {
                throw newChart.errors
            }

            //create members
            const memberResps =
                await Promise.all(
                    membersArr.map((member) => {
                        return fetch("/members", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: member.nameValue,
                                email: member.emailValue,
                                chore_wheel_id: newChart.id
                            })
                        })
                    })
                )
            const newMembers =
                await Promise.all(
                    memberResps.map((member) => {
                        return member.json()
                    })
                )
            // console.log(newMembers)

            //create tasks
            const taskResps =
                await Promise.all(
                    tasksArr.map((task) => {
                        return fetch("/tasks", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: task.nameValue,
                                details: task.detailsValue,
                                chore_wheel_id: newChart.id
                            })
                        })
                    })
                )
            const newTasks =
                await Promise.all(
                    taskResps.map((task) => {
                        return task.json()
                    })
                )
            // console.log(newTasks)

            //create membertask for every member
            const mtResps =
                await Promise.all(
                    newMembers.map((member, index) => {
                        function assignTasks() {
                            if (!newTasks[index]) {
                                return 1
                            }
                            else return newTasks[index].id
                        }

                        return fetch("/member_tasks", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                member_id: member.id,
                                task_id: assignTasks(),
                                chore_wheel_id: newChart.id
                            })
                        })
                    })
                )

            if (newTasks.length > newMembers.length) {
                await fetch(`/empty_tasks/${newChart.id}`)
            }
            // const newMTs =
            //     await Promise.all(
            //         mtResps.map((mt) => {
            //             return mt.json()
            //         })
            //     )
            // console.log(newMTs)
            navigate(`/${newChart.id}`)
        } catch (error) {
            setErrors(error)
        }
        setIsLoading(false)
    }

    return (
        <WrapperGrandpa>
            <Wrapper>
                <div id="chart-name">
                    <form onSubmit={handleSubmit}>
                        <WrapperChild2>
                            <Label3>
                                First, name your new chore chart:
                            </Label3><br />
                            <NameInput
                                type="text"
                                value={chartName}
                                onChange={(e) => setChartName(e.target.value)}
                            /><br />
                        </WrapperChild2>
                        <Divider />
                        <Label3>
                            {"Next, let us know the names of your chart's heroes (the people who will be doing the chores):"}
                        </Label3><br />
                        <HeroWrapper>

                            {/* members form */}

                            {/* <WrapperChild> */}
                            {membersArr.map((item, i) => {
                                return (
                                    <WrapperChild>
                                        <FormField>
                                            <Label>
                                                Hero name:
                                            </Label>
                                            <Input
                                                onChange={handleMembersChange}
                                                value={item.nameValue}
                                                id={i}
                                                type={item.type}
                                                size="40"
                                            />
                                        </FormField>
                                        <FormField>
                                            <Label2>
                                                & Hero email:
                                            </Label2>
                                            <Input
                                                onChange={handleEmailsChange}
                                                value={item.emailValue}
                                                id={i}
                                                type="email"
                                                size="40"

                                            />&nbsp;
                                            <RemoveButton
                                                type="button"
                                                onClick={(e) => removeMemberInput(i)}
                                            >
                                                <span>Remove</span>
                                            </RemoveButton>
                                        </FormField>
                                    </WrapperChild>
                                );
                            })}
                            <AddButton color="secondary" type="button" onClick={addMembersInput}><span>Add another hero</span></AddButton>
                            {/* </WrapperChild> */}
                            <br />
                            <Divider />
                            {/* tasks form */}
                            <Label3>
                                {"Last, let us know the chores that will be on your chart:"}
                            </Label3><br />
                            {/* <WrapperChild> */}
                            {tasksArr.map((item, i) => {
                                return (

                                    <WrapperChild>
                                        <FormField>
                                            <Label>
                                                Chore name:
                                            </Label>
                                            <Input
                                                onChange={handleTaskNameChange}
                                                value={item.nameValue}
                                                id={i}
                                                type={item.type}
                                                size="40"
                                            />
                                        </FormField>
                                        <FormField>
                                            <Label2>
                                                & Chore details:
                                            </Label2>
                                            <Input
                                                onChange={handleTaskDetailsChange}
                                                value={item.detailsValue}
                                                id={i}
                                                type={item.type}
                                                size="40"

                                            />
                                            &nbsp;
                                            <RemoveButton
                                                type="button"
                                                onClick={(e) => removeTaskInput(i)}
                                            >
                                                <span>Remove</span>
                                            </RemoveButton>
                                        </FormField>
                                    </WrapperChild>
                                );
                            })}
                            <AddButton color="secondary" type="button" onClick={addTasksInput}><span>Add another chore</span></AddButton>
                            {/* </WrapperChild> */}
                            <br /><br />

                        </HeroWrapper>

                        <WrapperChild1>
                            <Button type="submit">
                                {isLoading ? "Loading..." : <span>Submit!</span>}
                            </Button>
                        </WrapperChild1>
                        <br />
                        {errors.map((err) => (
                            <Error key={err}>{err}</Error>
                        ))}
                    </form>
                </div>


            </Wrapper>
        </WrapperGrandpa>
    )
}

const AddButton = styled(Button)`
margin: auto;
display: block;
/* margin-top: 10px; */
`

const RemoveButton = styled(Button)`
background-color: red;
margin: auto;
display: block;
margin-top: -15px;
margin-bottom: 5px;
padding: 4px;
font-size: .8rem;
border-width: 5px;
border-color: whitesmoke;
`

const Label = styled.label`
  color: dimgray;
  display: block;
  font-size: 1rem;
  font-weight: 500;
  margin-left: 5%;
  /* margin-bottom: 8px; */
  /* @media only screen and (max-width: 600px) {
        text-align: center;
    } */
`;
const Label2 = styled.label`
  color: dimgray;
  display: block;
  font-size: 1rem;
  font-weight: 500;
  margin-left: 5%;
  /* margin-bottom: 8px; */
  @media only screen and (max-width: 600px) {
        /* text-align: center; */
        margin-top: -10px;
        
    }
`;
const Label3 = styled.label`
  color: dimgray;
  display: block;
  font-size: 1rem;
  font-weight: 500;
  margin-left: 5%;
  text-align: center;
  /* margin-bottom: 8px; */
  /* @media only screen and (max-width: 600px) {
        text-align: center;
    } */
`;

const FormField = styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;
const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
  margin-top: 0;
`;



const Input = styled.input`
  border-radius: 5px;
  border: 1px solid transparent;
  border-color: dimgray;
  -webkit-appearance: none;
  max-width: 100%;
  width: 90%;
  font-size: 1rem;
  line-height: 1.5;
  padding: 4px;
  margin: auto;
    display: block;

`;
const NameInput = styled(Input)`
    width: 50%;
    margin-bottom: 6px;

    @media only screen and (max-width: 600px) {
        width: 75%;
        margin-bottom: 0;
    }
`;

const WrapperGrandpa = styled.div`
  border: 3px solid chartreuse;  
  border-radius: 5px;
  box-shadow: 0px 0px 20px black;
  margin: 2% 18%;
  @media only screen and (max-width: 600px) {
    margin: 2% 5%;
    /* max-width: 300px; */
  }
`;

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 30px auto;
  padding-left: 16px;
  padding-right: 16px;
  display: block;
  justify-content: space-evenly;

`;
const HeroWrapper = styled(Wrapper)`
margin-top: 5px;
`

const WrapperChild = styled.div`
  /* flex: 1; */
  border: 2px dotted rgb(250, 194, 255);
  width: 70%;
  margin: auto;
  margin-bottom: 8px;
  display: block;
  @media only screen and (max-width: 600px) {
    width: 90%;
  }
`;
const WrapperChild1 = styled.div`
    text-align: center;
    margin-top: -32px;
`;
const WrapperChild2 = styled.div`
    text-align: center;
    /* margin-top: -32px; */
`;


export default CreatePage