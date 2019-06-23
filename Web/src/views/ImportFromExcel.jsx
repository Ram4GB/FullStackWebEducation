import React, { Component } from "react";
import Axios from "axios";
import { Button, Row, Col, Divider, message } from "antd";
import code from "../code/code";
import TableStudentIncorrect from "../components/TableBase/TableStudentIncorrect";
import ExportTableStudentToExcel from "../components/ExportToExcelBase/ExportTableStudentToExcel";
import TableStudentSuccess from "../components/TableBase/TableStudentSuccess";
import Main from "../layouts/Main";
import TableStudentIsErrorExisted from "../components/TableBase/TableStudentIsErrorExisted";

const addNewStudent = async student => {
  await Axios.post(`/students`, student)
    .then(res => {
      message.success("Success");
      console.log(res);
    })
    .catch(err => message.error(err.message));
};

export default class ImportFromExcel extends Component {
  state = {
    dataSource: [],
    dataSourceIncorrect: [],
    dataSourceIsExisted: [],
    file: null
  };

  handleClick = async e => {
    let form = new FormData();
    form.append("excel", this.state.file);
    let option = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    let res = await Axios.post("/excel/students", form, option);

    // convert obj xlsx to student obj
    let dataSource = code.convertToMyObject(
      code.checkUniqueArr(res.data).correctArr
    );

    let dataSourceIncorrect = code.convertToMyObject(
      code.checkUniqueArr(res.data).incorrectArr
    );

    // Check exist
    const students = await Axios.get("/students");
    let dataSourceIsExisted = dataSource.filter(item =>
      students.data.find(s => s.id === item.id)
    );

    dataSource = dataSource.filter(
      item => !students.data.find(s => s.id === item.id)
    );

    await this.addAllCorrect(dataSource);

    this.setState({
      dataSource,
      dataSourceIsExisted,
      dataSourceIncorrect
    });
  };

  addAllCorrect = async data => {
    // import valid student to db
    console.log(data);
    let promises = [];
    for (let i = 0; i < data.length; i++) {
      const student = data[i];
      promises.push(addNewStudent(student));
    }
    await Promise.all(promises);
  };

  handleChange = e => {
    this.setState({
      file: e.target.files[0]
    });
  };

  render() {
    const { dataSource, dataSourceIncorrect, dataSourceIsExisted } = this.state;
    return (
      <Main>
        <h1 style={{ fontSize: "2em", color: "gray" }}>
          Import Student From Excel File
        </h1>
        <Divider />
        <Row>
          <Col sm={24}>
            <form id="form">
              <input name="file" onChange={this.handleChange} type="file" />
              <Button type="ghost" onClick={this.handleClick}>
                Import Excel
              </Button>
            </form>
          </Col>
        </Row>
        <Divider />
        <Row>
          <h1 style={{ fontSize: "2em", color: "gray" }}>Import Success</h1>
          <ExportTableStudentToExcel dataSource={dataSource} />

          <Divider />
          <TableStudentSuccess dataSource={dataSource} />
        </Row>
        <Divider />
        <Row>
          <h1 style={{ fontSize: "2em", color: "gray" }}>
            Import Errors - Missing Some Fields
          </h1>
          <Divider />
          <TableStudentIncorrect dataSource={dataSourceIncorrect} />
        </Row>
        <Divider />
        <Row>
          <h1 style={{ fontSize: "2em", color: "gray" }}>
            Import Errors - Existed From Database
          </h1>
          <Divider />
          <TableStudentIsErrorExisted dataSource={dataSourceIsExisted} />
        </Row>
      </Main>
    );
  }
  // async componentDidMount() {
  //   let data = await Axios({
  //     url: "http://localhost:5050/students",
  //     method: "GET"
  //   });
  //   this.setState({
  //     dataSource: data.data
  //   });
  // }
}
