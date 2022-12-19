import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./components/Button";

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
            value: ""
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
                    value: ""
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

    function handleTasksChange(e) {
        e.preventDefault()

        const index = e.target.id
        setTasksArr(s => {
            const newArr = s.slice()
            newArr[index].value = e.target.value

            return newArr
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)

        try {
            //no blank fields catcher
            membersArr.map((member) => {
                if (member.value === "") {
                    throw ['no blank fields may be submitted']
                }
            })
            tasksArr.map((task) => {
                if (task.value === "") {
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
                                name: task.value,
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


            await fetch(`/empty_tasks/${newChart.id}`)

            // const newMTs =
            //     await Promise.all(
            //         mtResps.map((mt) => {
            //             return mt.json()
            //         })
            //     )
            // console.log(newMTs)
            navigate(`/your-charts/${newChart.id}`)
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    return (
        <WrapperGrandpa>
            <Wrapper>
                <div id="chart-name">
                    <form onSubmit={handleSubmit}>
                        <WrapperChild1>
                            <Label>
                                Your new chore wheel's name:
                            </Label><br />
                            <NameInput
                                type="text"
                                value={chartName}
                                onChange={(e) => setChartName(e.target.value)}
                            /><br />
                        </WrapperChild1>
                        <Wrapper>

                            {/* members form */}
                            <WrapperChild>
                                {membersArr.map((item, i) => {
                                    return (
                                        <div>
                                            <FormField>
                                                <Label>
                                                    Member name:
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
                                                <Label>
                                                    & Member email:
                                                </Label>
                                                <Input
                                                    onChange={handleEmailsChange}
                                                    value={item.emailValue}
                                                    id={i}
                                                    type={item.type}
                                                    size="40"

                                                />&nbsp;
                                                <button
                                                    type="button"
                                                    onClick={(e) => removeMemberInput(i)}
                                                >
                                                    x
                                                </button>
                                            </FormField>
                                        </div>
                                    );
                                })}
                                <Button color="secondary" type="button" onClick={addMembersInput}><span>Add another member</span></Button>
                            </WrapperChild>
                            <br />

                            {/* tasks form */}
                            <WrapperChild>
                                {tasksArr.map((item, i) => {
                                    return (
                                        <div>
                                            <FormField>
                                                <Label>
                                                    Task name:
                                                </Label>
                                                <Input
                                                    onChange={handleTasksChange}
                                                    value={item.value}
                                                    id={i}
                                                    type={item.type}
                                                    size="40"
                                                />&nbsp;
                                                <button
                                                    type="button"
                                                    onClick={(e) => removeTaskInput(i)}
                                                >
                                                    x
                                                </button>
                                            </FormField>
                                        </div>
                                    );
                                })}
                                <Button color="secondary" type="button" onClick={addTasksInput}><span>Add another task</span></Button>
                            </WrapperChild>
                            <br /><br />

                        </Wrapper>

                        <WrapperChild1>
                            <Button type="submit">
                                {isLoading ? "Loading..." : <span>Submit</span>}
                            </Button>
                        </WrapperChild1>
                        <br />
                        {errors.map((err) => (
                            <p key={err}>{err}</p>
                        ))}
                    </form>
                </div>


            </Wrapper>
        </WrapperGrandpa>
    )
}

const Label = styled.label`
  color: dimgray;
  display: block;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 8px;
`;

const FormField = styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }
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
`;
const NameInput = styled(Input)`
    width: 50%;
`;

const WrapperGrandpa = styled.div`
  border: 3px solid chartreuse;  
  border-radius: 5px;
  box-shadow: 0px 0px 20px black;
  margin: 2% 18%;
`;

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 30px auto;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  justify-content: space-evenly;
`;

const WrapperChild = styled.div`
  flex: 1;
  border: 2px dotted rgb(250, 194, 255);
  
`;
const WrapperChild1 = styled.div`
    text-align: center;
`;


export default CreatePage