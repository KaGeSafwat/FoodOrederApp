import { createContext, useState } from 'react';

const ShowModalContext = createContext({
  showModal: '',
  showModalHandler: () => {},
  closeModalHandler: () => {},
});

export const ShowModalContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState('');

  const showModalHandler = (modal) => {
    setShowModal(modal);
  };

  const closeModalHandler = () => {
    setShowModal('');
  };

  const showModalCtx = {
    showModal,
    showModalHandler,
    closeModalHandler,
  };

  return (
    <ShowModalContext.Provider value={showModalCtx}>
      {children}
    </ShowModalContext.Provider>
  );
};

export default ShowModalContext;
