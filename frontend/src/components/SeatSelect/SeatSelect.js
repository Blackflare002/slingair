import Plane from "./Plane";
import styled from "styled-components";
// useEffect, useState
import { useContext } from "react";
import FlightContext from "../../flightContext";
import { useHistory } from "react-router-dom";

const SeatSelect = () => {
  const {
    flightNames,
    // plane,
    // setPlane,
    handleChange,
    reservationInfo,
    setReservationInfo,
  } = useContext(FlightContext);
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
        history.push("/confirmed");
      });
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
`;

const ContentBox = styled.div`
  display: flex;
  margin-left: 20px;
`;

const FormBoxInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: var(--color-alabama-crimson) 2px solid;
  padding: 20px;
`;

const FormBox = styled.div`
  display: flex;
  width: 30vw;
  margin-top: 25px;
  margin-bottom: 20px;
  height: 35vh;
`;

export default SeatSelect;
