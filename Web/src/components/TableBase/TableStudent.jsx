import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Table, Button, Icon, Popconfirm } from "antd";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";

class TableStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      conlumns: [
        {
          title: "Student ID",
          dataIndex: "id"
        },
        {
          title: "First Name",
          dataIndex: "fname"
        },
        {
          title: "Last Name",
          dataIndex: "lname"
        },
        {
          title: "Class",
          dataIndex: "SchoolClass.name"
        },
        {
          title: "Chức năng",
          render: (text, record) => (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Popconfirm
                placement="topRight"
                title={"Are you sure?"}
                onConfirm={() => this.handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button style={{ marginRight: "10px" }} type="danger">
                  <Icon type="delete" theme="filled" /> Remove
                </Button>
              </Popconfirm>

              <Link to={`/editstudent/${record.id}`}>
                <Button
                  // onClick={() => this.props.handleOpenEdit(record.id)}
                  // size={'large'}
                  type="primary"
                >
                  <Icon type="edit" theme="filled" /> Edit
                </Button>
              </Link>
            </div>
          )
        }
      ]
    };
  }

  handleDelete = async id => {
    await this.props.removeDataRequest(id);
  };
  render() {
    const { conlumns } = this.state;
    const { students } = this.props;
    return (
      <div>
        <Table
          bordered={true}
          rowKey={u => u.id}
          columns={conlumns}
          dataSource={students}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    removeDataRequest: id => {
      return dispatch(actions.removeDataRequest(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableStudent);
