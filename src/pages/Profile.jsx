import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LoadScreen from '../components/LoadScreen';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true }, async () => {
      const user = await getUser();
      this.setState({
        ...user,
        isLoading: false,
      });
    });
  }

  render() {
    const { name, email, image, description, isLoading } = this.state;
    return (

      <div data-testid="page-profile">

        <Header />
        {isLoading ? <LoadScreen />
          : (
            <div>
              <img src={ image } alt={ name } data-testid="profile-image" />
              <h2>{ name }</h2>
              <p>{ email }</p>
              <p>{ description }</p>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
