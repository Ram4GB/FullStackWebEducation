// import React, { Component } from 'react';
// import { Button, Table, Icon } from 'antd';
// // import Axios from 'axios';
// const inserted = [
//   {
//     id: '3117410207',
//     fname: 'Trần Lê Huy',
//     lname: 'Quyền',
//     SchoolClass: {
//       id: 1,
//       name: 'DCT1171',
//     },
//     scores: {
//       math: 10,
//       physical: 8,
//       chemistry: 4,
//     },
//   },
//   {
//     id: '3117410207',
//     fname: 'Trần Lê Huy',
//     lname: 'Quyền',
//     SchoolClass: {
//       id: 1,
//       name: 'DCT1171',
//     },
//     scores: {
//       math: 10,
//       physical: 8,
//       chemistry: 4,
//     },
//   },
// ];

// const errors = [
//   {
//     message: 'Already exist',
//     id: '3117410207',
//     fname: 'Trần Lê Huy',
//     lname: 'Quyền',
//     SchoolClass: {
//       id: 1,
//       name: 'DCT1171',
//     },
//     scores: {
//       math: 10,
//       physical: 8,
//       chemistry: 4,
//     },
//   },
// ];
// const columnsOfTableErrors = [
//   {
//     title: 'Student ID',
//     dataIndex: 'id',
//     key: 'id',
//   },
//   {
//     title: 'First Name',
//     dataIndex: 'fname',
//     key: 'fname',
//   },
//   {
//     title: 'Last Name',
//     dataIndex: 'lname',
//     key: 'lname',
//   },
//   {
//     title: 'Class',
//     dataIndex: re => re.SchoolClass.name,
//     key: 'SchoolClass',
//   },
//   {
//     title: 'Math',
//     dataIndex: 'math',
//     key: 'math',
//   },
//   {
//     title: 'Physical',
//     dataIndex: 'physical',
//     key: 'physical',
//   },
//   {
//     title: 'Chemistry',
//     dataIndex: 'chemistry',
//     key: 'chemistry',
//   },
//   {
//     title: 'Error',
//     dataIndex: 'message',
//     key: 'message',
//   },
//   {
//     title: 'Action',
//     dataIndex: 'action',
//     key: 'action',
//   },
// ];
// const columnsOfTableInserted = [
//   {
//     title: 'Student ID',
//     dataIndex: 'id',
//     key: 'id',
//   },
//   {
//     title: 'First Name',
//     dataIndex: 'fname',
//     key: 'fname',
//   },
//   {
//     title: 'Last Name',
//     dataIndex: 'lname',
//     key: 'lname',
//   },
//   {
//     title: 'Class',
//     dataIndex: re => re.SchoolClass.name,
//     key: 'SchoolClass',
//   },
//   {
//     title: 'Math',
//     dataIndex: 'math',
//     key: 'math',
//   },
//   {
//     title: 'Physical',
//     dataIndex: 'physical',
//     key: 'physical',
//   },
//   {
//     title: 'Chemistry',
//     dataIndex: 'chemistry',
//     key: 'chemistry',
//   },
// ];

// class ImportFromExel extends Component {
//   state = {
//     inserted: null,
//     errors: null,
//     isLoading: false,
//     isShowResult: false,
//   };

//   clickInputFile = () => {
//     document.getElementById('exelFile').click();
//   };

//   handleChangeFile = async e => {
//     this.setState({ isLoading: true });
//     // const file = e.target.files[0];
//     // const form = new FormData();

//     // form.append('sv_file', file);

//     // const option = {
//     //   headers: {
//     //     'content-type': 'multipart/form-data',
//     //   },
//     // };
//     // const res = await Axios.post(
//     //   'http://localhost:3002/sv/excel',
//     //   form,
//     //   option,
//     // );

//     // this.setState({
//     //   inserted: res.data.inserted,
//     //   errors: res.data.errors,
//     //   isLoading: false,
//     //   isShowResult: true,
//     // });
//     this.setState({
//       inserted: inserted,
//       errors: errors,
//       isLoading: false,
//       isShowResult: true,
//     });
//   };

//   componentWillUnmount() {
//     this.setState({ ...this.state, isLoading: false, isShowResult: false });
//   }

//   render() {
//     return (
//       <>
//         <Button
//           type="primary"
//           ghost={true}
//           onClick={this.clickInputFile}
//           loading={this.state.isLoading}
//         >
//           <Icon type="file-excel" /> Import Form Excel
//         </Button>
//         <input
//           onChange={this.handleChangeFile}
//           style={{ opacity: 0, width: 0, height: 0 }}
//           type="file"
//           id="exelFile"
//         />
//         {console.log(this.state)}
//         {this.state.isShowResult && (
//           <>
//             {this.state.inserted && this.state.inserted[0] && (
//               <Table
//                 columns={columnsOfTableInserted}
//                 rowKey={record => record.id}
//                 key={record => record.id}
//                 dataSource={this.state.inserted}
//               />
//             )}
//             {this.state.errors && this.state.errors[0] && (
//               <Table
//                 key={record => record.id}
//                 columns={columnsOfTableErrors}
//                 rowKey={record => record.id}
//                 dataSource={this.state.errors}
//               />
//             )}
//           </>
//         )}
//       </>
//     );
//   }
// }

// export default ImportFromExel;
