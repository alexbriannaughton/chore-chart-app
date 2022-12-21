import styled from "styled-components"

function DetailsModal({ showModal, setShowModal, currentDetails }) {
    return (
        <>
            {showModal ? (
                <Background>
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
    width: 50%;
  height: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 50%);
  pointer-events: none;
  animation: fadeIn 1s;

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
  left: 50%;
  top: 50%;
  transform: translate(-50%, 210%);
  opacity: 90%;
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
    padding-left: 2%;
    padding-right: 2%;
  }
`;


export default DetailsModal