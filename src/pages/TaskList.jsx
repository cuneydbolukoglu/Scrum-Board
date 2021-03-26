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
        <Row className="pt-5">
            <Col>
                {
                    data.map((item, index) =>
                        <div key={index}>
                            <b>{item.subject}</b>
                            <p>{item.description}</p>
                        </div>
                    )
                }
            </Col>
        </Row>
    )
}

export default TaskList;