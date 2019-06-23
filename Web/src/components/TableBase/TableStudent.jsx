import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Table, Button, Icon, Popconfirm } from "antd";

export default class TableStudent extends Component {
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
        },
        // {
        //   title: 'Toán',
        //   dataIndex: 'scores.math',
        // },
        // {
        //   title: 'Lý',
        //   dataIndex: 'scores.physical',
        // },
        // {
        //   title: 'Hóa',
        //   dataIndex: 'scores.chemistry',
        // },
        // {
        //   align: 'center',
        //   title: 'Điểm trung bình',
        //   render: (text, record) => {
        //     return (
        //       <p>
        //         {Math.floor(
        //           (record.scores.math +
        //             record.scores.physical +
        //             record.scores.chemistry) /
        //             3,
        //         )}
        //       </p>
        //     );
        //   },
        // },
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
