import React, { Component } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import Axios from "axios";

class EditClassForm extends Component {
  state = {
    lop: {}
  };
  handleEdit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(value.name, "value name");
      Axios.put(`/classes/${this.state.lop.id}`, { name: value.name })
        .then(res => {
          console.log(res);
          message.success("Success");
        })
        .catch(err => message.error(err.message));
    });
  };

  async componentDidMount() {
    const resLop = await Axios.get(`/classes/${this.props.id}`);
    console.log(resLop);
    this.props.form.setFieldsValue({
      id: resLop.data.id,
      name: resLop.data.name
    });
    this.setState({ lop: resLop.data });
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
                <Form.Item label="ID">
                  {form.getFieldDecorator("id", {
                    rules: [
                      { required: true, message: "Please input this field!" }
                    ]
                  })(<Input disabled />)}
                </Form.Item>
                {/* name */}
                <Form.Item label="Class Name">
                  {form.getFieldDecorator("name", {
                    rules: [
                      { required: true, message: "Please input this field!" }
                    ]
                  })(<Input />)}
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

EditClassForm.propTypes = {};

export default Form.create({ name: "edit-class-form" })(EditClassForm);
