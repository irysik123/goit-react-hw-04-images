import { GlobalStyle } from './GlobalStyle';
import { useState, useEffect, useCallback } from 'react';
import SearchBar from './Searchbar/SearchBar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';

const API_KEY = '37132472-47d9b0efe4089b759aaed266f';
const BASE_URL = 'https://pixabay.com/api/';

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState('');
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const grabImages = useCallback(
    (searchText, page = 1) => {
      setIsLoading(true);
      fetch(
        `${BASE_URL}?key=${API_KEY}&q=${searchText}&image_type=photo&page=${page}&per_page=${per_page}`
      )
        .then(res => res.json())
        .then(images => {
          setImages(prevImages => [...prevImages, ...images.hits]);
          setIsLoading(false);
          setTotalHits(images.totalHits);
        })
        .catch(error => console.log(error));
    },
    [per_page]
  );

  useEffect(() => {
    if (searchText) {
      grabImages(searchText, page);
    }
  }, [searchText, grabImages, page]);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleSubmit = textToSearch => {
    setImages([]);
    if (textToSearch.length < 3) {
      alert('Please enter minimum 3 symbols to search for Images');
    } else if (textToSearch === searchText) {
      alert(`You're already searching for ${textToSearch}`);
    } else {
      setSearchText(textToSearch);
    }
  };

  return (
    <>
      <GlobalStyle />
      <SearchBar onSubmit={handleSubmit} />
      <Loader isLoading={isLoading} />
      {images && (
        <>
          <ImageGallery images={images} />
          {totalHits !== images.length && (
            <Button onClick={handleLoadMore}>Load More</Button>
          )}
          {totalHits === 0 && (
            <div>"Sorry, no results found =( Please try one more time"</div>
          )}
        </>
      )}
    </>
  );
}
