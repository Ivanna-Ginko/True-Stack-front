import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { registerUser } from "../../redux/operations";
import { selectIsLoggedIn } from "../../redux/selectors";
import Container from "../container/Container";
import { Loader } from "../Loader/Loader";
import s from "./UploadForm.module.css";
import placeholderImg from "../../assets/images/normal/UploadPhoto/up-camera-test.png";
import closeIcon from "../../assets/icons/close.svg";
import { toast } from "react-toastify";

const UploadForm = ({ formData }) => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // Restore preserved photo if available
  useEffect(() => {
    if (location.state?.preservedPhoto) {
      setImage(location.state.preservedPhoto.image);
      setFile(location.state.preservedPhoto.file);
    }
  }, [location.state]);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        toast.error("Image must be less than 1MB.");
        return;
      }
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendRegisterRequest = async () => {
    const formDataInstance = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataInstance.append(key, value);
    });

    formDataInstance.delete("repeatPwd");
    formDataInstance.append("avatar", file);

    try {
      await dispatch(registerUser(formDataInstance)).unwrap();
    } catch (err) {
      toast.error(err.message);
      navigate("/register", { state: { formData, image, file } });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("No file selected!");
      return;
    }
    sendRegisterRequest();
  };

  const skipAvatar = async () => {
    // Send registration request without avatar
    const formDataInstance = new FormData();

    // Append registration fields
    Object.entries(formData).forEach(([key, value]) => {
      formDataInstance.append(key, value);
    });

    // Don't append avatarUrl - send empty or skip it
    formDataInstance.delete("repeatPwd");

    try {
      await dispatch(registerUser(formDataInstance)).unwrap();
    } catch (err) {
      toast.error(err.message);
      navigate("/register", { state: { formData, image, file } });
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} className={s.up_form}>
        <div className={s.up_container}>
          <h1 className={s.up_header}>Upload your photo</h1>
          <div className={s.up_inner_container}>
            <input
              ref={inputRef}
              className={s.up_photo_input}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <img
              src={image || placeholderImg}
              alt="Upload preview"
              className={s.up_image_upload}
              onClick={handleImageClick}
            />
          </div>
          <button
            disabled={!image || isLoading}
            className={s.up_submit_btn}
            type="submit"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
          <button
            className={s.up_close_button}
            type="button"
            onClick={skipAvatar}
            disabled={isLoading}
          >
            <img src={closeIcon} alt="Close" width="24" height="24" />
          </button>
        </div>
      </form>
      {isLoading && <Loader />}
    </Container>
  );
};

export default UploadForm;
