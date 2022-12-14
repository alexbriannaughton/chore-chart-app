import { useState } from "react"
import { useNavigate } from "react-router-dom";


function CreatePage({ user }) {

    const navigate = useNavigate()

    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const [chartName, setChartName] = useState("")

    const memberInputArr = [
        {
            type: "text",
            value: ""
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
                    value: ""
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
            newArr[index].value = e.target.value

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
                                name: member.value,
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
                        return fetch("/member_tasks", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                member_id: member.id,
                                task_id: newTasks[index].id,
                                chore_wheel_id: newChart.id
                            })
                        })
                    })
                )
            const newMTs =
                await Promise.all(
                    mtResps.map((mt) => {
                        return mt.json()
                    })
                )
            console.log(newMTs)
            navigate(`/your-charts/${newChart.id}`)
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    return (
        <div id="form-div">
            <h1>create new chart</h1>
            <div id="chart-name">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Chart name:
                        </label>
                        <input
                            type="text"
                            value={chartName}
                            onChange={(e) => setChartName(e.target.value)}
                        /><br />
                    </div>
                    <div>

                        {/* members form */}

                        {membersArr.map((item, i) => {
                            return (
                                <div id="members-div">
                                    <label>
                                        Member name:
                                    </label>
                                    <input
                                        onChange={handleMembersChange}
                                        value={item.value}
                                        id={i}
                                        type={item.type}
                                        size="40"
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => removeMemberInput(i)}
                                    >
                                        x
                                    </button>
                                </div>
                            );
                        })}
                        <button type="button" onClick={addMembersInput}>Add another member</button>

                        <br />

                        {/* tasks form */}
                        {tasksArr.map((item, i) => {
                            return (
                                <div id="tasks-div">
                                    <label>
                                        Task name:
                                    </label>
                                    <input
                                        onChange={handleTasksChange}
                                        value={item.value}
                                        id={i}
                                        type={item.type}
                                        size="40"
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => removeTaskInput(i)}
                                    >
                                        x
                                    </button>
                                </div>
                            );
                        })}
                        <button type="button" onClick={addTasksInput}>Add another task</button>

                        <br /><br />

                    </div>


                    <button type="submit">
                        {isLoading ? "Loading..." : "Submit"}
                    </button>
                    <br />
                    {errors.map((err) => (
                        <p key={err}>{err}</p>
                    ))}
                </form>
            </div>


        </div >
    )
}

export default CreatePage