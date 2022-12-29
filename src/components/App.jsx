import { useState, useEffect } from 'react';
import { SearchBar } from './Searchbar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { getGalleryImages } from '../service/api';
import { Loader } from '../components/Loader/Loader';
import { Button } from './Button/Button';
import { Message } from './App.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [imgLargeUrl, setImgLargeUrl] = useState('');
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const perPage = 12;

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    getGalleryImages(query, page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          setIsEmpty(true);
          return;
        }
        setPhotos(prevState => [...prevState, ...hits]);
        setShowBtn(page < Math.ceil(totalHits / perPage));
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [query, page, error]);

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onFormSubmit = queryText => {
    setQuery(queryText);
    setPhotos([]);
    setImgLargeUrl('');
    setPage(1);
    setShowBtn(false);
    setError(null);
    setIsEmpty(false);
    setIsLoading(false);
  };

  const onImgClick = LargeUrl => {
    setImgLargeUrl(LargeUrl);
  };

  return (
    <>
      <SearchBar onFormSubmit={onFormSubmit} btnText="Search" />
      {isLoading && <Loader />}
      {isEmpty ? (
        <Message>Images not found</Message>
      ) : (
        <ImageGallery photos={photos} onImgClick={onImgClick} />
      )}
      {showBtn && <Button loadMore={loadMore} />}
      {imgLargeUrl && <Modal largeImg={imgLargeUrl} onImgClick={onImgClick} />}
    </>
  );
};
