import axios from 'axios';

async function serviceCardsInfo(data, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '42892988-1a177f86546a7a1e93a2f736f';

  const params = new URLSearchParams({
    key: API_KEY,
    q: data,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 15, // Изменено количество элементов на странице на 15
  });

  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    return response.data;
  } catch (error) {
    throw new Error('Не удалось получить данные с Pixabay API');
  }
}

export { serviceCardsInfo };
