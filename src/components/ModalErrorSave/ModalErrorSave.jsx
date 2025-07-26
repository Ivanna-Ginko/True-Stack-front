import React, { useEffect, useState } from "react";
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

const ErrorModal = ({ show }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  useEffect(() => {
    if (show === "showError") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [show]);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div>
        <button onClick={closeModal}>X</button>
        <div>Error while saving</div>
        <div>To save this article, you need to authorize first</div>
        <div>
          <button>Login</button>
          <button>Register</button>
        </div>
      </div>
    </Modal>
  );
};

    //  <ErrorModal show={"showError"}/>   need paste to open modal

export default ErrorModal;