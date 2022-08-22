import React from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Swal from "sweetalert2";

class MainFormLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      maxCharTitle: 55,
    };

    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeHandler(e) {
    this.setState((prev) => {
      return {
        title: e.target.value,
        maxCharTitle: 55 - e.target.value.length,
      };
    });
    this.maxCharTitle > 1
      ? alert("Max Character Reached")
      : console.log("tross");
  }
  onBodyChangeHandler(e) {
    this.setState(() => {
      return {
        body: e.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    Swal.fire("Fuooyooooh!", "Data Saved!", "success");
    this.props.addNotes(this.state);
    this.setState((prev) => {
      return {
        maxCharTitle: 55,
      };
    });
  }

  render() {
    return (
      <React.Fragment>
        <Container fluid className="justify-content-md-start">
          <Row className="mb-3">
            <Col>
              <h3>Create Notes:</h3>
            </Col>
          </Row>
          <Form onSubmit={this.onSubmitEventHandler}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Row>
                    <Col>
                      <Form.Label>Title Note</Form.Label>
                    </Col>
                    <Col className="text-end">
                      <Form.Label>
                        Sisa Karakter :{" "}
                        {this.state.maxCharTitle >= 1
                          ? this.state.maxCharTitle
                          : "Max Character Length Reached!"}
                      </Form.Label>
                    </Col>
                  </Row>
                  <Form.Control
                    id="inputTitle"
                    required
                    type="text"
                    placeholder="Enter Title"
                    onChange={this.onTitleChangeHandler}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Body Note</Form.Label>
                  <Form.Control
                    id="inputBody"
                    required
                    onChange={this.onBodyChangeHandler}
                    as="textarea"
                    placeholder="Write your Note Here..."
                    rows={3}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="float-end">
              <Col md="auto">
                {this.state.maxCharTitle > 1 && (
                  <Button variant="success" type="submit">
                    Submit
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </Container>
      </React.Fragment>
    );
  }
}

export default MainFormLayout;
