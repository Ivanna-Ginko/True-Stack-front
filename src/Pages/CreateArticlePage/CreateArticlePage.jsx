import React from 'react'
import { useLocation } from 'react-router-dom';
import Container from '../../components/container/Container';
import AddArticleForm from '../../components/AddArticleForm/AddArticleForm';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

const CreateArticlePage = () => {
  const location = useLocation();
  const isEditing = location.state?.title && location.state?.text;
  const editData = location.state || null;

  return (
    <Container>
      <SectionTitle title={isEditing ? 'Edit Article' : 'Create Article'} />
      <AddArticleForm editData={editData} isEditing={isEditing} />
    </Container>
  );
}

export default CreateArticlePage;