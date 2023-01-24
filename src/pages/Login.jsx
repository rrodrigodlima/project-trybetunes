import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoadScreen from '../components/LoadScreen';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    btnDisabled: true,
    isLoading: false,
    redirect: false,
    inputName: '',
  };

  onInputChange = ({ target }) => {
    const { value } = target;

    this.setState({ inputName: value });

    if (value.length > 2) {
      this.setState({
        btnDisabled: false,
      });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  };

  onBtnClick = async () => {
    const { inputName } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: inputName });
    this.setState({ redirect: true });
  };

  render() {
    const { btnDisabled, isLoading, redirect } = this.state;
    if (isLoading) {
      return (
        <div>
          <LoadScreen />
          { redirect && <Redirect to="/search" /> }
        </div>
      );
    }

    return (

      <div data-testid="page-login">
        Login
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            placeholder="Digite seu nome"
            onChange={ this.onInputChange }
          />

          <button
            type="submit"
            data-testid="login-submit-button"
            onClick={ this.onBtnClick }
            disabled={ btnDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
