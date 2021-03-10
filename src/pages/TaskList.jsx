import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { database } from '../firebase';

const TaskList = props => {
    const [data, setData] = useState([]);

    const getData = () => {
        database.ref(`data/`).on('value', snapshot => {
            // setData([snapshot.val()]);

            snapshot.forEach(snap => {
                //console.log(snap.val())
                setData([snap.val()])
            })
        });
    }

    useEffect(() => {
        getData();
    }, []);

    return (
            <Row className="pt-5">
                <Col>
                    {
                        data.map((item, index) => {
                            
                            return (
                                <>
                                    <h2 key={index}>{item.subject}</h2>
                                    <p>{item.description}</p>
                                </>
                            )
                        })
                    }
                </Col>
            </Row>
    )
}

export default TaskList;