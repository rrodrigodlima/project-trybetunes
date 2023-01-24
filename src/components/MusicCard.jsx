import React, { Component } from 'react';
import PropTypes, { bool, func } from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import LoadScreen from './LoadScreen';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      musicsFavorite: props.musicsFavorite,
    };
  }

  HandleInput = async ({ target: { checked } }) => {
    const { music } = this.props;
    this.setState({ isLoading: true });
    if (checked) {
      this.setState({ isLoading: true });
      await addSong(music);
    } else {
      await removeSong(music);
    }

    let getFavorite = await getFavoriteSongs();
    getFavorite = getFavorite.map((favorite) => favorite.trackId);
    this.setState({
      musicsFavorite: getFavorite.includes(music.trackId),
    });

    this.setState({ isLoading: false });
  };

  render() {
    const { music: { trackId, trackName, previewUrl }, clickBtn } = this.props;
    const { isLoading, musicsFavorite } = this.state;

    return (
      <div>
        {
          isLoading && <LoadScreen />
        }

        <p>{trackName}</p>

        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>

        <label htmlFor="favorite">
          <input
            type="checkbox"
            id="favorite"
            name="musicsFavorite"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.HandleInput }
            checked={ musicsFavorite }
            onClick={ clickBtn }
          />
          Favorita
        </label>

      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
  musicsFavorite: bool.isRequired,
  clickBtn: func.isRequired,
};

export default MusicCard;
