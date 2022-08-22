import React from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import moment from "moment";

const ArsipNotesList = ({
  notesList,
  onDelete,
  onActivatedNotesHandler,
  onConfirmDeleteData,
}) => {
  return (
    <React.Fragment>
      <h3 className="mb-3">Archived Note List</h3>
      {notesList.filter((datas) => datas.archived).length > 0 ? (
        notesList
          .filter((datas) => datas.archived)
          .map((notes, i) => {
            return (
              <React.Fragment key={i}>
                <Row className="mb-4">
                  <Col>
                    <Card style={{ width: "100%" }}>
                      <Card.Body>
                        <Card.Title>{notes.title}</Card.Title>
                        <p>
                          {moment(notes.createdAt).format(
                            "dddd, MMMM Do YY - h:mm:ss a"
                          )}
                        </p>
                        <Card.Text>{notes.body}</Card.Text>
                        <Button
                          className="me-3"
                          variant="primary"
                          onClick={() => onActivatedNotesHandler(notes.id)}
                        >
                          Activate
                        </Button>
                        <Button
                          variant="outline-danger"
                          onClick={() => onConfirmDeleteData(notes.id)}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </React.Fragment>
            );
          })
      ) : (
        <h5 className="disabled">No Data</h5>
      )}
    </React.Fragment>
  );
};

export default ArsipNotesList;
