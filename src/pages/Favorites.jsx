import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import LoadScreen from '../components/LoadScreen';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  state = {
    musics: undefined,
    isLoading: false,
  };

  async componentDidMount() {
    this.handleInput();
  }

  handleInput = async () => {
    this.setState({ isLoading: true }, async () => {
      const musics = await getFavoriteSongs();
      this.setState({ musics, isLoading: false });
    });
  };

  render() {
    const { musics, isLoading } = this.state;
    return (

      <div data-testid="page-favorites">

        <Header />
        <div>

          {isLoading ? <LoadScreen /> : null}
          {
            musics && !isLoading ? (
              musics.map((music) => (
                <MusicCard
                  trackName={ music.trackName }
                  key={ music.trackId }
                  music={ { ...music, ...{ trackId: music.trackId } } }
                  musicsFavorite
                  clickBtn={ this.handleInput }
                />
              ))
            ) : null
          }

        </div>
      </div>
    );
  }
}

export default Favorites;
