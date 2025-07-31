import { useSelector } from 'react-redux';
import Container from '../container/Container'
import s from "./Hero.module.css"
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from '../../redux/selectors';

const Hero = () => {
  const navigate = useNavigate();
  const IsLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <Container>
        <div className={`${s.innercontainer}`} >
          <div className={s.hero_background}>
            <div className={s.hero_inner}>
              <h1 className={s.hero_header}>Find your <span className={s.hero_span}>harmony</span> in community</h1>
              <div className={s.hero_buttons_container}>
                <a href="#popularArticles" className={s.hero_articles_btn}>Go to Articles</a>
                {!IsLoggedIn ? <button
                  className={s.hero_reg_btn}
                  onClick={() => navigate("/register")}
                >
                  Register
                </button> :
                  <a href="#topCreators" className={s.hero_reg_btn}>Go to Creators</a>
                }

              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Hero