import React, { Component } from 'react';
import { shape, func } from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import LoadScreen from '../components/LoadScreen';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isLoading: false,
    handleSubmited: true,
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

  userValidation = () => {
    const { name, email, image, description } = this.state;
    const inputValue = [name, email, image, description];
    const isFilled = inputValue.every((input) => input.length > 0);

    this.setState({
      handleSubmited: !isFilled,
    });
  };

  handleChangeInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.userValidation());
  };

  handleSubmitButton = async (event) => {
    event.preventDefault();
    const { name, email, image, description } = this.state;
    const { history } = this.props;

    this.setState({ isLoading: true }, async () => {
      await updateUser({ name, email, image, description });
      this.setState({ isLoading: false });
      return history.push('/profile');
    });
  };

  render() {
    const { name, email, image, description, isLoading, handleSubmited } = this.state;

    return (
      <div data-testid="page-profile-edit">

        <Header />

        {isLoading ? <LoadScreen /> : (
          <form>

            <div>
              <label htmlFor="edit-input-image">
                URL:
                <input
                  type="text"
                  name="image"
                  id="edit-input-image"
                  value={ image }
                  onChange={ this.handleChangeInput }
                  data-testid="edit-input-image"
                />
              </label>
            </div>

            <label htmlFor="edit-input-name">
              Nome:
              <input
                type="text"
                name="name"
                id="edit-input-name"
                value={ name }
                onChange={ this.handleChangeInput }
                data-testid="edit-input-name"
              />
            </label>

            <label htmlFor="edit-input-email">
              Email:
              <input
                type="text"
                name="email"
                id="edit-input-email"
                value={ email }
                onChange={ this.handleChangeInput }
                data-testid="edit-input-email"
              />
            </label>

            <label htmlFor="edit-input-description">
              Descrição:
              <textarea
                name="description"
                id="edit-input-description"
                value={ description }
                onChange={ this.handleChangeInput }
                data-testid="edit-input-description"
              />
            </label>

            <button
              type="submit"
              onClick={ this.handleSubmitButton }
              disabled={ handleSubmited }
              data-testid="edit-button-save"
            >
              Editar perfil
            </button>

          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
};

export default ProfileEdit;
