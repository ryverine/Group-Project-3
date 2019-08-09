import React, { Component } from "react";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";

import { Input, FormBtn } from "../components/Form";

class User extends Component {
    state = {
        userID: "0",
        firstName: "",
        email: "",
        password: ""
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    componentDidMount() 
    {
        // console.log("window.location.href = " + window.location.href);
        // http://localhost:3000/store/5d474e210953e00dbc14734e
        //var url = window.location.href;
        //var urlArray = url.split("/");
        //console.log("urlArray" + urlArray);
        // this.loadStore(urlArray[urlArray.length - 1]);
        this.loadUser(this.state.email, this.state.password);
    }

    loadUser = (email, password) => {
        console.log("loadUser("+email+","+password+")");
        API.getUser(this.state.email + "+" + this.state.password)
          .then(res => {
              console.log("getUser response:", res);
              /*var data_firstName = res.data.firstName;
              var data_lastName = res.data.lastName;
              var data_email = res.data.email;
              var data_id = res.data._id;

                this.setState({ 
                    id: res.data._id,
                    name: res.data.name,
                    addressLine1: res.data.addressLine1,
                    addressLine2: res.data.addressLine2,
                    city: res.data.city,
                    state: res.data.state,
                    zip: res.data.zip,
                    description: res.data.description,
                    products: res.data.products
                });*/
            }
          )
          .catch(err => console.log(err));
    };

    doSignIn = event =>
    {
        event.preventDefault();
        console.log("Sign-In");
        // console.log("Email: " + this.state.email);
        // console.log("Password: " + this.state.password);
        this.loadUser(this.state.email, this.state.password);
    };

    doSignOut = event =>
    {
        event.preventDefault();
        console.log("Sign-Out");
        console.log("Email: " + this.state.email);
        console.log("Password: " + this.state.password);

        //var confirmSignOut = confirm("Are your sure you want to Sign-Out?");

        //if(confirmSignOut)
        //{
            this.setState({
                userID: 0,
                email: "",
                password: ""
            });
        //}
    };

    render() 
    {
        if(this.state.userID === "0")
        {
            return (
                <Container fluid>
                <Row>
                <Col size="md-2"></Col>
                    <Col size="md-8">
                    <Jumbotron>
                        User Profile
                    </Jumbotron>
                    <br />
                    <form>
                        <Input
                        type="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        name="email"
                        placeholder="Email (required)"
                        />
                        <br />
                        <Input
                        type="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        name="password"
                        placeholder="Password (required)"
                        />
                        <br />
                        <FormBtn
                        disabled={!(this.state.email)}
                        onClick={this.doSignIn}
                        >
                        Sign-In
                        </FormBtn>
                    </form>
                    </Col>
                    <Col size="md-2"></Col>
                </Row>
                </Container>
            );
        }
        else
        {
            return (
                <Container fluid>
                <Row>
                <Col size="md-2"></Col>
                    <Col size="md-8">
                    <Jumbotron>
                        <strong>User Profile</strong>
                    </Jumbotron>
                    <br />
                    <form>
                        <FormBtn
                        disabled={!(this.state.email)}
                        onClick={this.doSignOut}
                        >
                        Sign-Out
                        </FormBtn>
                    </form>
                    </Col>
                    <Col size="md-2"></Col>
                </Row>
                </Container>
            );
        }
    };
}

export default User;
