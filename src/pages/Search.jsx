import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    searchInput: '',
    isDisabled: true,
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({ searchInput: value });

    if (value.length > 1) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  render() {
    const { searchInput, isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />

        <form>
          <input
            type="text"
            placeholder="Search artist or band"
            data-testid="search-artist-input"
            value={ searchInput }
            onChange={ this.onInputChange }
          />

          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
          >
            Search
          </button>

        </form>

      </div>
    );
  }
}

export default Search;
