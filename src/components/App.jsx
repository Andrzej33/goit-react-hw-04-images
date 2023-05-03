import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallrey';
import { Loader } from './Loader/Loader';
import { LoadMoreBtn } from './Button/Button';
import { Modal } from './Modal/Modal';
import { GlobalStyle } from './GlobalStyle/GlobalStyle';
import { AppContainer } from './ContainerApp/ContainerApp.styled';
import { fetchByQuery } from 'Fetch/Fetch';

export const App = () => {
  const [imageName, setName] = useState('');
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [modal, setModal] = useState({
    alt: '',
    largeImageURL: '',
  });
  useEffect(() => {
    if (!imageName) {
      return;
    }
    setLoading(true);
    setError(null);
    setSearching(true);
    fetchByQuery(imageName, page)
      .then(data => {
        const hits = data.hits;
        setTotal(data.totalHits);
        if (!hits.length) {
          return toast.info(`WE FIND NOTHING BY ${imageName} REQUEST`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }

        setImages(prevState => [...prevState, ...hits]);
      })
      .catch(error => setError(error.message))
      .finally(() => {
        setLoading(false);
        setSearching(false);
      });
  }, [imageName, page]);

  // При submit записуємо введений запит в state і скидаємо сторінку та масив запитів.

  const handleName = imageName => {
    setName(imageName);
    setPage(1);
    setImages([]);
  };

  const loadNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  // При натисканні на зображення - отримуємо посилання на велике зображення та його опис та додаємо ці дані в state, звідки передаємо їх саме в модальне вікно при його відкритті

  const openModal = (largeImageURL, alt) => {
    setModal(prevState => ({ ...prevState, largeImageURL, alt }));
  };

  // Створимо змінну яка буде приводитися до true лише в тому коли сторінок буде більше 1 і сторінка буде не остання. На основі цього значення будемо показувати або ні кнопку LoadMore.

  const showLoadMoreBtn = total / 12 > 1 && page < Math.ceil(total / 12);

  return (
    <AppContainer>
      <Searchbar onSubmit={handleName} />
      {error && <div>{error}</div>}
      <ImageGallery images={images} openModal={openModal} />
      <ToastContainer autoClose={2500} transition={Slide} />
      {loading && <Loader />}
      {showLoadMoreBtn && !searching && (
        <LoadMoreBtn onLoadMore={loadNextPage} />
      )}
      {modal.largeImageURL && (
        <Modal
          onClose={() => {
            setModal({ largeImageURL: '' });
          }}
        >
          <img src={modal.largeImageURL} alt={modal.alt} />
        </Modal>
      )}
      <GlobalStyle />
    </AppContainer>
  );
};
