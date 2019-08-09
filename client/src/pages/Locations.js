import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";


class Saved extends Component {
  state = {
    locations: []
  };

  componentDidMount() {
    this.loadLocations();
  }

  loadLocations = () => {
    API.getLocations()
      .then(res => {
          console.log("getLocations response:", res);
            this.setState({ 
                locations: res.data, 
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
                        <h1>All Locations</h1>
                    </Jumbotron>
                    <div>
                    {this.state.locations.length ? (
                        <div>
                        {this.state.locations.map(location => (
                            <div key={location._id}> 
                                <strong>{location.city}, {location.state}</strong>
                                {location.stores.length ? (
                                    <ul>
                                    {location.stores.map(store => (
                                        <li key={store._id}>
                                            <strong><a href={"store/" + store._id}>{store.name}</a></strong><br />
                                            {store.addressLine1}<br />
                                            {store.city}, {store.state} {store.zip}
                                        </li>
                                    ))}
                                    </ul>
                                    ) : (
                                    <div>No Stores for location</div>
                                    )}
                            </div>
                        ))} 
                        </div>
                    ) : (
                    <h3>No Locations to Display</h3>
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
