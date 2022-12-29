import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchBtn,
  SearchBtnSpan,
  SearchInput,
} from './Searchbar.styled';

export const SearchBar = ({ onFormSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const inputChange = event => {
    setSearchValue(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    onFormSubmit(searchValue);
    event.target.reset();
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <SearchBtnSpan></SearchBtnSpan>
        </SearchBtn>

        <SearchInput
          onChange={inputChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

SearchBar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
