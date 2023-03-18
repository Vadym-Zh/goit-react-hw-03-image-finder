import PropTypes from 'prop-types';
import css from './ButtonMore.module.css';

const ButtonMore = ({ onLoadMore }) => {
  return (
    <button className={css.button} onClick={onLoadMore}>
      Load more
    </button>
  );
};

export default ButtonMore;
