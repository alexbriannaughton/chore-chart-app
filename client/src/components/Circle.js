import { PieChart } from "react-minimal-pie-chart"
import { useParams } from 'react-router-dom'
import { useState } from "react"
import Button from "./Button"
import styled from "styled-components"



function Circle({ memberTasks, setMemberTasks, showModal, setShowModal, currentDetails, setCurrentDetails }) {

    const [rotate, setRotate] = useState(false)

    const [hovered, setHovered] = useState(undefined);

    const params = useParams()

    const wheelColors = ["rgb(242, 98, 255)", "dimgray", "chartreuse", "rgb(250, 194, 255)", "chartreuse", "dimgray"]

    const datas = memberTasks.map((mt, index) => {
        return {
            member: mt.member.name,
            task: mt.task.name,
            value: 1,
            color: wheelColors[index % wheelColors.length],
            details: `${mt.member.name} is on "${mt.task.name}" duty. ${mt.task.details}`
        }
    })

    const data = datas.map((entry, i) => {
        if (hovered === i) {
            return {
                ...entry,
                color: 'white',
            };
        }
        return entry;
    });



    function handleSliceClick(segment, i) {
        if (!showModal) {
            setCurrentDetails(segment)
            setShowModal(true)
        }
        if (showModal) {
            if (currentDetails.member === segment.member) {
                setShowModal(false)
                setCurrentDetails(null)
            } else {
                setCurrentDetails(segment)
            }
        }
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

    function renderWheel() {
        return (
            <div id="circle-div" className="fade-in">
                <div id="bottom-circle">
                    <PieChart
                        data={datas}
                        style={{ height: '400px', minWidth: '200px' }}
                        label={({ dataEntry }) => dataEntry.member}
                        labelStyle={(index) => ({
                            fill: 'black',
                            fontSize: '5px',
                            fontFamily: 'sans-serif',
                        })}
                        radius={42}
                        labelPosition={112}
                        // startAngle={50}
                    />
                </div>
                <div id="top-circle">
                    <PieChart
                        className={rotate ? "spin" : null}
                        data={data}
                        style={{ height: '400px' }}
                        label={({ dataEntry }) => dataEntry.task}
                        labelStyle={(index) => ({
                            fill: 'black',
                            fontSize: '5px',
                            fontFamily: 'sans-serif',
                            pointerEvents: 'none',
                        })}
                        onClick={(e, segmentIndex) => handleSliceClick(datas[segmentIndex], segmentIndex)}
                        onMouseOver={(e, segmentIndex) => {
                            setHovered(segmentIndex);
                        }}
                        onMouseOut={() => {
                            setHovered(undefined);
                        }}
                        radius={42}
                        labelPosition={60}

                    />

                    {datas ? <CircleButton onClick={rotateTasks}>
                        <span>rotate<br></br>tasks</span>
                    </CircleButton> : <CircleButton>loading...</CircleButton>}
                    
                </div>

            </div>


        )
    }

    return (
        <>
            {renderWheel()}
        </>
    )
}

const CircleButton = styled(Button)`
    position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border-radius: 50%;
  height: 70px;
  
`
export default Circle