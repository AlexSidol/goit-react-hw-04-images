import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRootRef = document.querySelector('#modal-root');

export default function Modal({ src, alt, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
  const handleKeyDown = evt => {
    if (evt.code === 'Escape' || evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleKeyDown}>
      <div className={css.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRootRef
  );
}
