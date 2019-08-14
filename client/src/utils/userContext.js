import React from "react";

const UserContext = React.createContext({
    id: "CONTEXT TEST ID",
    firstName: "CONTEXT TEST FIRST NAME",
    lastName: "CONTEXT TEST LAST NAME",
    email: "CONTEXT TEST EMAIL",
    password: "CONTEXT TEST PASSWORD"
    // capitalizeFirstLetter: () => {},
    // handleBtnClick: () => {}
});

export default UserContext;