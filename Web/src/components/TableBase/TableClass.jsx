import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Table, Button, message, Icon, Popconfirm } from "antd";

export default class TableClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      conlumns: [
        {
          title: "ID",
          dataIndex: "id"
        },
        {
          title: "Name",
          dataIndex: "name"
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
              {/* Edit */}
              <Link to={`/editclass/${record.id}`}>
                <Button type="primary">
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
    console.log(id);
    await Axios({
      url: `/classes/${id}`,
      method: "DELETE"
    })
      .then(() => {
        message.success("Success");
        this.props.getData();
      })
      .catch(err => message.error(err.message));
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
