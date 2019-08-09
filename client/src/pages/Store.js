import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";


class Saved extends Component {
    state = {
        id: "",
        name: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zip: "",
        description: "",
        products: [],
        storecomments: []
    };

    componentDidMount() 
    {
        console.log("window.location.href = " + window.location.href);
        // http://localhost:3000/store/5d474e210953e00dbc14734e
        var url = window.location.href;
        var urlArray = url.split("/");
        console.log("urlArray" + urlArray);
        this.loadStore(urlArray[urlArray.length - 1]);
    }

  loadStore = (storeId) => {
    API.getStore(storeId)
      .then(res => {
          console.log("getStore response:", res);
            this.setState({ 
                id: res.data._id,
                name: res.data.name,
                addressLine1: res.data.addressLine1,
                addressLine2: res.data.addressLine2,
                city: res.data.city,
                state: res.data.state,
                zip: res.data.zip,
                description: res.data.description,
                products: res.data.products,
                storecomments: res.data.storecomments
            });
        }
      )
      .catch(err => console.log(err));
  };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-2"></Col>
                    <Col size="md-8">
                        <Jumbotron>
                            <h1>Store Page</h1>
                        </Jumbotron>
                        <div><strong>{this.state.name}</strong></div>
                        <div>
                            {this.state.addressLine1} <br />
                            {this.state.addressLine2.length ? (
                                <span>
                                    {this.state.addressLine2} <br />
                                </span>
                                ) : (
                                    <span></span>
                                )}
                            {this.state.city}, {this.state.state} {this.state.zip}
                        </div>
                        <div>{this.state.description}</div>

                        <div>
                            <h4>Available Products</h4>
                            {this.state.products.length ? (
                                <div>
                                    {this.state.products.map(product => (
                                        <div key={product._id}> 
                                            <strong><a href={"/product/" + product._id}>{product.name}</a></strong> ({product.brand})
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>No Products</div>
                            )}
                        </div>

                        <div>
                            <h4>Community Discussion</h4>
                            {this.state.storecomments.length ? (
                                <div>
                                    {this.state.storecomments.map(comment => (
                                        <div key={comment._id}> 
                                            <strong>{comment.user} says...</strong><br /> 
                                            {comment.comment}<br />
                                            Posted: {comment.updated}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>No Comments</div>
                            )}
                        </div>
                    </Col>
                    <Col size="md-2"></Col>
                </Row>
            </Container>
        );
    }
}

export default Saved;
