import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import CardAlbum from '../components/CardAlbum';
import LoadScreen from '../components/LoadScreen';

class Search extends Component {
  state = {
    searchInput: '',
    isDisabled: true,
    isLoading: false,
    title: '',
    arraySearch: [],
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

  onButtonClick = async () => {
    const { searchInput } = this.state;
    this.setState({
      searchInput: '',
      isLoading: true,
    });
    const collectionSave = await searchAlbumsAPI(searchInput);
    if (collectionSave.length > 0) {
      this.setState({
        isLoading: false,
        title: `Resultado de álbuns de: ${searchInput}`,
        arraySearch: collectionSave,
      });
    } else {
      this.setState({
        isLoading: false,
        title: 'Nenhum álbum foi encontrado',
        arraySearch: [],
      });
    }
  };

  render() {
    const { searchInput, isDisabled, isLoading, title, arraySearch } = this.state;
    if (isLoading) {
      return (
        <div>
          <Header />
          <LoadScreen />
        </div>
      );
    }
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
            onClick={ this.onButtonClick }
          >
            Search
          </button>

        </form>

        <h1>{ title }</h1>

        {
          arraySearch
            .map((album, index) => (<CardAlbum
              collectionSave={ album }
              key={ index }
            />))
        }

      </div>
    );
  }
}

export default Search;
