import React, { Component } from 'react';
import AddStudentForm from '../components/Formbase/AddStudentForm';
import EditStudentForm from '../components/Formbase/EditStudentForm';
import { Button } from 'antd/lib/radio';
import { Modal } from 'antd';
import ImportFromExel from '../components/Formbase/ImportFromExel';
import AddClassForm from '../components/Formbase/AddClassForm';
import EditClassForm from '../components/Formbase/EditClassForm';

class Home extends Component {
  state = {
    isAddStudentFormOpen: false,
    isEditStudentFormOpen: false,
    isImportFileOpen: false,
    isAddClassFormOpen: false,
    isEditClassFormOpen: false,
  };

  toggleBoolean = stateKey => {
    this.setState({ [stateKey]: !this.state[stateKey] });
  };

  render() {
    const {
      isAddStudentFormOpen,
      isEditStudentFormOpen,
      isImportFileOpen,
      isAddClassFormOpen,
      isEditClassFormOpen,
    } = this.state;
    return (
      <div>
        <Button onClick={() => this.toggleBoolean('isAddStudentFormOpen')}>
          Add Student
        </Button>
        <Button onClick={() => this.toggleBoolean('isAddClassFormOpen')}>
          Add Class
        </Button>
        <Button onClick={() => this.toggleBoolean('isEditStudentFormOpen')}>
          Edit Student
        </Button>
        <Button onClick={() => this.toggleBoolean('isEditClassFormOpen')}>
          Edit Class
        </Button>
        <Button onClick={() => this.toggleBoolean('isImportFileOpen')}>
          Import File
        </Button>
        {/* Add student */}
        <Modal
          title="ADD STUDENT"
          visible={isAddStudentFormOpen}
          onCancel={() => this.toggleBoolean('isAddStudentFormOpen')}
          footer={null}
          style={{ top: 10 }}
        >
          <AddStudentForm />
        </Modal>
        {/* Add class */}
        <Modal
          title="ADD CLASS"
          visible={isAddClassFormOpen}
          onCancel={() => this.toggleBoolean('isAddClassFormOpen')}
          footer={null}
          style={{ top: 10 }}
        >
          <AddClassForm />
        </Modal>
        {/* Edit student */}
        <Modal
          title="EDIT STUDENT"
          visible={isEditStudentFormOpen}
          onCancel={() => this.toggleBoolean('isEditStudentFormOpen')}
          footer={null}
          style={{ top: 10 }}
        >
          <EditStudentForm id="3117410207" />
        </Modal>
        {/* Edit class */}
        <Modal
          title="EDIT CLASS"
          visible={isEditClassFormOpen}
          onCancel={() => this.toggleBoolean('isEditClassFormOpen')}
          footer={null}
          style={{ top: 10 }}
        >
          <EditClassForm id="1" />
        </Modal>
        {/* Import from excel file */}
        {isImportFileOpen && <ImportFromExel />}
      </div>
    );
  }
}

export default Home;
