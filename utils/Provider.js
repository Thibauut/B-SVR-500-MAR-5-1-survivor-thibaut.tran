import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [data, setData] = useState({
    me: {},
    employee: [{}],
    employeeTmp: [{}],
    imageData: [{}],
  });

  const updateProfileData = (myProfileData) => {
    setData((prevData) => ({
      ...prevData,
      me: myProfileData,
    }));
  };

  const updateEmployeeData = (newEmployeeData) => {
    setData((prevData) => ({
      ...prevData,
      employee: newEmployeeData,
    }));
  };

  const updateEmployeeTmpData = (newEmployeeTmpData) => {
    setData((prevData) => ({
      ...prevData,
      employeeTmp: newEmployeeTmpData,
    }));
  };


  const updateImageData = (newImageData) => {
    setData((prevData) => ({
      ...prevData,
      imageData: newImageData,
    }));
  };

  return (
    <MyContext.Provider value={{ data, updateEmployeeData, updateImageData, updateEmployeeTmpData, updateProfileData}}>
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };
