import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Circle from './components/Circle'
import styled from "styled-components"
import { PieChart } from "react-minimal-pie-chart"


function ChartPage() {

    const [memberTasks, setMemberTasks] = useState([])

    const [errors, setErrors] = useState(undefined)

    const params = useParams()

    const wheelColors = ["rgb(242, 98, 255)", "dimgray", "chartreuse", "rgb(250, 194, 255)"]

    const datas = [1,1,1,1,1,1,1,1,1,1].map((mt, index) => {
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

    function noAuth() {
        return (
            <>
                <Header>Woops!</Header>


                <Header2>404 Unauthorized!!</Header2>

                <PieChart className="spin-unauth" style={{ height: '500px', pointerEvents: "none" }} data={datas}></PieChart>
            </>
        )
    }

    return (
        <div>
            {/* {renderMemberTasks()} */}
            {errors ? noAuth() : <Circle memberTasks={memberTasks} setMemberTasks={setMemberTasks}
            />}

        </div>
    )
}

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