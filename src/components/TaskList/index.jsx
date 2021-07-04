import { useState, useEffect } from "react";
import { Row, Col, Avatar } from "antd";
import { database } from '../../firebase';
import CrudModal from '../CrudModal';
import TaskCreate from '../TaskCreate';

const TaskList = props => {
    const [data, setData] = useState([]);
    const [crudModalOnOpen, setCrudModalOnOpen] = useState(false);
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
            <TaskCreate />
            <Row className="issue" gutter={[16, 16]}>
                <Col className="col-bg" span={7}>
                    <h6>TODO {data.filter(item => item.status === "new").length}</h6>
                    {
                        data.filter(item => item.status === "new").map((item, index) =>
                            <div key={index} className="issue-box todo" onClick={() => setIssueShow(item) || setCrudModalOnOpen(true)}>
                                <b>{item.subject}</b>
                                <p>{item.description}</p>
                                <Avatar>{item.assignedUser && item.assignedUser.charAt(0)}</Avatar>
                            </div>
                        )
                    }
                </Col>
                <Col className="col-bg" span={7}>
                    <h6>IN PROGRESS {data.filter(item => item.status === "in-progress").length}</h6>
                    {
                        data.filter(item => item.status === "in-progress").map((item, index) =>
                            <div key={index} className="issue-box in-progress" onClick={() => setIssueShow(item) || setCrudModalOnOpen(true)}>
                                <b>{item.subject}</b>
                                <p>{item.description}</p>
                                <Avatar>{item.assignedUser && item.assignedUser.charAt(0)}</Avatar>
                            </div>
                        )
                    }
                </Col>
                <Col className="col-bg" span={7}>
                    <h6>DONE {data.filter(item => item.status === "done").length}</h6>
                    {
                        data.filter(item => item.status === "done").map((item, index) =>
                            <div key={index} className="issue-box done" onClick={() => setIssueShow(item) || setCrudModalOnOpen(true)}>
                                <b>{item.subject}</b>
                                <p>{item.description}</p>
                                <Avatar>{item.assignedUser && item.assignedUser.charAt(0)}</Avatar>
                            </div>
                        )
                    }
                </Col>
            </Row>
            <CrudModal
                onShow={crudModalOnOpen}
                data={issueShow}
            />
        </>
    )
}

export default TaskList;