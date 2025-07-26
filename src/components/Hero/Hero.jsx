import Container from '../container/Container'
import s from "./Hero.module.css"

const Hero = () => {
  return (
    <>
      <Container>
        <div className={`${s.innercontainer}`} >
          <div className={s.hero_background}>
            <div className={s.hero_inner}>
              <h1 className={s.hero_header}>Find your <span className={s.hero_span}>harmony</span> in community</h1>
              <div className={s.hero_buttons_container}>
                <button className={s.hero_articles_btn}><a href="#popularArticles">Go to Articles</a></button>
                <button className={s.hero_reg_btn}>Register</button> {/* use navigate */}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Hero