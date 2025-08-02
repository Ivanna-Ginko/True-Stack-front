// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import styles from './EditArticleButton.module.css';

// const EditArticleButton = ({ articleId, newData, onSuccess }) => {
//   const [isEdit, setIsEdit] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handlePatch = async () => {
//     if (loading) return;

//     setLoading(true);
//     try {
//       await axios.patch(`https://truestack.onrender.com/articles/${articleId}`, newData);
//       setIsEdit(true);
//       if (onSuccess) onSuccess();
//       navigate(`/articles/${articleId}`);
//     } catch (error) {
//       console.error('Error updating article:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handlePatch}
//       className={`${styles.button} ${isEdit ? styles.edit : ''}`}
//       disabled={loading}
//     >
//       <svg
//         className={`${styles.icon} ${isEdit ? styles.editIcon : ''}`}
//         fill="none"
//       >
//         <path
//           d="M9.423 30.25h-7.673v-7.688l15.894-15.925M9.423 30.25h20.827M9.423 30.25l15.894-15.925M17.644 6.637l3.288-3.295c2.119-2.123 5.554-2.123 7.673 0s2.119 5.565 0 7.688l-3.288 3.295M17.644 6.637l7.673 7.688"
//           stroke="currentColor"
//         />
//       </svg>
//     </button>
//   );
// };

// export default EditArticleButton;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EditArticleButton.module.css';

const EditArticleButton = ({ articleId, title, text, photo }) => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [loading] = useState(false);

  const handleEditClick = () => {
    setIsEdit(true);
    navigate(`/articles/${articleId}`, {
      state: { title, text, photo }
    });
  };

  return (
    <button
      onClick={handleEditClick}
      className={`${styles.button} ${isEdit ? styles.edit : ''}`}
      disabled={loading}
    >
      <svg className={`${styles.icon} ${isEdit ? styles.editIcon : ''}`} fill="none">
        <path
          d="M9.423 30.25h-7.673v-7.688l15.894-15.925M9.423 30.25h20.827M9.423 30.25l15.894-15.925M17.644 6.637l3.288-3.295c2.119-2.123 5.554-2.123 7.673 0s2.119 5.565 0 7.688l-3.288 3.295M17.644 6.637l7.673 7.688"
          stroke="currentColor"
        />
      </svg>
    </button>
  );
};

export default EditArticleButton;
