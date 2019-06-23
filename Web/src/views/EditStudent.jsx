import React from 'react';
import EditStudentForm from '../components/Formbase/EditStudentForm';
import Main from '../layouts/Main';
import { Link } from 'react-router-dom';
import { Divider, Icon } from 'antd';

export default class EditStudent extends React.Component {
  render() {
    console.log(this.props.match.params.id);
    return (
      <Main>
        <h1 style={{ fontSize: '2em', color: 'gray' }}>
          Edit Student{' '}
          <Link to="/">
            <Icon title="Go back" type="rollback" />
          </Link>
        </h1>
        <Divider />
        <EditStudentForm id={this.props.match.params.id} />
      </Main>
    );
  }
}
