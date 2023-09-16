import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { fetchBaseFuction } from '../service-api';

const initSwiper = () => {
  const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
};

const getSwiperData = async () => {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/events';
  const data = await fetchBaseFuction(BASE_URL);
  const handledData = handleResponse(data);

  if (!handledData) {
    return;
  }

  createMarkUp(handledData);
};

const handleResponse = data => {
  if (!data.length || !data) {
    return null;
  }
  return data.reduce((acc, { cook, topic, _id }) => {
    acc.push({
      cook: { imgWebpUrl: cook.imgWebpUrl },
      topic: {
        name: topic.name,
        area: topic.area,
        imgWebpUrl: topic.imgWebpUrl,
        previewWebpUrl: topic.previewWebpUrl,
      },
    });
    return acc;
  }, []);
};

const createMarkUp = data => {
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  data.forEach(({ cook, topic }) => {
    const markUp = `
    <div class="swiper-slide">
      <div style="background-image: url(${cook.imgWebpUrl})"></div>
      <div>
          <img src="${topic.previewWebpUrl}" alt="">
          <h2>${topic.name}</h2>
          <p>${topic.area}</p>
      </div>
      <div style="background-image: url(${topic.imgWebpUrl})"></div>
  </div>`;

    swiperWrapper.insertAdjacentHTML('beforeend', markUp);
  });
  initSwiper();
};

getSwiperData();

export default swiper;
