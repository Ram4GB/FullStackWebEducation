import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Table, Button, Icon, message } from "antd";

export default class TableStudentIsErrorExisted extends Component {
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
              <Button
                onClick={() => this.handleOveride(record.id)}
                style={{ marginRight: "10px" }}
                type="danger"
              >
                Overide
              </Button>
            </div>
          )
        }
      ]
    };
  }

  handleOveride = id => {
    Axios.put(`/students/${id}`, this.props.dataSource.find(i => i.id === id))
      .then(() => {
        message.success("Success");
      })
      .catch(err => message.error(err.message));
    // this.props.getData();
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
