import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Circle from './components/Circle'
import styled from "styled-components"
import { PieChart } from "react-minimal-pie-chart"
import Button from './components/Button'
import Options from './components/Options'


function ChartPage() {

    const [memberTasks, setMemberTasks] = useState([])

    const [errors, setErrors] = useState(undefined)

    const [activeButton, setActiveButton] = useState("Wheel")

    const params = useParams()

    const wheelColors = ["rgb(242, 98, 255)", "dimgray", "chartreuse", "rgb(250, 194, 255)"]

    const datas = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((mt, index) => {
        return {
            value: 1,
            color: wheelColors[index % wheelColors.length]
        }
    })

    useEffect(() => {
        fetch(`/chore_wheels/${params.chartId}`)
            .then((res) => {
                if (res.ok) {
                    res.json().then((memberTasks) => setMemberTasks(memberTasks))
                } else {
                    res.json().then((err) => setErrors(err))
                }
            })

    }, [])

    function handleMenuClick(e) {
        setActiveButton(e.target.innerText)
    }

    function noAuth() {
        return (
            <>
                <Header>Woops!</Header>


                <Header2>404 Unauthorized!!</Header2>

                <PieChart className="spin-unauth" style={{ height: '500px', pointerEvents: "none" }} data={datas}></PieChart>
            </>
        )
    }
console.log(memberTasks)
    function wheelPage() {
        return (
            <>
                <Circle memberTasks={memberTasks} setMemberTasks={setMemberTasks}
                />
            </>
        )
    }

    function bulletinBoard() {
        return (
            <>
                <h1>bulletinBoard</h1>
            </>
        )
    }



    function renderWhichPage() {
        if (activeButton === "Wheel") {
            return (
                <>
                    {wheelPage()}
                </>
            )
        }
        else if (activeButton === "Bulletin Board") {
            return (
                <>
                    {bulletinBoard()}
                </>
            )
        }
        else if (activeButton === "Options") {
            return (
                <>
                    <Options setActiveButton={setActiveButton}setMemberTasks={setMemberTasks} memberTasks={memberTasks}/>
                </>
            )
        }
    }



    return (
        <>
            <Header3>{memberTasks[0] && memberTasks[0].chore_wheel.name}</Header3>
            <Parent onClick={(e) => handleMenuClick(e)}>
                <OutsideButtons
                    color="secondary"
                    // style={activeButton === "Wheel" ? { borderStyle: "ridge" } : {}}
                >
                    <span>Wheel</span>
                </OutsideButtons>
                <Button1><span>Bulletin Board</span></Button1>
                <OutsideButtons color="secondary"><span>Options</span></OutsideButtons>
            </Parent>
            {errors ? noAuth() : renderWhichPage()}
        </>
    )
}
const Button1 = styled(Button)`
    margin-top: 0;
    color: black;

    &:focus {
  border-style: ridge;
     span {
  top: 2px;
  left: 1px;
}
    }

 
`;
const OutsideButtons = styled(Button1)`
    margin-top: 30px;
`
const Parent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    max-width: 700px;
    margin: auto;
`
const Child1 = styled.div`
    width: 75%;
    text-align: left;
`
const Child2 = styled.div`
    width: 26%;
    text-align: right;
`
const Header3 = styled.h1`
    margin: 0;
    padding: 0;
    text-align: center;
    font-weight: 500;
`
const Header = styled.h1`
text-align: center;
position: absolute;
margin-left: auto;
margin-right: auto;
left: 0;
right: 0;
z-index: 10;
top: 200px;
background-color: white;
width: 180px;
border-radius: 50%;
`
const Header2 = styled.h2`
text-align: center;
position: absolute;
margin-left: auto;
margin-right: auto;
left: 0;
right: 0;
top: 359px;
z-index: 10;
background-color: white;
width: 200px;
height: 80px;
border-radius: 50%;
`



export default ChartPage