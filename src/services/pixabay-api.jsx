import PropTypes from 'prop-types';
import filteredArr from './filteredArr';

const API_KEY = '31500402-387db4a9fd94645d00cfea952';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

function fetchImages(requestInfo, page) {
  return fetch(
    `${BASE_URL}?q=${requestInfo}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      // console.log(response.json());
      const { data } = response.json();
      const images = filteredArr(data.hits);
      const totalPages = Math.ceil(data.totalHits / PER_PAGE);

      return { images, totalPages };
    }
    return Promise.reject(new Error(`No response from server`));
  });
}

const api = { fetchImages };
export default api;

fetchImages.propTypes = {
  requestInfo: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};
