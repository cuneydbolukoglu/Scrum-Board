import { Col, Container, Row } from "react-bootstrap";

const TaskList = props => {
    return (
        <Container className="pt-5">
            <Row>
                <Col>
                    <h6>TODO</h6>
                    <p>{localStorage.getItem(JSON.stringify('data'))}</p>
                </Col>
            </Row>
        </Container>
    )
}

export default TaskList;