import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, onImage, largeImage }) => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItemImage}
        src={src}
        alt={alt}
        onClick={() => onImage(largeImage)}
      />
    </li>
  );
};

export default ImageGalleryItem;
