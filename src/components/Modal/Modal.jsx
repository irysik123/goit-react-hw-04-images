import { useLayoutEffect } from 'react';
import { ModalWindow, ModalContainer } from './Modal.styled';
import PropTypes from 'prop-types';

export default function Modal({onClose, onClick, image}) {

  useLayoutEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => { window.removeEventListener('keydown', handleKeyDown)}
  }, [])


  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };


  return (
    <ModalWindow onClick={handleBackdropClick}>
      <ModalContainer onClick={onClick}>
        <img
          src={image.largeImageURL}
          alt={image.tags}
        />
      </ModalContainer>
    </ModalWindow>
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
};
