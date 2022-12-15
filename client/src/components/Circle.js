import { PieChart } from "react-minimal-pie-chart"
import { useParams } from 'react-router-dom'
import { useState } from "react"


function Circle({ memberTasks, setMemberTasks }) {

    const [rotate, setRotate] = useState(false)

    const params = useParams()

    function randomColor() {
        return Math.floor(Math.random() * 16777215).toString(16);
    }
    const datas = memberTasks.map((mt) => {
        return {
            member: mt.member.name,
            task: mt.task.name,
            value: 1,
            color: `#${randomColor()}`
        }
    })

    async function rotateTasks() {
        setRotate(true)
        await fetch(`/rotate/${params.chartId}`)
        await fetch(`/chore_wheels/${params.chartId}`)
            .then((res) => res.json())
            .then((data) => {
                setMemberTasks(data)
                setRotate(false)
            })
    }

    return (
        <div>
            <div id="circle-div">
                <div id="bottom-circle">
                    <PieChart
                        data={datas}
                        style={{ height: '500px' }}
                        label={({ dataEntry }) => dataEntry.member}
                        labelStyle={(index) => ({
                            fill: 'black',
                            fontSize: '5px',
                            fontFamily: 'sans-serif',
                        })}
                        radius={42}
                        labelPosition={112}
                    />
                </div>
                <div id="top-circle">
                    <PieChart
                        className={rotate ? "spin" : null}
                        data={datas}
                        style={{ height: '410px' }}
                        label={({ dataEntry }) => dataEntry.task}
                        labelStyle={(index) => ({
                            fill: 'black',
                            fontSize: '5px',
                            fontFamily: 'sans-serif',
                        })}
                    />
                </div>

            </div>
            <button onClick={rotateTasks}>rotate tasks</button>
        </div>
    )
}

export default Circle