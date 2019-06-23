import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Table, Button, Icon, Popconfirm } from "antd";

export default class TableStudentSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
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
        }
      ]
    };
  }

  handleDelete = async id => {
    await Axios({
      url: `/students/${id}`, // http://localhost:5050/students/:id,
      method: "DELETE"
    });
    this.props.getData();
  };
  render() {
    const { conlumns } = this.state;
    const { dataSource } = this.props;
    return (
      <div>
        <Table
          bordered={true}
          rowKey={u => u.id}
          columns={conlumns}
          dataSource={dataSource}
        />
      </div>
    );
  }
}
