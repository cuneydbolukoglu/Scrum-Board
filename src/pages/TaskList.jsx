import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { database } from '../firebase';
import Datalist from './Datalist';

const TaskList = props => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = () => {
            database.ref(`data/`).on('value', function (snapshot) {
                console.log(snapshot.val())
                setData(snapshot.val())
            });
        }
        getData();
    }, []);

    return (
        <Container className="pt-5">
            <Row>
                <Col>
                    <p>{JSON.stringify(data)}</p>
                        {/* {JSON.parse(data).map(item => {item})} */}
                </Col>
            </Row>
        </Container>
    )
}

export default TaskList;