import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardAlbum extends Component {
  render() {
    const { collectionSave } = this.props;
    const { artistName, collectionId, collectionName, artworkUrl100 } = collectionSave;
    return (
      <div>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <div>
            <img src={ artworkUrl100 } alt={ collectionName } />
            <h3>{ collectionName }</h3>
            <h6>{ artistName }</h6>
          </div>
        </Link>
      </div>
    );
  }
}
CardAlbum.propTypes = {
  collectionSave: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  }).isRequired,
};
export default CardAlbum;
