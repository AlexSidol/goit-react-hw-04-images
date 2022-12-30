import { useState } from 'react';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ imageData }) {
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const showModal = () => setIsVisibleModal(prev => !prev);

  const { src, alt, largeImageURL } = imageData;

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
}
