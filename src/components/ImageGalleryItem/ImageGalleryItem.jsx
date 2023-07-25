import { useState } from 'react';
import Modal from 'components/Modal/Modal';
import { Item, ItemImage } from './ImageGalleryItme';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ image }) {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(prevModalState => !prevModalState);
  };

  return (
    <>
      <Item>
        <ItemImage
          src={image.webformatURL}
          alt={image.tags}
          onClick={toggleModal}
        />
      </Item>
      {modalOpen && (
        <Modal image={image} onClick={toggleModal} onClose={toggleModal} />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
