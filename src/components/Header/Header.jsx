// import React from "react";

// const Header = () => {
//   return (
//     <>
//       <h1>Header</h1>
//     </>
//   );
// };

// export default Header;
// для виклика кнопки
import React, { useState } from "react";
import ModalErrorSave from "../ModalErrorSave/ModalErrorSave";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <h1>Header</h1>
      <button onClick={openModal}>Викликати модалку</button>

      {isModalOpen && <ModalErrorSave onClose={closeModal} />}
    </>
  );
};

export default Header;