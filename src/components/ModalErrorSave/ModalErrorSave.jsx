import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
};

const ErrorModal = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div>
          <button onClick={closeModal}>X</button>
          <div> Error while saving</div>
          <div> To save this article, you need to autorize first</div>
          <div>
            <button>Login</button>
            <button>Register</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ErrorModal;
