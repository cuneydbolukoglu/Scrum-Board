import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { database } from '../firebase';

const TaskList = props => {
    const [data, setData] = useState([]);

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
            <h3>My Board</h3>
            <Row className="issue pt-5">
                <Col className="col-bg pt-3">
                    <h6>TODO {data.filter(item => item.status === "new").length}</h6>
                    {
                        data.filter(item => item.status === "new").map((item, index) =>
                            <div key={index} className="issue-box todo">
                                <b>{item.subject}</b>
                                <p>{item.description}</p>
                            </div>
                        )
                    }
                </Col>
                <Col className="col-bg pt-3">
                    <h6>IN PROGRESS {data.filter(item => item.status === "in-progress").length}</h6>
                    {
                        data.filter(item => item.status === "in-progress").map((item, index) =>
                            <div key={index} className="issue-box in-progress">
                                <b>{item.subject}</b>
                                <p>{item.description}</p>
                            </div>
                        )
                    }
                </Col>
                <Col className="col-bg pt-3">
                    <h6>DONE {data.filter(item => item.status === "done").length}</h6>
                    {
                        data.filter(item => item.status === "done").map((item, index) =>
                            <div key={index} className="issue-box done">
                                <b>{item.subject}</b>
                                <p>{item.description}</p>
                            </div>
                        )
                    }
                </Col>
            </Row>
        </>
    )
}

export default TaskList;