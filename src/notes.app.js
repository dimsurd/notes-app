import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import MainFormLayout from "./form_layouts/main.form_layouts";
import ActiveNotesList from "./collections/active.noteList";
import ArsipNotesList from "./collections/arsip.notesList";
import { getData } from "./utils/datas.notes";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getData(),
      searchData: "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onAddNotesHandler = this.onAddNotesHandler.bind(this);
    this.onArchieveNotesHandler = this.onArchieveNotesHandler.bind(this);
    this.onActivatedNotesHandler = this.onActivatedNotesHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  onArchieveNotesHandler(id) {
    const notes = this.state.notes.map((note) =>
      note.id === id ? { ...note, archived: !note.archived } : note
    );
    this.setState({ notes });
  }
  onActivatedNotesHandler(id) {
    const notes = this.state.notes.map((note) =>
      note.id === id ? { ...note, archived: false } : note
    );
    this.setState({ notes });
  }

  onAddNotesHandler({ title, body }) {
    const a = new Date();
    this.setState((prev) => {
      return {
        notes: [
          ...prev.notes,
          {
            id: +new Date(),
            title,
            body,
            archived: false,
            createdAt: a.toISOString(),
          },
        ],
      };
    });
  }

  onSearchHandler(e) {
    this.setState(() => {
      return {
        searchData: e.target.value,
      };
    });
  }

  render() {
    const searchFilterNote = !this.state.searchData
      ? this.state.notes
      : this.state.notes.filter((note) =>
          note.title.toLowerCase().match(this.state.searchData)
        );
    return (
      <Container fluid className="mt-3">
        <Row>
          <Col>
            <h1>Notes App</h1>
          </Col>
          <Col md="3">
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search note by title. ex: Babel"
                  onChange={this.onSearchHandler}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="6">
            <MainFormLayout addNotes={this.onAddNotesHandler} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ActiveNotesList
              notesList={searchFilterNote}
              onDelete={this.onDeleteHandler}
              onArchieveNotes={this.onArchieveNotesHandler}
            />
          </Col>
          <Col>
            <ArsipNotesList
              notesList={searchFilterNote}
              onDelete={this.onDeleteHandler}
              onActivatedNotesHandler={this.onActivatedNotesHandler}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NotesApp;
