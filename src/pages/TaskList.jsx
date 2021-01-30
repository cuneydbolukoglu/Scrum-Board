import { Col, Container, Row } from "react-bootstrap";

const TaskList = props => {
    return (
        <Container>
            <Row>
                <Col>
                    <h6>TODO</h6>
                </Col>
                <Col>
                    <h6>IN PROGRESS</h6>
                </Col>
                <Col>
                    <h6>DONE</h6>                
                </Col>
            </Row>
        </Container>
    )
}

export default TaskList;