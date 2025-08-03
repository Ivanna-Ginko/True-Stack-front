import React from 'react'
import Container from '../../components/container/Container';
import AddArticleForm from '../../components/AddArticleForm/AddArticleForm';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
const CreateArticlePage = () => {
  return (
    <Container>
      <SectionTitle title={'Create Article'} />
      <AddArticleForm />
    </Container>
  );
}

export default CreateArticlePage;