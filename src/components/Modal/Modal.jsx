import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ModalStyle } from './Modal.styled';

export const Modal = ({ onImgClick, largeImg }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onImgClick('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onImgClick]);

  const handleBackdrop = event => {
    if (event.currentTarget === event.target) {
      onImgClick('');
    }
  };

  return (
    <Overlay onClick={handleBackdrop}>
      <ModalStyle>
        <img src={largeImg} alt="Modal img" />
      </ModalStyle>
    </Overlay>
  );
};

Modal.propType = {
  largeImg: PropTypes.string.isRequired,
  onImgClick: PropTypes.func.isRequired,
};
