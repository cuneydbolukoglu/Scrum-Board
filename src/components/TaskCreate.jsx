import { useState } from "react";
import { Button } from "antd";
import { database, auth } from '../firebase';
import CrudModal from '../components/CrudModal';


const TaskCreate = props => {
    const [crudModalOnOpen, setCrudModalOnOpen] = useState(false);

    return (
        <>
            <Button type="primary" onClick={() => setCrudModalOnOpen(true)}>
                Create
            </Button>
            <CrudModal
                onShow={crudModalOnOpen}
                method={'create'}
            />
        </>
    );
}

export default TaskCreate;