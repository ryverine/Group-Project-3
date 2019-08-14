import React from 'react';
import UserContext from "../../utils/userContext"

function JumboTester() {
  return (
    <UserContext.Consumer>
    {( user ) => (
        <div>
            ID: {user.id} <br />
            First Name: {user.firstName} <br />
            Last Name: {user.lastName} <br />
            Email: {user.email} <br />
            Password: {user.password}
        </div>
    )}
    </UserContext.Consumer>
  )
}

export default JumboTester;