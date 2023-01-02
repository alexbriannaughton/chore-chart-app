import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Circle from './components/Circle'
import styled from "styled-components"
import { PieChart } from "react-minimal-pie-chart"
import Button from './components/Button'
import Options from './components/Options'
import DetailsModal from "./components/DetailsModal"


function ChartPage({ user }) {

    const [showModal, setShowModal] = useState(null)
    const [currentDetails, setCurrentDetails] = useState(null)

    const [memberTasks, setMemberTasks] = useState([])
    const [comments, setComments] = useState([])

    const [newComment, setNewComment] = useState("")

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

    useEffect(() => {
        fetch(`/comments/${params.chartId}`)
            .then((res) => {
                if (res.ok) {
                    res.json().then((coms) => setComments(coms))
                } else {
                    res.json().then((err) => setErrors(err))
                }
            })
    }, [])

    function newCommentSubmit(e) {

        e.preventDefault()

        const newCommentObj = {
            text: newComment,
            user_id: user.id,
            chore_wheel_id: params.chartId
        }
        fetch(`/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCommentObj)


        }).then((r) => {
            if (r.ok) {
                r.json().then((comment) => {
                    
                    setComments([comment, ...comments.slice(0, 5)])
                    setNewComment("")
                }
                )
             }
        })
    }
    function handleMenuClick(e) {
        setActiveButton(e.target.innerText)
    }

    function noAuth() {
        return (
            <>
                <Header>Woops!</Header>


                <Header2>404 Unauthorized!!</Header2>
                <div className='circle-div'><div id='top-circle'>
                    <PieChart className="spin-unauth" style={{ height: '370px', pointerEvents: "none" }} data={datas}></PieChart></div></div>
            </>
        )
    }

    function wheelPage() {
        return (
            <>
                <Circle memberTasks={memberTasks} setMemberTasks={setMemberTasks} showModal={showModal} setShowModal={setShowModal} currentDetails={currentDetails} setCurrentDetails={setCurrentDetails}
                />
                <DetailsModal currentDetails={currentDetails} showModal={showModal} setShowModal={setShowModal} />
            </>
        )
    }

    function bulletinBoard() {
        function renderComments() {
            return (
                comments.map((comment) => {
                    return (
                        <p>
                            {comment.created_at.slice(5, 10)}-{comment.created_at.slice(0, 4)} @ {comment.created_at.slice(12, 16)}
                            <br />
                            {comment.user.username}: {comment.text}
                        </p>
                    )
                })
            )
        }

        return (
            <>
                <h1 align="center">Bulletin Board</h1>
                <Wrapper>
                    {renderComments()}
                </Wrapper>
                <form onSubmit={newCommentSubmit}>
                    <FormField>
                        <TextArea
                            type="text"
                            placeholder='post something here...'
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <SubButton type="submit">
                            Post
                        </SubButton>
                    </FormField>
                </form>

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
                    <Options setActiveButton={setActiveButton} setMemberTasks={setMemberTasks} memberTasks={memberTasks} />
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
                // style={{ borderStyle: "ridge" }}
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
const SubButton = styled(Button)`
margin: auto;
display: block;
/* width: 149px; */
`
const TextArea = styled.textarea`
  border-radius: 5px;
  border: 1px solid transparent;
  border-color: dimgray;
  -webkit-appearance: none;
  max-width: 80%;
  width: 500px;
  font-size: 1rem;
  line-height: 1.5;
  padding: 4px;
  margin: auto;
  display: block;
  font-family: BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
  font-weight: 400;
  margin-top: 5px;
`
const FormField = styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }
  `;
const Wrapper = styled.div`
margin-left: 20%;
margin-right: 20%;
border: 2px dotted chartreuse;

@media only screen and (max-width: 600px) {
    margin-left: 10%;
margin-right: 10%;
  }
`
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