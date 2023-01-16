import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    name: '',
    album: '',
    musics: [],
  };

  updateMusics = async (albumID) => {
    const response = await getMusics(albumID);
    console.log(response);
    this.setState({
      name: response[0].artistName,
      album: response[0].collectionName,
      musics: response.filter((music, index) => index > 0),
    });
  };

  render() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const { name, album, musics } = this.state;
    this.updateMusics(id);

    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{name}</h1>
        <h2 data-testid="album-name">{album}</h2>
        {
          musics.map((music) => (
            <MusicCard
              key={ Date.now() * Math.random() }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Album.defaultProps = {
  match: {
    params: {
      id: '',
    },
  },
};

export default Album;
