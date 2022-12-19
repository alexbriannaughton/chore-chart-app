import { PieChart } from "react-minimal-pie-chart"
import { useParams } from 'react-router-dom'
import { useState } from "react"
import Button from "./Button"
import styled from "styled-components"


function Circle({ memberTasks, setMemberTasks }) {

    const [rotate, setRotate] = useState(false)

    const params = useParams()

    const wheelColors = ["rgb(242, 98, 255)", "dimgray", "chartreuse", "rgb(250, 194, 255)"]

    console.log(memberTasks)

    const datas = memberTasks.map((mt, index) => {
        return {
            member: mt.member.name,
            task: mt.task.name,
            value: 1,
            color: wheelColors[index],
            details: `${mt.member.name} is on ${mt.task.name} duty. further details will go here.`
        }
    })

    function renderDetails(segment) {
        console.log(segment)
    }

    async function rotateFetch() {
        await fetch(`/rotate/${params.chartId}`)
        await fetch(`/chore_wheels/${params.chartId}`)
            .then((res) => res.json())
            .then((data) => {
                setMemberTasks(data)
                setRotate(false)
            })
    }

    async function rotateTasks() {
        setRotate(true)
        setTimeout(rotateFetch, 2000)
    }

    return (
        <div>
            <Header>{memberTasks[0] && memberTasks[0].chore_wheel.name}</Header>
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
                        style={{ height: '430px' }}
                        label={({ dataEntry }) => dataEntry.task}
                        labelStyle={(index) => ({
                            fill: 'black',
                            fontSize: '5px',
                            fontFamily: 'sans-serif',
                        })}
                        onClick={(e, segmentIndex) => renderDetails(datas[segmentIndex])}

                    />
                    <CircleButton onClick={rotateTasks}>
                        <span>rotate<br></br>tasks</span>
                    </CircleButton>
                </div>

            </div>

        </div>
    )
}
const Header = styled.h1`
    margin: 0;
    margin-bottom: -50px;
    padding: 0;
    text-align: center;
`

const CircleButton = styled(Button)`
    position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border-radius: 50%;
  height: 70px;
  
`
export default Circle