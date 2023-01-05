import styled from "styled-components"
import { useRef } from 'react'

function DetailsModal({ showModal, setShowModal, currentDetails }) {

  function handleModalClick(e) {
    e.stopPropagation()
    setShowModal(false)
  }

    return (
        <>
            {showModal ? (
              
                    <ModalWrapper onClick={handleModalClick} showModal={showModal}>
                    
                            <H4>{currentDetails.details1}</H4>
                            {currentDetails.member === "nobody" || currentDetails.task === "Free space!" ? null : <Par>{currentDetails.details2}</Par>}
                            {currentDetails.task === "Free space!" ? <Par>There are more heroes than chores on your chore wheel.</Par> : null}
                            {currentDetails.member === "nobody" ? <Par >There are more chores than heroes on your chore wheel.</Par> : null}
                     
                    </ModalWrapper>
             
            ) : null}
        </>
    )
}
const H4 = styled.h4`
margin: 0;
margin-top: 5px;
`
const Par = styled.p`
margin-top: 0;
margin-left: 2px;
margin-right: 2px;
margin-bottom: 5px;
`

const ModalWrapper = styled.div`
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: rgb(250, 194, 255);
  position: absolute;
  z-index: 10;
  border-radius: 10px;
width: 300px;

  opacity: 95%;

margin-left: auto;
margin-right: auto;
left: 0;
right: 0;
text-align: center;
/* margin-top: -30px; */
top: 645px;
@media only screen and (max-width: 600px) {
    /* hight: 60px;
    width: 60px;
    font-size: smaller; */
top: 80%;

}
`;

export default DetailsModal