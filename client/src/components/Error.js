import styled from "styled-components";

function Error({ children }) {
  return (
    <Wrapper>
      <Alert>🤔</Alert>
      <Message>{children}</Message>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: rgb(250, 194, 255);
  border-radius: 6px;
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
  border: ridge;
  border-color: chartreuse;
`;

const Alert = styled.span`
  /* background-color: white; */
  color: red;
  height: 30px;
  width: 30px;
  font-size: larger;
  border-radius: 50%;
  display: grid;
  place-content: center;
`;

const Message = styled.p`
  margin: 0;
  color: dimgray;
  font-size: 1rem;
  font-weight: 0;
  
`;

export default Error;