import React from 'react'
import { useParams } from 'react-router-dom'
import YouCanAlsoInterested from '../../components/YouCanAlsoInterested/YouCanAlsoInterested'
import Container from '../../components/container/Container'

const ArticlePage = () => {
  const { id } = useParams();
  const config = {
      params: {
          'sortBy': 'rate',
          'perPage': 3
      }
  }
  return (
    <>
    <Container>
      <h2>ArticlePage</h2>
      <YouCanAlsoInterested id={id} config={config}/>
    </Container>
    </>
  )
}

export default ArticlePage