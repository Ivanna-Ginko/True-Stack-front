import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'All', label: 'All' },
  { value: 'Popular', label: 'Popular' },
];

const customStyles = {
  control: (base) => ({
    ...base,
    marginBottom: 0,
    maxWidth: '169px',
    height: '33px',
    border: '1px solid #9F9F9F',
    borderRadius: '4px',
    padding: '0 4px',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '155%',
    color: '#595D62',
    boxShadow: 'none',
    cursor: 'pointer',
  }),
  option: (base, state) => ({
    ...base,
    paddingTop: 0,
    paddingLeft: '12px',
    marginTop: 0,
    marginRight: '8px',
    width: '169px',
    height: '25px',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '155%',
    backgroundColor: state.isFocused ? '#D1E0D8' : 'white',
    color: '#595D62',
    cursor: 'pointer',
  }),
  menu: (base) => ({
    ...base,
    marginTop: 0, 
    zIndex: 10,
  }),
      menuList: (base) => ({
    ...base,
    paddingTop: 0, 
    paddingBottom: 0,
    marginTop: 0,
  }),
};

const ArticleListSelect = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState({ value: 'Popular', label: 'Popular' });

  const handleChange = (selected) => {
    setSelectedOption(selected);
    if (onChange) {
      onChange(selected.value); 
    }
  };
  console.log(selectedOption)
  return (
    <Select
      options={options}
      defaultValue={options[1]}
      onChange={handleChange}
      styles={customStyles}
      isSearchable={false}
    />
  );
};

export default ArticleListSelect;