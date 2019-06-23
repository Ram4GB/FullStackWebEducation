import React, { Component } from "react";
import { Form, Input, Button, Row, Col, Select, message } from "antd";
import Axios from "axios";

class AddStudentForm extends Component {
  state = {
    lop: [],
    isDuplicateId: false
  };

  checkDuplicateId = async id => {
    let res = await Axios.get(`/students/${id}`);
    if (res.data === null) return false; //khong trung
    return true;
  };
  async componentDidMount() {
    const resLop = await Axios.get(`/classes`);
    this.setState({ lop: resLop.data });
  }
  handleAdd = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, value) => {
      if (err) {
        console.log(err);
        return;
      }
      const isDup = await this.checkDuplicateId(value.id);
      if (isDup) {
        message.error("This id has been used");
        return;
      }
      const newStudent = {
        id: value.id,
        fname: value.fname,
        lname: value.lname,
        SchoolClass: this.state.lop.find(item => item.id === value.lop),
        SchoolClassId: value.lop
        // scores: {
        //   math: value.math,
        //   physical: value.physical,
        //   chemistry: value.chemistry,
        // },
      };
      console.log(newStudent);
      await Axios.post(`/students`, newStudent)
        .then(res => {
          message.success("Success");
          this.props.getData();
          this.props.toggleModal();
          console.log(res);
        })
        .catch(err => message.error(err.message));
    });
  };
  render() {
    const { form } = this.props;
    return (
      <div className="form">
        <Row>
          <Col>
            <Form onSubmit={this.handleAdd} layout="vertical">
              {/* id */}
              <Form.Item label="Student Id">
                {form.getFieldDecorator("id", {
                  rules: [
                    {
                      required: true,
                      message: "Please input this field!"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              {/* fname */}
              <Form.Item label="First Name">
                {form.getFieldDecorator("fname", {
                  rules: [
                    { required: true, message: "Please input this field!" }
                  ]
                })(<Input />)}
              </Form.Item>
              {/* lname */}
              <Form.Item label="Last Name">
                {form.getFieldDecorator("lname", {
                  rules: [
                    { required: true, message: "Please input this field!" }
                  ]
                })(<Input />)}
              </Form.Item>
              {/* class */}
              <Form.Item label="Class">
                {form.getFieldDecorator("lop", {
                  rules: [
                    { required: true, message: "Please input this field!" }
                  ]
                })(
                  <Select>
                    {this.state.lop.map(item => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>

              <Button htmlType="submit" type="primary">
                ADD
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

AddStudentForm.propTypes = {};

export default Form.create({ name: "add-student-form" })(AddStudentForm);
//<div>Scores</div>;
// <Row type="flex" justify="space-around">
//   {/* math */}
//   <Col span={7}>
//     <Form.Item label="Math">
//       {form.getFieldDecorator('math', {
//         rules: [
//           { required: true, message: 'Please input this field!' },
//         ],
//       })(<Input type="number" />)}
//     </Form.Item>
//   </Col>
//   {/* physical */}
//   <Col span={7}>
//     <Form.Item label="Physical">
//       {form.getFieldDecorator('physical', {
//         rules: [
//           { required: true, message: 'Please input this field!' },
//         ],
//       })(<Input type="number" />)}
//     </Form.Item>
//   </Col>
//   {/* chemistry */}
//   <Col span={7}>
//     <Form.Item label="Chemistry">
//       {form.getFieldDecorator('chemistry', {
//         rules: [
//           { required: true, message: 'Please input this field!' },
//         ],
//       })(<Input type="number" />)}
//     </Form.Item>
//   </Col>
// </Row>
