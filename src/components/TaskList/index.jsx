import { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { database } from '../../firebase';
import CrudModalEdit from '../CrudModalEdit';
import Create from '../TaskCreate';

const TaskList = props => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [issueShow, setIssueShow] = useState(null);

    const getData = () => {
        database.ref(`data/`).on('value', snapshot => {
            const snapshotObject = snapshot.val();

            const snapshotData = Object.keys(snapshotObject).map(key => ({
                ...snapshotObject[key],
            }));

            setData(snapshotData)
        });
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Create />
            <Row className="issue mt-3" gutter={[16, 16]}>
                <Col className="col-bg" span={7}>
                    <h2>TODO {data.filter(item => item.status === "new").length}</h2>
                    {
                        data.filter(item => item.status === "new").map((item, index) =>
                            <Card key={index} border="danger" style={{ cursor: "pointer", marginBottom: "8px" }} onClick={() => setIssueShow(item) || setShowModal(true)}>
                                <Card.Header>{item.subject}</Card.Header>
                                <Card.Body>
                                    <Card.Title className="avatar">{item.assignedUser.charAt(0)}</Card.Title>
                                    <Card.Text>{item.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    }
                </Col>
                <Col className="col-bg" span={7}>
                    <h2>IN PROGRESS {data.filter(item => item.status === "in-progress").length}</h2>
                    {
                        data.filter(item => item.status === "in-progress").map((item, index) =>
                            <Card key={index} border="primary" style={{ cursor: "pointer", marginBottom: "8px" }} onClick={() => setIssueShow(item) || setShowModal(true)}>
                                <Card.Header>{item.subject}</Card.Header>
                                <Card.Body>
                                    <Card.Title className="avatar">{item.assignedUser.charAt(0)}</Card.Title>
                                    <Card.Text>{item.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    }
                </Col>
                <Col className="col-bg" span={7}>
                    <h2>DONE {data.filter(item => item.status === "done").length}</h2>
                    {
                        data.filter(item => item.status === "done").map((item, index) =>
                            <Card key={index} border="success" style={{ cursor: "pointer", marginBottom: "8px" }} onClick={() => setIssueShow(item) || setShowModal(true)}>
                                <Card.Header>{item.subject}</Card.Header>
                                <Card.Body>
                                    <Card.Title className="avatar">{item.assignedUser.charAt(0)}</Card.Title>
                                    <Card.Text>{item.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    }
                </Col>
            </Row>
            <CrudModalEdit show={showModal} onClose={() => setShowModal(false)} data={issueShow} />
        </>
    )
}

export default TaskList;