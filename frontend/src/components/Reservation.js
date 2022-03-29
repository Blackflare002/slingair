import styled from "styled-components";

const reservation = JSON.parse(sessionStorage.getItem("reservation"));

const Reservation = () => {
  return (
    <Wrapper>
      <InnerBox>
        <TextBox>
          <InnerTextBox>
            <FlightHeader>Your Reservation</FlightHeader>
            <p>Reservation ID: {reservation._id}</p>
            <p>Flight: {reservation.flight}</p>
            <p>Seat: {reservation.seatId}</p>
            <p>Name: {`${reservation.givenName} ${reservation.surname}`}</p>
            <p>Email: {reservation.email}</p>
          </InnerTextBox>
        </TextBox>
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
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
`;

export default Reservation;
