import axios from 'axios';

const API_KEY = '34316934-23a1792d471904186ea8894b3';
const URL = 'https://pixabay.com/api/';

export const fetchByQuery = async (query, page = 1) => {
  const OPTIONS = new URLSearchParams({
    q: query,
    key: API_KEY,
    page,
    mage_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });
  const ressponse = await axios(`${URL}?${OPTIONS}`);
  return ressponse.data;
};

// axios.defaults.baseURL = 'https://pixabay.com/api/';
// // axios.defaults.headers.common['Authorization'] = '34316934-23a1792d471904186ea8894b3';

// export const fetchByQuery = async (query,page) => {
//     const response = await axios.get(',?key=34316934-23a1792d471904186ea8894b3&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=1&q=dog'
     
//     );
//     console.log(response.data)
//     return response.data
// }
