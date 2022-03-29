import styled from "styled-components";
import tombstone from "../assets/tombstone.png";

const reservation = JSON.parse(sessionStorage.getItem("reservation"));

const Confirmation = () => {
  return (
    <Wrapper>
      <InnerBox>
        <TextBox>
          <InnerTextBox>
            <FlightHeader>Flight Confirmed</FlightHeader>
            <p>Reservation ID: {reservation._id}</p>
            <p>Flight: {null}</p>
            <p>Seat: {null}</p>
            <p>Name: {null}</p>
            <p>Email: {null}</p>
          </InnerTextBox>
        </TextBox>
        <div>
          <TombstoneImage src={tombstone} />
        </div>
      </InnerBox>
    </Wrapper>
  );
};

const InnerTextBox = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const FlightHeader = styled.h4`
  color: var(--color-alabama-crimson);
  border-bottom: 2px solid var(--color-alabama-crimson);
  /* border-bottom: 2px solid red; */
  font-weight: bold;
  font-size: large;
  font-family: sans-serif;
`;

const TextBox = styled.div`
  border: solid 2px var(--color-alabama-crimson);
  padding: 20px;
  margin: 10px;
  width: 400px;
  /* gap: 20px; */
`;

const InnerBox = styled.div`
  display: flex;
  /* justify-content: center; */
  /* justify-self: center; */
  align-items: center;
  flex-direction: column;
  /* border: 2px solid white; */
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  /* border: 2px solid black; */
`;

const TombstoneImage = styled.img`
  height: 250px;
`;

export default Confirmation;
