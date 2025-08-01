import alertIcon from "../../assets/icons/alert.svg";
import s from "./NothingFound.module.css";
import AppLink from "../AppLink/AppLink.jsx";
import Container from "../container/Container.jsx";


// варіанти використання
{/* <NothingFound
  description="Save your first article"
  buttonText="Go to articles"
  buttonLink="/articles"
/>;
<NothingFound
  description="Write your first article"
  buttonText="Create an article"
  buttonLink="/create"
/>; */}


const NothingFound = ({ description, buttonText, buttonLink }) => {
  return (
    <>
      {/* <Container> */}
      <div className={s.div}>
        <div className={s.info}>
          <div className={s.alert}>
            <img src={alertIcon} alt="Alert" width="38" height="38" />
          </div>
          <h2>Nothing found.</h2>
          <p className={s.desc}>{description}</p>
        </div>
        <AppLink to={buttonLink} size="md" variant="outline">
          {buttonText}
        </AppLink>
      </div>
      {/* </Container> */}
    </>
  );
};

export default NothingFound;
