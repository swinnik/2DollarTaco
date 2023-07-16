import React from "react";

export const LocationContext = React.createContext({
  location: { city: "North Hollywood" },
  setLocation: () => {},
});

export const LocationProvider = ({ children }) => {
  const [city, setCity] = React.useState("");
  const [initialRegion, setInitialRegion] = React.useState(null);
  const [markerLocation, setMarkerLocation] = React.useState(null);

  return (
    <LocationContext.Provider
      value={{
        city,
        setCity,
        initialRegion,
        setInitialRegion,
        markerLocation,
        setMarkerLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
