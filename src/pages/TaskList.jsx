import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { database } from '../firebase';

const TaskList = props => {
    const [data, setData] = useState([]);

    const getData = () => {
        database.ref(`data/`).on('value', snapshot => {

            snapshot.forEach((childSnapshot) => {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();

                console.log(childData);
            });

            //setData(snapshot.val());
            //console.log(snapshot.val());
        });
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Row className="pt-5">
            <Col>
                <div>{data.map((item, index) =>
                    <div key={index}>
                        {item.subject}
                    </div>)}
                </div>
            </Col>
        </Row>
    )
}

export default TaskList;