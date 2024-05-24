import { serviceCardsInfo } from '../src/js/pixabay-api';
import { createMarkup } from '../src/js/render-functions';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  loader: document.querySelector('.loader'),
};

let lightbox;
let query = '';
let page = 1;
let totalHits = 0;

refs.form.addEventListener('submit', handleSubmit);
refs.loadMoreBtn.addEventListener('click', loadMoreImages);

async function handleSubmit(event) {
  event.preventDefault();
  query = refs.input.value.toLowerCase();

  if (!query || query.includes(' ')) {
    refs.gallery.innerHTML = '';

    iziToast.show({
      message:
        'Извините, нет изображений, соответствующих вашему запросу. Пожалуйста, попробуйте еще раз!',
      messageColor: 'red',
    });
    refs.loader.style.display = 'none';
    refs.loadMoreBtn.style.display = 'none';
    return;
  }

  page = 1;
  refs.loader.style.display = 'block';
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.style.display = 'none';

  let data;

  try {
    data = await serviceCardsInfo(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      refs.loader.style.display = 'none';
      iziToast.show({
        message:
          'Извините, нет изображений, соответствующих вашему запросу. Пожалуйста, попробуйте еще раз!',
        messageColor: 'red',
      });
      return;
    }
  } catch (err) {
    console.log(err);
    return;
  }

  refs.loader.style.display = 'none';

  const markup = createMarkup(data.hits);
  refs.gallery.innerHTML = markup;

  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  refs.loadMoreBtn.style.display = 'block';
}

async function loadMoreImages() {
  page += 1;
  refs.loader.style.display = 'block'; // Показать loader

  let data;

  try {
    data = await serviceCardsInfo(query, page);

    if (data.hits.length === 0 || (page - 1) * 15 >= totalHits) {
      refs.loader.style.display = 'none';
      refs.loadMoreBtn.style.display = 'none';
      iziToast.show({
        message: 'Мы извиняемся, но вы достигли конца результатов поиска.',
        messageColor: 'red',
      });
      return;
    }
  } catch (err) {
    console.log(err);
    return;
  }

  refs.loader.style.display = 'none'; // Скрыть loader

  const markup = createMarkup(data.hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();

  if ((page - 1) * 15 + data.hits.length >= totalHits) {
    refs.loadMoreBtn.style.display = 'none';
    iziToast.show({
      message: 'Мы извиняемся, но вы достигли конца результатов поиска.',
      messageColor: 'red',
    });
  }
}