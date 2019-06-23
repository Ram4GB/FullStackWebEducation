import React, { Component } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import Axios from "axios";

class AddClassForm extends Component {
  state = {
    lop: []
  };

  async componentDidMount() {
    const resLop = await Axios.get(`/classes`);
    this.setState({ lop: resLop.data });
  }
  handleAdd = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (err) {
        console.log(err);
        return;
      }
      const newClass = {
        name: value.name
      };
      console.log(newClass);
      Axios.post(`/classes`, newClass).then(res => {
        console.log(res);
        message.success("Success");
        this.props.getData();
        this.props.toggleModal();
      });
    });
  };
  render() {
    const { form } = this.props;
    return (
      <div className="form">
        <Row>
          <Col>
            <Form onSubmit={this.handleAdd} layout="vertical">
              {/* name */}
              <Form.Item label="Class Name">
                {form.getFieldDecorator("name", {
                  rules: [
                    { required: true, message: "Please input this field!" }
                  ]
                })(<Input />)}
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

AddClassForm.propTypes = {};

export default Form.create({ name: "add-class-form" })(AddClassForm);
