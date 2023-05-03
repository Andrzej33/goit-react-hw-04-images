import { createPortal } from 'react-dom';
import { Overlay } from './Modal.styled';
import { ModalImg } from './Modal.styled';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal =({onClose,children})=> {

  useEffect(() => {

    const  handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
   
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const onBackdropClick = e => {
    if (e.targer === e.CurrentTarget) onClose();
  };

  
    return createPortal(
      <Overlay onClick={onBackdropClick}>
        <ModalImg>{children}</ModalImg>
      </Overlay>,
      modalRoot
    );
};
 
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
 

 
  

