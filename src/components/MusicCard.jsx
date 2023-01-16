import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import LoadScreen from './LoadScreen';

class MusicCard extends Component {
  state = {
    isLoading: false,
  };

  handleChange = () => {
    const { music } = this.props;
    this.setState({ isLoading: true }, () => {
      addSong(music)
        .then(() => this.setState({ isLoading: false }));
    });
  };

  render() {
    const { trackName, previewUrl, trackId, checked } = this.props;
    const { isLoading } = this.state;
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
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ () => this.handleChange() }
            checked={ checked }
          />
          Favorito
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
