import styled from "styled-components"
import { useRef } from 'react'

function DetailsModal({ showModal, setShowModal, currentDetails }) {
  const modalRef = useRef()

  function handleModalClick(e) {
    e.stopPropagation()
    setShowModal(false)
  }

    return (
        <>
            {showModal ? (
                <Background ref={modalRef} onClick={handleModalClick}>
                    <ModalWrapper showModal={showModal}>
                        <ModalContent>
                            <p>{currentDetails.details}</p>
                        </ModalContent>
                    </ModalWrapper>
                </Background>
            ) : null}
        </>
    )
}

const Background = styled.div`

  /* height: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 50%);
  animation: fadeIn 1s; */

  @keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
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
top: 80%;
`;
const ModalContent = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
    padding-left: 2%;
    padding-right: 2%;
  } */
`;


export default DetailsModal