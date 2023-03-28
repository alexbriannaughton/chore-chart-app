import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Circle from './components/Circle'
import styled from "styled-components"
import { PieChart } from "react-minimal-pie-chart"
import Button from './components/Button'
import Options from './components/Options'


function ChartPage({ user, setUser }) {

    const wheelBtnRef = useRef(null);
    const bbBtnRef = useRef(null);
    const setBtnRef = useRef(null);

    const [showModal, setShowModal] = useState(true)
    const [currentDetails, setCurrentDetails] = useState({ details2: "Click a segment for chore details" })

    const [memberTasks, setMemberTasks] = useState([])
    const [comments, setComments] = useState([])

    const [newComment, setNewComment] = useState("")

    const [errors, setErrors] = useState(undefined)

    const [activeButton, setActiveButton] = useState("Wheel")

    const params = useParams()

    const wheelColors = ["rgb(242, 98, 255)", "dimgray", "chartreuse", "rgb(250, 194, 255)"]

    // fake data for the noAuth spinning pie chart
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
    }, [params.chartId])

    useEffect(() => {
        fetch(`/comments/${params.chartId}`)
            .then((res) => {
                if (res.ok) {
                    res.json().then((coms) => setComments(coms))
                } else {
                    res.json().then((err) => setErrors(err))
                }
            })
    }, [params.chartId])

    useEffect(() => {
        if (activeButton === "Wheel") {
            wheelBtnRef.current.focus();
        } else if (activeButton === "Bulletin Board") {
            bbBtnRef.current.focus();
        } else if (activeButton === "Settings") {
            setBtnRef.current.focus();
        }
    }, [activeButton]);

    function noAuth() {
        return (
            <>
                <Header>404!!</Header>
                <Header2>ya might need to login.</Header2>
                <div className='circle-div'>
                    <div id='top-circle'>
                        <PieChart className="spin-unauth" style={{ height: '370px', pointerEvents: "none" }} data={datas}>
                        </PieChart>
                    </div>
                </div>
            </>
        )
    }

    // bulltinboard / comments area
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

                    setComments([comment, ...comments.slice(0, 4)])
                    setNewComment("")
                }
                )
            }
        })
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
                <BBHeader>Bulletin Board</BBHeader>
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



    function handleMenuClick(e) {
        setActiveButton(e.target.innerText)
    }

    function renderWhichPage() {
        if (activeButton === "Wheel") {

            return (
                <>
                    <Circle
                        memberTasks={memberTasks}
                        setMemberTasks={setMemberTasks}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        currentDetails={currentDetails}
                        setCurrentDetails={setCurrentDetails}
                    />
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
        else if (activeButton === "Settings") {

            return (
                <>
                    <Options setActiveButton={setActiveButton} setMemberTasks={setMemberTasks} memberTasks={memberTasks} user={user} setUser={setUser} />
                </>
            )
        }
    }

    return (
        <>
            <Header3>{memberTasks[0] && memberTasks[0].chore_wheel.name}</Header3>
            <Parent>
                <OutsideButtons
                    id="wheelBtn"
                    color="secondary"
                    onClick={(e) => handleMenuClick(e)}
                >
                    <span>Wheel</span>
                </OutsideButtons>
                <Button1
                    id="bbBtn"
                    ref={bbBtnRef}
                    onClick={(e) => handleMenuClick(e)}
                >
                    <span>Bulletin Board</span>
                </Button1>
                <OutsideButtons
                    id="setBtn"
                    onClick={(e) => handleMenuClick(e)}
                    color="secondary"
                    ref={setBtnRef}>
                    <span>Settings</span>
                </OutsideButtons>
            </Parent>
            {errors ? noAuth() : renderWhichPage()}
        </>
    )
}

const BBHeader = styled.h1`
text-align: center;
text-decoration: underline;
font-size: 2.5rem;
@media only screen and (max-width: 600px) {
  font-size: 2rem;
  }
`
const SubButton = styled(Button)`
margin: auto;
display: block;
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
margin-left: 30%;
margin-right: 30%;
border: 2px dotted chartreuse;
margin-bottom: 30px;

@media only screen and (max-width: 600px) {
    margin-left: 10%;
margin-right: 10%;
margin-bottom: 23px;
  }
`
const Button1 = styled(Button)`
    margin-top: 0;
    color: black;
    font-size: 1.3rem;

    &:focus {
  border-style: ridge;
  outline: none;
     span {
  top: 2px;
  left: 1px;
}
    }

    @media only screen and (max-width: 600px) {
    font-size: 1rem;
  }

 
`;
const OutsideButtons = styled(Button1)`
    margin-top: 30px;
    min-width: 112px;
    @media only screen and (max-width: 600px) {
  min-width: 93.81px;
  }
   
`
const Parent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    max-width: 700px;
    margin: auto;
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
width: 240px;
/* height: 140px; */
border-radius: 50%;
`



export default ChartPage