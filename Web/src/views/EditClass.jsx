import React from 'react';
import Main from '../layouts/Main';
import EditClassForm from '../components/Formbase/EditClassForm';
import { Divider, Icon } from 'antd';
import { Link } from 'react-router-dom';

export default class EditClass extends React.Component {
  render() {
    console.log(this.props.match.params.id);
    return (
      <Main>
        <h1 style={{ fontSize: '2em', color: 'gray' }}>
          Edit Class{' '}
          <Link to="/classview">
            <Icon type="rollback" />
          </Link>
        </h1>
        <Divider />
        <EditClassForm id={this.props.match.params.id} />
      </Main>
    );
  }
}
