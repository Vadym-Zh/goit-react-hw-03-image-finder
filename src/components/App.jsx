import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { getImages } from './services/pixabayAPI';
import ImageGallery from './ImageGallery/ImageGallery';
import ButtonMore from './Button/ButtonMore';
import Loader from './Loader/Loaader';
import Modal from './Modal/Modal';
import css from './App.module.css';

class App extends Component {
  state = {
    query: '',
    page: 1,
    pics: [],
    isLoading: false,
    error: null,
    loadBtn: false,
    isModal: false,
    bigImage: '',
    totalPage: null,
  };

  // Рендер відподіз з API
  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const { query, page } = this.state;
        const response = await getImages(query, page);
        const mathPages = Math.ceil(response.data.totalHits / 12);
        this.setState({ totalPage: mathPages + 1 });
        console.log(this.state.page);
        console.log(this.state.totalPage);
        console.log(this.state.page === mathPages);

        if (this.state.page === mathPages) {
          this.setState({ loadBtn: false });
          this.setState({ isLoading: false });
          alert('The end');
          // return;
        }

        if (response.data.hits.length === 0) {
          alert('No results found');
          this.setState({
            isLoading: false,
          });
          return;
        }
        // if (page > response.totalHits / 12) {
        //   alert('The end');
        //   this.setState({ isLoading: false });
        //   return;
        // }

        this.setState(prevState => ({
          isLoading: false,
          pics: [...prevState.pics, ...response.data.hits],
        }));
      } catch (error) {
        console.log(error);
      }
    }
  }

  // Запит зображення на API
  onSearch = searchItem => {
    this.setState({
      query: searchItem,
      pics: [],
      page: 1,
      loadBtn: true,
    });
  };

  // Load more
  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  openModal = image => {
    this.setState({
      isModal: true,
      bigImage: image,
    });
  };
  closeModal = () => {
    this.setState({
      isModal: false,
      bigImage: '',
    });
  };

  render() {
    const { pics, isLoading, query, loadBtn, bigImage, isModal } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSearch} />
        <ImageGallery images={pics} onImageClick={this.openModal} />
        {isLoading && <Loader />}
        {loadBtn && <ButtonMore onLoadMore={this.loadMore} />}
        {isModal && (
          <Modal onClose={this.closeModal} src={bigImage} alt={query}></Modal>
        )}
      </div>
    );
  }
}

export default App;
