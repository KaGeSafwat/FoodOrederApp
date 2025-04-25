import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import classes from './Modal.module.css';

export default function Modal({ children, isOpen, onClose }) {
  const modalRef = useRef();
  useEffect(() => {
    const modal = modalRef.current;
    if (isOpen) {
      modal.showModal();
    }
    return () => {
      modal.close();
    };
  }, [isOpen]);
  return createPortal(
    <dialog ref={modalRef} onClose={onClose} className={classes.modal}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}
