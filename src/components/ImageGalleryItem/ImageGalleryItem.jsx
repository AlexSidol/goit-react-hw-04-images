import { useState } from 'react';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, largeImageURL }) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const showModal = () => setIsVisibleModal(prev => !prev);

  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItem__image}
        onClick={showModal}
        src={src}
        alt={alt}
      />
      {isVisibleModal && (
        <Modal onClose={showModal} src={largeImageURL} alt={alt} />
      )}
    </li>
  );
};

export default ImageGalleryItem;
