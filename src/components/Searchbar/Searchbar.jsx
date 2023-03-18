import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchItem: '',
  };

  componentDidMount() {
    const LocalSearchItem = localStorage.getItem('LocalSearchItem');
    // console.log(LocalSearchItem);
    if (LocalSearchItem !== null) {
      this.setState({ searchItem: JSON.parse(LocalSearchItem) });
    }
  }

  onHandleChange = e => {
    // console.log(e.currentTarget.value.toLowerCase());
    this.setState({
      searchItem: e.currentTarget.value.toLowerCase(),
    });

    localStorage.setItem(
      'LocalSearchItem',
      JSON.stringify(this.state.searchItem)
    );
  };

  searchSubmit = e => {
    e.preventDefault();
    const { searchItem } = this.state;
    // console.log(searchItem);
    if (this.state.searchItem.trim() === '') {
      alert('Please, enter your request!');
      return;
    }
    this.props.onSubmit(searchItem);
    this.setState({
      searchItem: '',
    });
    localStorage.clear();
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.searchSubmit}>
          <button className={css.searchFormButton} type="submit">
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            value={this.state.searchItem}
            onChange={this.onHandleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
