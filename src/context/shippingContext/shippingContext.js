import React, { createContext, useState } from "react";

export const ShippingContext = createContext();

export const ShippingProvider = ({ children }) => {
  const [shippingDetails, setShippingDetails] = useState({});

  return (
    <ShippingContext.Provider
      value={{
        shippingDetails,
        setShippingDetails,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
};