import { useState } from "react";
import { Button } from "react-bootstrap";
import CrudModalAdd from '../CrudModalAdd';

const TaskCreate = props => {
    const [showModal, setShowModal] = useState(false);

    return (
        <section>
            <Button type="primary" onClick={() => setShowModal(true)}>
                Create
            </Button>
            <CrudModalAdd show={showModal} onClose={() => setShowModal(false)} />
        </section>
    );
}

export default TaskCreate;