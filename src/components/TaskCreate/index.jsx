import { useState } from "react";
import { Button } from "react-bootstrap";
import CrudModalAdd from '../CrudModalAdd';
import { useTranslation } from "react-i18next";

const TaskCreate = props => {
    const [showModal, setShowModal] = useState(false);
    const { i18n } = useTranslation();

    return (
        <section>
            <Button type="primary" onClick={() => setShowModal(true)}>
                {i18n.t('create')}
            </Button>
            <CrudModalAdd show={showModal} onClose={() => setShowModal(false)} />
        </section>
    );
}

export default TaskCreate;