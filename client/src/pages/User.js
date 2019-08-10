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
        lastName: "",
        email: "",
        password: "",
        storecomments: []
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
            .then(res => 
            {
                console.log("getUser response:", res);
                this.setState({ 
                    userID: res.data._id,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    password: res.data.password,
                    storecomments: res.data.storecomments
                });
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
        //var confirmSignOut = confirm("Are your sure you want to Sign-Out?");
        //if(confirmSignOut)
        //{
            this.setState({
                userID: "0",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                storecomments: []
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
                        <h1>User Profile</h1>
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
                        <h1>User Profile</h1>
                    </Jumbotron>
                    <br />
                    <form>
                        <FormBtn
                        onClick={this.doSignOut}
                        >
                        Sign-Out
                        </FormBtn>
                    </form>
                    <div>
                        <h4>Welcome back, {this.state.firstName}!</h4>
                        <div>
                            Name: {this.state.firstName} {this.state.lastName}
                        </div>
                        <div>
                            Email: {this.state.email}
                        </div>
                        <div>
                            <h4>Comment History</h4>
                            <div>
                            {this.state.storecomments.length ? (
                                <div>
                                    {this.state.storecomments.map(comment => (
                                        <div key={comment._id}> 
                                            <strong><a href={"store/" + comment.store}>Store Name</a></strong><br /> 
                                            Posted: {comment.updated}<br /> 
                                            {comment.comment}<br />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>No Comments</div>
                            )}
                        </div>








                        </div>
                    </div>
                    </Col>
                    <Col size="md-2"></Col>
                </Row>
                </Container>
            );
        }
    };
}

export default User;
