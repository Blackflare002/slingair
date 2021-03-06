// import { useEffect } from "react";
import styled from "styled-components";
import tombstone from "../assets/tombstone.png";

const Confirmation = () => {
  const reservation = JSON.parse(sessionStorage.getItem("reservation"));
  return (
    <Wrapper>
      <InnerBox>
        <TextBox>
          <InnerTextBox>
            <FlightHeader>Flight Confirmed</FlightHeader>
            {reservation._id && <p>Reservation ID: {reservation._id}</p>}
            <p>Flight: {reservation.flight}</p>
            <p>Seat: {reservation.seatId}</p>
            <p>Name: {`${reservation.givenName} ${reservation.surname}`}</p>
            <p>Email: {reservation.email}</p>
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
