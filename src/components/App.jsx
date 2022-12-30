import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import pixabayApi from '../services/pixabay-api';
import ImageGallery from './ImageGallery/ImageGallery';

import Searchbar from '../components/Searchbar/Searchbar.jsx';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import css from '../components/App.module.css';

export default function App() {
  const [status, setStatus] = useState('idle');
  const [requestInfo, setRequestInfo] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!requestInfo) return;

    const renderImages = () => {
      setStatus('pending');

      pixabayApi
        .fetchImages(requestInfo, page)
        .then(({ images, totalPages }) => {
          if (images.length === 0) {
            toast.info(' No results for your request, try again ');
            setStatus('resolved');
            setShowButton(false);
            return;
          }

          setImages(prev => [...prev, ...images]);
          setStatus('resolved');
          setPage(prev => prev + 1);
          setShowButton(page < totalPages);
        })
        .catch(() => {
          setStatus('rejected');
        });
    };
    renderImages();
  }, [requestInfo, page]);

  useEffect(() => {
    if (status === 'rejected') {
      toast.error(' Something went wrong. Try again');
    }
  }, [status]);

  const handleFormSearch = newRequest => {
    if (newRequest === requestInfo) {
      toast.info('Please, enter new request');
      return;
    }
    setRequestInfo(newRequest);
    setPage(1);
    setImages([]);
  };

  const handleIncrement = () => setPage(prev => prev + 1);

  return (
    <div className={css.app}>
      <ToastContainer position="top-center" />
      <Searchbar onSubmit={handleFormSearch} />

      {status === 'idle' && (
        <p className={css.text__inform}>
          Application for searching images and photos
        </p>
      )}

      {images.length > 0 && <ImageGallery images={images} />}
      {status === 'resolved' && (
        <div>{showButton && <Button onClick={handleIncrement} />}</div>
      )}
      {status === 'pending' && <Loader />}
    </div>
  );
}
