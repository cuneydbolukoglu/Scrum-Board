import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function MyVerticallyCenteredModal(props) {
  const [subject, setSubject] = useState(null);
  const [description, setDescription] = useState(null);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3>Create Task</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setSubject(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            onChange={(e) => setDescription(e.target.value)}
            rows={8} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.saveChanges}>Save Changes</Button>
        <Button variant="light" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;