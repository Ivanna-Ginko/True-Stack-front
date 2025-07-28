import React from 'react'
import css from './SectionTitle.module.css'
import Container from '../container/Container'

const SectionTitle = ({title}) => {
  return (
    <>
      <h2 className={css.title}>
        {title}
      </h2>
    </>
  )
}

export default SectionTitle