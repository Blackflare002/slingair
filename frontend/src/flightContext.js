const { createContext, useState, useEffect } = require("react");

const FlightContext = createContext(null);

export const FlightContextProvider = ({ children }) => {
  const [plane, setPlane] = useState(null);
  const [flightNames, setFlightNames] = useState(null);
  useEffect(() => {
    fetch(`/api/get-flights/`)
      .then((res) => res.json())
      .then((info) => {
        // console.log(info);
        // console.log("INFO.DATA: ", info.data);
        // console.log("FLIGHT NAMES: ", flightNames);
        setFlightNames(info.data);
      });
  }, []);
  return (
    <FlightContext.Provider
      value={{ flightNames, setFlightNames, plane, setPlane }}
    >
      {children}
    </FlightContext.Provider>
  );
};

export default FlightContext;
