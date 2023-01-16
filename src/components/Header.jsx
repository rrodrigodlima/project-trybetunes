import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import LoadScreen from './LoadScreen';

class Header extends Component {
  state = {
    loading: true,
    name: '',
  };

  componentDidMount() {
    this.getName();
  }

  getName = async () => {
    this.setState({
      name: await getUser(),
      loading: false,
    });
  };

  render() {
    const { name, loading } = this.state;

    if (loading) {
      return <LoadScreen />;
    }

    return (
      <div data-testid="header-component">
        <h2 data-testid="header-user-name">{ name.name }</h2>
      </div>
    );
  }
}

export default Header;
