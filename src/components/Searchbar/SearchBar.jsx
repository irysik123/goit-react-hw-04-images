import { useState } from 'react';
import {
  SearchHeader,
  SearchForm,
  SearchFormBtn,
  /* SearchLabel, */
  Input,
} from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';

export default function SearchBar({ onSubmit }) {
  const [searchText, setSearchText] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(searchText);
  };

  const handleImageChange = event => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <SearchHeader>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormBtn type="submit">
            <AiOutlineSearch style={{ stroke: 'grey' }} />
            {/* <SearchLabel>
                
              </SearchLabel> */}
          </SearchFormBtn>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleImageChange}
            value={searchText}
          />
        </SearchForm>
      </SearchHeader>
    </div>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
