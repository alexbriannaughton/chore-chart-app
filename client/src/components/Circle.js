import { PieChart } from "react-minimal-pie-chart"
import { useParams } from 'react-router-dom'
import { useState } from "react"
import Button from "./Button"
import styled from "styled-components"



function Circle({ memberTasks, setMemberTasks, showModal, setShowModal, currentDetails, setCurrentDetails }) {

    const [rotate, setRotate] = useState(false)

    const [hovered, setHovered] = useState(undefined);

    const params = useParams()

    const wheelColors = ["rgb(242, 98, 255)", "dimgray", "chartreuse", "rgb(250, 194, 255)", "chartreuse", "dimgray", "rgb(250, 194, 255)", "chartreuse"]

    const datas = memberTasks.map((mt, index) => {
        return {
            member: mt.member.name,
            task: mt.task.name,
            value: 1,
            color: wheelColors[index % wheelColors.length],
            details1: `${mt.member.name} is on "${mt.task.name}"`,
            details2: `${mt.task.details}`
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

    function labelSpot() {
        if (datas.length === 3 ) {
            return 30
        } 
        else if (datas.length === 5) {
            return 17
        }
        else if (datas.length === 7) {
            return 12.5
        }
        else if (datas.length===9) {
            return 10
        }
        else return 0
    }

    const size = window.matchMedia("(max-width: 600px)")

    function circleMediaQuery(s) {
        if (size.matches&&datas.length===2) {
            return 380
        }
        if (size.matches&&datas.length===3) {   
            return 278
        } 
        else if (size.matches&&datas.length===5) {
            return 300
        }
        else if (size.matches&&datas.length===6) {
            return 330
        }
        else if (size.matches&&datas.length>6) {
            return 340
        }
    
        else {
            return 400
        } 

    }

    function choreFontSize(s) {
        if (size.matches&&datas.length>6) {
            return 3.5
        } 
        else if (datas.length === 7) {
            return 4
        }
        else return 5
    }
    function nameFontSize(s) {
        if(datas.length === 3) {
            return 5
        } else return 4
    }

    function positionTheLabel() {
        if (datas.length>6) {
            return 70
        } else return 60
    }

    function renderWheel() {
        return (
            <div id="circle-div" className="fade-in">
                <div id="bottom-circle">
                    <PieChart
                        data={datas}
                        style={{ height: `${circleMediaQuery(size)}`}}
                        label={({ dataEntry }) => dataEntry.member}
                        labelStyle={(index) => ({
                            fill: 'black',
                            fontSize: `${nameFontSize(size)}px`,
                            fontFamily: 'sans-serif',
                        })}
                        radius={42}
                        labelPosition={107}
                        startAngle={labelSpot()}
                    />
                </div>
                <div id="top-circle">
                    <PieChart
                        className={rotate ? "spin" : null}
                        data={data}
                        style={{ height: `${circleMediaQuery(size)}`}}
                        label={({ dataEntry }) => dataEntry.task}
                        labelStyle={(index) => ({
                            fill: 'black',
                            fontSize: `${choreFontSize(size)}`,
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
                        labelPosition={positionTheLabel()}
                        startAngle={labelSpot()}
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