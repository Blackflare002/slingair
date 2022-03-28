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
  const { flightNames, plane, setPlane } = useContext(FlightContext);
  //
  // const [plane, setPlane] = useState(null);
  const handleClick = (value) => {
    setPlane(value);
    console.log("VALUE: ", value);
    // console.log("PLANE: ", plane);
  };
  return (
    <>
      <Dropdown>
        <label htmlFor="flights">Flight Number:</label>
        <select name="flights" onChange={(ev) => handleClick(ev.target.value)}>
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
              />
              <label htmlFor="surname">Last Name</label>
              <input
                type="text"
                name="surname"
                placeholder="Enter your last name!"
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email!"
              />
            </FormBoxInner>
          </form>
        </FormBox>
      </ContentBox>
    </>
  );
};

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
