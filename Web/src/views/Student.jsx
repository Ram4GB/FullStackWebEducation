import React, { Component } from "react";
import Main from "../layouts/Main";
import { Button, Divider } from "antd";
import { Modal, Icon } from "antd";
import AddStudentForm from "../components/Formbase/AddStudentForm";
import EditStudentForm from "../components/Formbase/EditStudentForm";
import { Link } from "react-router-dom";
import TableStudent from "../components/TableBase/TableStudent";
import Axios from "axios";
import ExportTableStudentToExcel from "../components/ExportToExcelBase/ExportTableStudentToExcel";

class Student extends Component {
  state = {
    isAddStudentFormOpen: false,
    isEditStudentFormOpen: false,
    dataSource: [],
    currentEditId: ""
  };

  toggleBoolean = stateKey => {
    this.setState({ [stateKey]: !this.state[stateKey] });
  };

  getData = async () => {
    const res = await Axios.get("/students");
    this.setState({ ...this.state, dataSource: res.data });
  };

  async componentDidMount() {
    await this.getData();
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
            getData={this.getData}
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
        {this.state.dataSource && this.state.dataSource[0] && (
          <TableStudent
            getData={this.getData}
            handleOpenEdit={this.handleOpenEdit}
            toggleEdit={() => this.toggleBoolean("isEditStudentFormOpen")}
            dataSource={this.state.dataSource}
          />
        )}
        {/* export from excel */}

        <ExportTableStudentToExcel dataSource={this.state.dataSource} />
      </Main>
    );
  }
}

export default Student;
