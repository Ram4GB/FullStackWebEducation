import React, { Component } from "react";
import { Form, Input, Button, Row, Col, Select, message } from "antd";
import Axios from "axios";
const Option = Select.Option;

class EditStudentForm extends Component {
  state = {
    student: {},
    lop: []
  };
  handleEdit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (err) {
        console.log(err);
        return;
      }
      const studentEdited = {
        id: value.id,
        fname: value.fname,
        lname: value.lname,
        SchoolClassId: value.lop,
        SchoolClass: this.state.lop.find(item => item.id === value.lop)
        // scores: {
        //   math: value.math,
        //   physical: value.physical,
        //   chemistry: value.chemistry,
        // },
      };
      Axios.put(`/students/${studentEdited.id}`, studentEdited)
        .then(res => {
          console.log(res);
          message.success("Success");
        })
        .catch(err => message.error(err.message));
    });
  };

  async componentDidMount() {
    const res = await Axios.get(`/students/${this.props.id}`);
    const resLop = await Axios.get(`/classes`);
    const student = res.data;
    this.props.form.setFieldsValue({
      id: student.id,
      fname: student.fname,
      lname: student.lname,
      lop: student.SchoolClass.id
      // math: student.scores.math,
      // physical: student.scores.physical,
      // chemistry: student.scores.chemistry,
    });
    this.setState({ student: student, lop: resLop.data });
  }
  render() {
    const { form } = this.props;
    return (
      <div className="form">
        {true ? (
          <Row type="flex" justify="center">
            <Col span={8}>
              <Form onSubmit={this.handleEdit} layout="vertical">
                {/* id */}
                <Form.Item label="Student Id">
                  {form.getFieldDecorator("id", {
                    rules: [
                      { required: true, message: "Please input this field!" }
                    ]
                  })(<Input disabled />)}
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
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>

                <Button htmlType="submit" type="primary">
                  Edit
                </Button>
              </Form>
            </Col>
          </Row>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

EditStudentForm.propTypes = {};

export default Form.create({ name: "edit-student-form" })(EditStudentForm);

// <div>Scores</div>
//                 <Row type="flex" justify="space-around">
//                   {/* math */}
//                   <Col span={7}>
//                     <Form.Item label="Math">
//                       {form.getFieldDecorator('math', {
//                         rules: [
//                           {
//                             required: true,
//                             message: 'Please input this field!',
//                           },
//                         ],
//                       })(<Input type="number" />)}
//                     </Form.Item>
//                   </Col>
//                   {/* physical */}
//                   <Col span={7}>
//                     <Form.Item label="Physical">
//                       {form.getFieldDecorator('physical', {
//                         rules: [
//                           {
//                             required: true,
//                             message: 'Please input this field!',
//                           },
//                         ],
//                       })(<Input type="number" />)}
//                     </Form.Item>
//                   </Col>
//                   {/* chemistry */}
//                   <Col span={7}>
//                     <Form.Item label="Chemistry">
//                       {form.getFieldDecorator('chemistry', {
//                         rules: [
//                           {
//                             required: true,
//                             message: 'Please input this field!',
//                           },
//                         ],
//                       })(<Input type="number" />)}
//                     </Form.Item>
//                   </Col>
//                 </Row>
