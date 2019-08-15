import React from 'react';
import UserContext from "../../utils/userContext";

function JumboTester() {
  return (
    <UserContext.Consumer>
    {( user ) => (
        <div>
            ID: {user.userID} <br />
        </div>
    )}
    </UserContext.Consumer>
  )
}

export default JumboTester;