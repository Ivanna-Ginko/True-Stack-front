import React from 'react'
import s from "./AboutUs.module.css"
import Container from '../container/Container'
// Flower images
import abFlowerDesktop1x from '../../assets/images/normal/AboutUs/ab-flower-desktop-1x.png';
import abFlowerDesktop2x from '../../assets/images/retina/AboutUs/ab-flower-desktop-2x.png';
import abFlowerTablet1x from '../../assets/images/normal/AboutUs/ab-flower-tablet-1x.png';
import abFlowerTablet2x from '../../assets/images/retina/AboutUs/ab-flower-tablet-2x.png';
import abFlowerSmall1x from '../../assets/images/normal/AboutUs/ab-flower-small-1x.png';
import abFlowerSmall2x from '../../assets/images/retina/AboutUs/ab-flower-small-2x.png';
// People images
import abPeopleDesktop1x from '../../assets/images/normal/AboutUs/ab-people-desktop-1x.png';
import abPeopleDesktop2x from '../../assets/images/retina/AboutUs/ab-people-desktop-2x.png';
import abPeopleTablet1x from '../../assets/images/normal/AboutUs/ab-people-tablet-1x.png';
import abPeopleTablet2x from '../../assets/images/retina/AboutUs/ab-people-tablet-2x.png';
import abPeopleSmall1x from '../../assets/images/normal/AboutUs/ab-people-small-1x.png';
import abPeopleSmall2x from '../../assets/images/retina/AboutUs/ab-people-small-2x.png';
// Yoga images
import abYogaDesktop1x from '../../assets/images/normal/AboutUs/ab-yoga-desktop-1x.png';
import abYogaDesktop2x from '../../assets/images/retina/AboutUs/ab-yoga-desktop-2x.png';

const About = () => {
  return (
    <>
      <Container>
        <div className={s.innercontainer}>
          <div className={s.inner_info_flower}>
            <div className={s.ab_info}>
              <h2 className={s.ab_header}>About us</h2>
              <p className={s.ab_paragraph}>Harmoniq is a mindful publishing platform dedicated to mental health and well-being. We bring together writers, thinkers, and readers who believe that open, thoughtful stories can heal, inspire, and connect. Whether you're here to share your journey or learn from others — this is your space to  slow down, reflect, and grow.</p>
            </div>
            <picture>
              <source
                media="(min-width: 1440px)"
                srcSet={`${abFlowerDesktop1x} 1x, ${abFlowerDesktop2x} 2x`}
              />
              <source
                media="(min-width: 768px)"
                srcSet={`${abFlowerTablet1x} 1x, ${abFlowerTablet2x} 2x`}
              />
              <img
                className={`${s.flower_img} ${s.ab_img}`}
                src={abFlowerSmall1x}
                srcSet={`${abFlowerSmall1x} 1x, ${abFlowerSmall2x} 2x`}
                alt="Flower"
              />
            </picture>
          </div>
          <div className={s.inner_people_yoga}>
            <picture>
              <source
                media="(min-width: 1440px)"
                srcSet={`${abPeopleDesktop1x} 1x, ${abPeopleDesktop2x} 2x`}
              />
              <source
                media="(min-width: 768px)"
                srcSet={`${abPeopleTablet1x} 1x, ${abPeopleTablet2x} 2x`}
              />
              <img
                className={`${s.ab_people_img} ${s.ab_img}`}
                src={abPeopleSmall1x}
                srcSet={`${abPeopleSmall1x} 1x, ${abPeopleSmall2x} 2x`}
                alt="Group of people"
              />
            </picture>
            <picture>
              <img
                className={`${s.ab_yoga_img} ${s.ab_img}`}
                src={abYogaDesktop1x}
                srcSet={`${abYogaDesktop1x} 1x, ${abYogaDesktop2x} 2x`}
                alt="Meditation"
              />
            </picture>
          </div>
        </div>
      </Container >
    </>
  )
}

export default About