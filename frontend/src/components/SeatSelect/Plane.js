import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import FlightContext from "../../flightContext";

const Plane = ({}) => {
  const [seating, setSeating] = useState([]);
  const { plane, reservationInfo, setReservationInfo } =
    useContext(FlightContext);
  // const { planeID } = useParams();
  //state variable
  // const [plane, setPlane] = useState(null);
  //
  //
  useEffect(() => {
    // TODO: get seating data for selected flight
    plane &&
      fetch(`/api/get-flight/${plane}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log("LOG DATA: ", data);
          // console.log("DATA 2: ", data.data);
          // console.log("DATA SEATS: ", data.data.seats);
          setSeating(data.data.seats);
        });
  }, [plane]);
  //
  // const [seatId, setSeatId] = useState(null);
  //
  return (
    <BiggerWrapper>
      <Wrapper>
        {seating && seating.length > 0 ? (
          seating.map((seat) => {
            // console.log(seat.id);
            return (
              <SeatWrapper key={`seat-${seat.id}`}>
                <label>
                  {seat.isAvailable ? (
                    <>
                      <Seat
                        type="radio"
                        name="seat"
                        onChange={() => {
                          // setSeatId(seat.id);
                          let updatedValue = {};
                          updatedValue = { seatId: seat.id };
                          setReservationInfo((reservationInfo) => ({
                            ...reservationInfo,
                            ...updatedValue,
                          }));
                          console.log("INFO: ", reservationInfo);
                        }}
                      />
                      <Available>{seat.id}</Available>
                    </>
                  ) : (
                    <Unavailable>{seat.id}</Unavailable>
                  )}
                </label>
              </SeatWrapper>
            );
          })
        ) : (
          <Placeholder>Select a Flight to view seating.</Placeholder>
        )}
      </Wrapper>
    </BiggerWrapper>
  );
};

const BiggerWrapper = styled.div`
  height: 50vh;
`;

const Placeholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 404px;
  width: 260px;
  text-align: center;
  color: var(--color-orange);
  font-family: var(--font-heading);
  font-size: 32px;
  opacity: 0.5;
`;

const Wrapper = styled.ol`
  display: grid;
  grid-template-rows: repeat(10, 30px);
  grid-template-columns: 30px 30px 60px 30px 30px 30px;
  gap: 12px 10px;
  background: #fff;
  border-right: 15px solid var(--color-alabama-crimson);
  border-left: 15px solid var(--color-alabama-crimson);
  margin: 24px 24px 0 0;
  padding: 30px 5px;
  /* height: 500px; */
  width: 300px;
  position: relative;
`;
const SeatWrapper = styled.li`
  display: flex;
  font-size: 12px;
  font-weight: 500;
  position: relative;
  height: 30px;
  width: 30px;
`;
const Seat = styled.input`
  opacity: 0;
  position: absolute;
  height: 30px;
  width: 30px;
  margin: 0;

  &:checked {
    + span {
      background: var(--color-alabama-crimson);
      color: #fff;
      font-weight: 700;
    }
  }
`;
const SeatNumber = styled.span`
  border-radius: 2px;
  color: var(--color-cadmium-red);
  font-family: var(--font-body);
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  width: 30px;
  transition: all ease 300ms;
`;
const Available = styled(SeatNumber)`
  background: #fff;
  border: 1px solid var(--color-alabama-crimson);
  cursor: pointer;

  &.checked,
  &:hover {
    background: var(--color-alabama-crimson);
    color: #fff;
    font-weight: 700;
  }
`;
const Unavailable = styled(SeatNumber)`
  background: var(--color-selective-yellow);
  cursor: not-allowed;
  opacity: 0.4;
`;

export default Plane;
