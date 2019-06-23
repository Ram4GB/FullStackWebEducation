import React, { Component } from "react";
import Main from "../layouts/Main";
import { Button, Divider } from "antd";
import { Modal, Icon } from "antd";
import AddClassForm from "../components/Formbase/AddClassForm";
import { Link } from "react-router-dom";
import TableClass from "../components/TableBase/TableClass";
import Axios from "axios";
import EditClassForm from "../components/Formbase/EditClassForm";
import ExportTableClassToExcel from "../components/ExportToExcelBase/ExportTableClassToExcel";

class ClassView extends Component {
  state = {
    isAddClassFormOpen: false,
    isEditClassFormOpen: false,
    currentEditId: ""
  };

  handleOpenEdit = id => {
    console.log(id);
    this.setState({
      ...this.state,
      currentEditId: id,
      isEditClassFormOpen: true
    });
  };

  toggleBoolean = stateKey => {
    this.setState({ [stateKey]: !this.state[stateKey] });
  };

  getData = async () => {
    const res = await Axios.get("/classes");
    this.setState({ ...this.state, dataSource: res.data });
  };
  async componentDidMount() {
    await this.getData();
  }
  render() {
    const { isAddClassFormOpen, isEditClassFormOpen } = this.state;
    return (
      <Main>
        <h1 style={{ fontSize: "2em", color: "gray" }}>Class Manager</h1>
        <Divider />
        <Button
          type="primary"
          onClick={() => this.toggleBoolean("isAddClassFormOpen")}
        >
          <Icon type="plus-circle" theme="filled" /> ADD NEW CLASS
        </Button>
        <Divider type="vertical" />
        {/* Add student */}
        <Modal
          title="ADD CLASS"
          visible={isAddClassFormOpen}
          onCancel={() => this.toggleBoolean("isAddClassFormOpen")}
          footer={null}
          style={{ top: 10 }}
        >
          <AddClassForm
            getData={this.getData}
            toggleModal={() => this.toggleBoolean("isAddClassFormOpen")}
          />
        </Modal>{" "}
        {/* Import from excel */}
        {/* Import from excel */}
        <Link to="/importfromexcel">
          <Button type="primary" ghost={true}>
            <Icon type="file-excel" /> Import Form Excel
          </Button>
        </Link>
        {/* Edit student */}
        <Modal
          title="EDIT CLASS"
          visible={isEditClassFormOpen}
          onCancel={() => this.toggleBoolean("isEditClassFormOpen")}
          footer={null}
          style={{ top: 10 }}
        >
          <EditClassForm id={this.state.currentEditId} />
        </Modal>
        {/* Table List */}
        <Divider />
        {this.state.dataSource && this.state.dataSource[0] && (
          <TableClass
            getData={this.getData}
            handleOpenEdit={this.handleOpenEdit}
            dataSource={this.state.dataSource}
          />
        )}
        {/* export from excel */}
        <ExportTableClassToExcel dataSource={this.state.dataSource} />
      </Main>
    );
  }
}

export default ClassView;
