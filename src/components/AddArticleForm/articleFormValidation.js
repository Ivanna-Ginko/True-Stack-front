import * as Yup from 'yup';

export const articleFormValidation = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(48, 'Title is too long (max 48)')
    .required('Title is required'),
  article: Yup.string()
    .min(100, 'Text must be at least 100 characters')
    .max(4000, 'Text is too long (max 4000)')
    .required('Text is required'),
  img: Yup.mixed()
    .required('Image is required')
    .test(
      'fileSize',
      'Image must be less than 1Mb',
      value => !value || (value && value.size <= 1024 * 1024)
    ),
});