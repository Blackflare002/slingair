import Plane from "./Plane";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import FlightContext from "../../flightContext";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const handleClick = (ev) => {
    //create a new reservation
    //put info in local storage
    //redirect to a confirmation page
    ev.preventDefault();
    fetch("/api/add-reservation", {
      method: "POST",
      body: JSON.stringify(reservationInfo),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        sessionStorage.setItem("reservation", JSON.stringify(json.data));
      });
    // .then((res) => console.log(res))
    // .then((res) =>
    //   sessionStorage.setItem("reservation", JSON.stringify(res))
    // );
    // sessionStorage.setItem("reservation", JSON.stringify(reservationInfo));
    // history.push("/confirmed");
  };
  //
  return (
    <>
      <Dropdown>
        <label htmlFor="flights">Flight Number:</label>
        <select
          name="flights"
          onChange={(ev) => {
            handleChange(ev.target.value);
            let updatedValue = {};
            updatedValue = { flight: ev.target.value };
            setReservationInfo((reservationInfo) => ({
              ...reservationInfo,
              ...updatedValue,
            }));
            console.log("INFO: ", reservationInfo);
          }}
        >
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
              <Button onClick={(ev) => handleClick(ev)}>Submit</Button>
            </FormBoxInner>
          </form>
        </FormBox>
      </ContentBox>
    </>
  );
};

const Button = styled.button`
  background-color: var(--color-alabama-crimson);
  margin-top: 20px;
  border: none;
`;

const Dropdown = styled.div`
  background-color: darkred;
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
  border: var(--color-alabama-crimson) 2px solid;
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
