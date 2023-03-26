import { PieChart } from "react-minimal-pie-chart"
import { useParams } from 'react-router-dom'
import { useState } from "react"
import Button from "./Button"
import styled from "styled-components"
import DetailsModal from "./DetailsModal"
import Checkboxes from "./Checkboxes"



function Circle({ memberTasks, setMemberTasks, showModal, setShowModal, currentDetails, setCurrentDetails }) {

    const [rotate, setRotate] = useState(false)

    const [hovered, setHovered] = useState(undefined);

    const [confirmRotate, showConfirmRotate] = useState(false)

    const params = useParams()

    const wheelColors = ["rgb(242, 98, 255)", "dimgray", "chartreuse", "rgb(250, 194, 255)", "chartreuse", "dimgray", "rgb(250, 194, 255)", "chartreuse"]


    // data to render each segment on the wheel
    const datas = memberTasks.map((mt, index) => {
        function nameColor() {
            if (mt.member.name === "nobody") {
                return 'red'
            } else return 'black'
            
        }
        function taskNameColor() {
            if (mt.task.name === "Free space!") {
                return 'white'
            } else return 'black'
        }
        function freeSpaceFontWeight() {
            if (mt.task.name === "Free space!") {
                return 'bold'
            } else return 'normal'
        }
        function longTaskName() {
            if (mt.task.name.length > 15) {
                return `${mt.task.name.substring(0, 15)}...`
            }
            else return mt.task.name
        }
        return {
            member: mt.member.name,
            task: longTaskName(),
            value: 1,
            color: wheelColors[index % wheelColors.length],
            details1: `${mt.member.name} is on "${mt.task.name}"`,
            details2: `${mt.task.details}`,
            nameColor: nameColor(),
            taskColor: taskNameColor(),
            weight: freeSpaceFontWeight()
        }
    })

    // segment turns white when hover over segment
    const whiteOnHover = datas.map((entry, i) => {
        if (hovered === i) {
            return {
                ...entry,
                color: 'white',
            };
        }
        return entry;
    });


    // show modal when segment is clicked
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


    // rotate button fetch, animation turns off when fetch finishes
    async function rotateFetch() {
        await fetch(`/rotate/${params.chartId}`)
        await fetch(`/chore_wheels/${params.chartId}`)
            .then((res) => res.json())
            .then((data) => {
                setMemberTasks(data)
                setRotate(false)
            })
    }

    // rotate button animation
    async function rotateTasks() {
        showConfirmRotate(false)
        setRotate(true)
        setTimeout(rotateFetch, 2000)
    }

    // confirmation modal for rotate button
    function renderConfirmModal() {
        return (
            <>
                <ConfirmModal>
                    <ColumnDiv>
                        <p align="center">Are you sure you want to rotate?</p>
                        <p style={{ marginTop: "-15px"}} align="center"><small>Everyone will get an email with their new chore.</small></p>
                    </ColumnDiv>
                    <RowDiv>
                        <BackButton color="secondary" onClick={rotateTasks}><span>Rotate!</span></BackButton>
                        <BackButton onClick={(e) => showConfirmRotate(false)}><span>nvm</span></BackButton>
                    </RowDiv>
                </ConfirmModal>
            </>
        )
    }


    // conditional rendering for circle and labels based on screen size starts here:
    const size = window.matchMedia("(max-width: 600px)")

    function insideLabel() {
        if (datas.length === 2) {
            return 41.5
        }
        if (datas.length === 3) {
            return 30
        }
        else if (datas.length === 5) {
            return 18.1
        }
        else if (datas.length === 7) {
            return 12.5
        }
        else if (datas.length === 9) {
            return 10
        }
        else return 0
    }

    function circleSize(s) {
        if (size.matches && datas.length === 2) {
            return 380
        }
        if (size.matches && datas.length === 3) {
            return 290
        }
        else if (size.matches && datas.length === 5) {
            return 300
        }
        else if (size.matches && datas.length === 6) {
            return 330
        }
        else if (size.matches && datas.length > 6) {
            return 340
        }
        else if (size.matches) {
            return 400
        }
        else return 450
    }

    function choreFontSize(s) {
        if (size.matches && datas.length===4) {
            return 3.5
        }
        else if (datas.length >= 5) {
            return 3.2
        }
        else return 5
    }

    function nameFontSize(s) {
        if (datas.length === 3) {
            return 5
        }
        if (size.matches&&datas.length>6) {
            return 3
        }
        else return 4
    }

    function outsideLabel() {
        if (datas.length === 2) {
            return 50
        }
        if (datas.length === 5) {
            return 61
        }
        if (datas.length > 6) {
            return 67
        } else return 60
    }
 
    function renderWheel() {
        return (
            <div id="circle-div" className="fade-in">
                <div id="bottom-circle">
                    <PieChart
                        data={datas}
                        style={{ height: `${circleSize(size)}` }}
                        label={({ dataEntry }) => dataEntry.member}
                        labelStyle={(index) => ({
                            fill: datas[index].nameColor,
                            fontSize: `${nameFontSize(size)}px`,
                            fontFamily: 'sans-serif',
                        })}
                        radius={42}
                        labelPosition={107}
                        startAngle={insideLabel()}
                    />
                </div>
                <div id="top-circle">
                    <PieChart
                        className={rotate ? "spin" : null}
                        data={whiteOnHover}
                        style={{ height: `${circleSize(size)}` }}
                        label={({ dataEntry }) => dataEntry.task}
                        labelStyle={(index) => ({
                            fill: datas[index].taskColor,
                            fontSize: `${choreFontSize(size)}`,
                            fontFamily: 'sans-serif',
                            pointerEvents: 'none',
                            fontWeight: datas[index].weight
                        })}
                        onClick={(e, segmentIndex) => handleSliceClick(datas[segmentIndex], segmentIndex)}
                        onMouseOver={(e, segmentIndex) => {
                            setHovered(segmentIndex);
                        }}
                        onMouseOut={() => {
                            setHovered(undefined);
                        }}
                        radius={42}
                        labelPosition={outsideLabel()}
                        startAngle={insideLabel()}
                    />

                    {datas ? <CircleButton onClick={(e) => showConfirmRotate(true)}>
                        <span><i>rotate</i></span>
                    </CircleButton> : <CircleButton>loading...</CircleButton>}
                    {confirmRotate ? renderConfirmModal() : null}
                </div>

            </div>


        )
    }

    return (
        <>
            {renderWheel()}
            <DetailsModal currentDetails={currentDetails} showModal={showModal} setShowModal={setShowModal} />
            <Checkboxes memberTasks={memberTasks}></Checkboxes>
        </>
    )
}
const BackButton = styled(Button)`
border-radius: 50%;
font-size: small;
min-width: 76px;
`
const ColumnDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const RowDiv = styled.div`
display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  
`
const ConfirmModal = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 200px;
  height: 185px;
  background-color: rgb(250, 194, 255);
  z-index: 3;

  border-radius: 10px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  border: 3px solid dimgray;  
`
const CircleButton = styled(Button)`
    position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border-radius: 50%;
  height: 73px;
  z-index: 2;
  border-style: outset;
 
  &:active {
    border-style: inset;
  }
  @media only screen and (max-width: 600px) {
    /* height: 60px;
    width: 60px;
    font-size: smaller; */
 border-width: 5px;
 font-size: .8rem;
 height: 58px;
}
`
export default Circle