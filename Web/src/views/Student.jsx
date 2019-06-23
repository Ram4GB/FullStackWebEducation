import React, { Component } from "react";
import Main from "../layouts/Main";
import { Button, Divider } from "antd";
import { Modal, Icon } from "antd";
import AddStudentForm from "../components/Formbase/AddStudentForm";
import EditStudentForm from "../components/Formbase/EditStudentForm";
import { Link } from "react-router-dom";
import TableStudent from "../components/TableBase/TableStudent";
import * as actions from "../actions/actions";
import ExportTableStudentToExcel from "../components/ExportToExcelBase/ExportTableStudentToExcel";
import { connect } from "react-redux";

class Student extends Component {
  state = {
    isAddStudentFormOpen: false,
    isEditStudentFormOpen: false,
    currentEditId: ""
  };

  toggleBoolean = stateKey => {
    this.setState({ [stateKey]: !this.state[stateKey] });
  };

  async componentDidMount() {
    this.props.fetchDataRequest();
  }

  handleOpenEdit = id => {
    this.setState({
      ...this.state,
      currentEditId: id,
      isEditStudentFormOpen: true
    });
  };

  render() {
    const { isAddStudentFormOpen, isEditStudentFormOpen } = this.state;
    const { students } = this.props;
    console.log(students);
    return (
      <Main>
        <h1 style={{ fontSize: "2em", color: "gray" }}>Student Manager</h1>
        <Divider />
        <Button
          type="primary"
          onClick={() => this.toggleBoolean("isAddStudentFormOpen")}
        >
          <Icon type="plus-circle" theme="filled" /> ADD NEW STUDENT
        </Button>
        <Divider type="vertical" />
        {/* Add student */}
        <Modal
          title="ADD STUDENT"
          visible={isAddStudentFormOpen}
          onCancel={() => this.toggleBoolean("isAddStudentFormOpen")}
          footer={null}
          style={{ top: 10 }}
        >
          <AddStudentForm
            toggleModal={() => this.toggleBoolean("isAddStudentFormOpen")}
          />
        </Modal>
        {/* Import from excel */}
        <Link to="/importfromexcel">
          <Button type="primary" ghost={true}>
            <Icon type="file-excel" /> Import Form Excel
          </Button>
        </Link>
        {/* Edit student */}
        <Modal
          title="EDIT STUDENT"
          visible={isEditStudentFormOpen}
          onCancel={() => this.toggleBoolean("isEditStudentFormOpen")}
          footer={null}
          style={{ top: 10 }}
        >
          <EditStudentForm id="3117410207" />
        </Modal>
        {/* Table Student */}
        <Divider />
        {students && students[0] && (
          <TableStudent
            handleOpenEdit={this.handleOpenEdit}
            toggleEdit={() => this.toggleBoolean("isEditStudentFormOpen")}
            students={students}
          />
        )}
        {/* export from excel */}

        <ExportTableStudentToExcel students={students} />
      </Main>
    );
  }
}

const mapStateToProps = state => {
  return {
    students: state.StudentReducer.students
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchDataRequest: function() {
      return dispatch(actions.fetchDataRequest());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Student);
