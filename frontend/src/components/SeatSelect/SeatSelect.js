import Plane from "./Plane";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import FlightContext from "../../flightContext";

//put the dropdown in here
const SeatSelect = ({}) => {
  // const [flightNames, setFlightNames] = useState(null);
  // useEffect(() => {
  //   fetch(`/api/get-flights/`)
  //     .then((res) => res.json())
  //     .then((info) => {
  //       // console.log(info);
  //       console.log("INFO.DATA: ", info.data);
  //       setFlightNames(info.data);
  //       console.log("FLIGHT NAMES: ", flightNames);
  //     });
  // }, []);
  const {
    flightNames,
    plane,
    setPlane,
    handleChange,
    reservationInfo,
    setReservationInfo,
  } = useContext(FlightContext);
  //
  // const [plane, setPlane] = useState(null);

  // const handleChange = (value) => {
  //   setPlane(value);
  //   console.log("VALUE: ", value);

  // console.log("PLANE: ", plane);
  // };

  //
  return (
    <>
      <Dropdown>
        <label htmlFor="flights">Flight Number:</label>
        <select name="flights" onChange={(ev) => handleChange(ev.target.value)}>
          <option>Select a flight</option>
          {flightNames?.map((el) => {
            return (
              <option value={el} key={Math.round(Math.random() * 123456)}>
                {el}
              </option>
            );
          })}
        </select>
      </Dropdown>
      <h2>Select your seat and Provide your information!</h2>
      <ContentBox>
        <div>
          <Plane />
        </div>
        <FormBox>
          <form>
            <FormBoxInner>
              <label htmlFor="givenName">First Name</label>
              <input
                type="text"
                name="givenName"
                placeholder="Enter your first name!"
                //onchange
                //event.target.value
                //state variable object
                onChange={(ev) => {
                  let updatedValue = {};
                  updatedValue = { givenName: ev.target.value };
                  setReservationInfo((reservationInfo) => ({
                    ...reservationInfo,
                    ...updatedValue,
                  }));
                  console.log("INFO: ", reservationInfo);
                }}
                //
              />
              <label htmlFor="surname">Last Name</label>
              <input
                type="text"
                name="surname"
                placeholder="Enter your last name!"
                onChange={(ev) => {
                  let updatedValue = {};
                  updatedValue = { surname: ev.target.value };
                  setReservationInfo((reservationInfo) => ({
                    ...reservationInfo,
                    ...updatedValue,
                  }));
                  console.log("INFO: ", reservationInfo);
                }}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email!"
                onChange={(ev) => {
                  let updatedValue = {};
                  updatedValue = { email: ev.target.value };
                  setReservationInfo((reservationInfo) => ({
                    ...reservationInfo,
                    ...updatedValue,
                  }));
                  console.log("INFO: ", reservationInfo);
                }}
              />
              <Button>Submit</Button>
              {/* onClick={} */}
            </FormBoxInner>
          </form>
        </FormBox>
      </ContentBox>
    </>
  );
};

const Button = styled.button`
  background-color: red;
  margin-top: 20px;
  border: none;
`;

const Dropdown = styled.div`
  background-color: red;
  padding: 20px;
  display: flex;
  gap: 10px;
  /* align-items: baseline; */
`;

const ContentBox = styled.div`
  display: flex;
  margin-left: 20px;
  /* align-items: flex-start; */
`;

const FormBoxInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: red 2px solid;
  padding: 20px;
`;

const FormBox = styled.div`
  /* align-items: flex-start; */
  display: flex;
  /* border: red 2px solid; */
  /* flex-direction: column; */
  width: 30vw;
  margin-top: 25px;
  margin-bottom: 20px;
  height: 35vh;
  /* justify-content: center; */
  /* position: relative; */
  /* left: 350px; */
`;

export default SeatSelect;
