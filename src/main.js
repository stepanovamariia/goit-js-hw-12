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

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
let query = '';
let page = 1;
let totalHits = 0;

refs.form.addEventListener('submit', handleSubmit);
refs.loadMoreBtn.addEventListener('click', loadMoreImages);

async function handleSubmit(event) {
  event.preventDefault();
  query = refs.input.value.toLowerCase();

  if (!query) {
    refs.gallery.innerHTML = '';

    iziToast.show({
      message: 'Enter your request!',
      messageColor: 'red',
    });
    refs.loader.style.display = 'none';
    refs.loadMoreBtn.style.display = 'none';
    return;
  }

  if (query.includes(' ')) {
    refs.gallery.innerHTML = '';

    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
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
          'Sorry, there are no images matching your search query. Please try again!',
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

  lightbox.refresh();

  refs.loadMoreBtn.style.display = 'block';

  smoothScroll();
}

async function loadMoreImages() {
  refs.loadMoreBtn.style.display = 'none';
  refs.loader.style.display = 'block';

  page += 1;

  let data;

  try {
    data = await serviceCardsInfo(query, page);

    if (data.hits.length === 0 || (page - 1) * 15 >= totalHits) {
      refs.loader.style.display = 'none';
      refs.loadMoreBtn.style.display = 'none';
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: 'red',
      });
      return;
    }
  } catch (err) {
    console.log(err);
    refs.loader.style.display = 'none';
    refs.loadMoreBtn.style.display = 'block';
    return;
  }

  refs.loader.style.display = 'none';

  const markup = createMarkup(data.hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();

  if ((page - 1) * 15 + data.hits.length >= totalHits) {
    refs.loadMoreBtn.style.display = 'none';
    iziToast.show({
      message: "We're sorry, but you've reached the end of search results.",
      messageColor: 'red',
    });
  } else {
    refs.loadMoreBtn.style.display = 'block';
  }

  smoothScroll();
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
