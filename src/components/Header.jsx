import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      <header data-testid="header-component">
        <h2 data-testid="header-user-name">{ name.name }</h2>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
