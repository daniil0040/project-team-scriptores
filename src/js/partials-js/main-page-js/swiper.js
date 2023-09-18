import Swiper from 'swiper';
import { Autoplay, Mousewheel, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { getAllSomething } from '../service-api';

const initSwiper = () => {
  new Swiper('.swiper', {
    modules: [Pagination, Scrollbar, Autoplay, Mousewheel],
    speed: 800,
    spaceBetween: 90,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      spaceBetween: 50,
      clickable: true,
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    mousewheel: {
      invert: true,
    },
  });
};

const getSwiperData = async () => {
  const response = await getAllSomething('events');
  if (!response || !response.length) {
    return;
  }

  createMarkUp(response);

  initSwiper();
};

const createMarkUp = data => {
  const swiperWrapper = document.querySelector('.swiper-wrapper');

  const markUp = data
    .map(({ cook, topic }) => {
      return `
        <div class="swiper-slide">
          <div class="swiper-content">
            <div class="slide-first-img" style="background-image: url(${cook.imgWebpUrl})"></div>
            <div class="slide-second">
              <div class="slide-second-img" style="background-image: url(${topic.previewWebpUrl});"></div>
              <h2 class="slide-second-title">${topic.name}</h2>
              <p class="slide-second-description">${topic.area}</p>
            </div>
            <div class="slide-third-img" style="background-image: url(${topic.imgWebpUrl})"></div>
          </div>
        </div>
      `;
    })
    .join(' ');

  swiperWrapper.insertAdjacentHTML('beforeend', markUp);
};

getSwiperData();

// ! ПЕРШИЙ ВАРІАНТ СВАЙПЕРУ БЕЗ РЕФАКТОРИНГУ

// import Swiper from 'swiper';
// import { Autoplay, Mousewheel, Pagination, Scrollbar } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';

// import { fetchBaseFuction, getAllRecipes } from '../service-api';

// const initSwiper = () => {
//   const swiper = new Swiper('.swiper', {
//     modules: [Pagination, Scrollbar, Autoplay, Mousewheel],
//     speed: 1200,
//     spaceBetween: 30,
//     width: 495,
//     height: 300,
//     loop: true,
//     pagination: {
//       el: '.swiper-pagination',
//       type: 'bullets',
//       spaceBetween: 50,
//       clickable: true,
//     },
//     scrollbar: {
//       el: '.swiper-scrollbar',
//     },
//     autoplay: {
//       delay: 3000,
//       disableOnInteraction: false,
//     },
//     mousewheel: {
//       invert: true,
//     },
//   });
// };

// const getSwiperData = async () => {
//   const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/events';
//   const data = await fetchBaseFuction(BASE_URL);
//   const handledData = handleResponse(data);

//   if (!handledData) {
//     return;
//   }

//   createMarkUp(handledData);
// };

// const handleResponse = data => {
//   if (!data.length || !data) {
//     return null;
//   }
//   return data.reduce((acc, { cook, topic, _id }) => {
//     acc.push({
//       cook: { imgWebpUrl: cook.imgWebpUrl },
//       topic: {
//         name: topic.name,
//         area: topic.area,
//         imgWebpUrl: topic.imgWebpUrl,
//         previewWebpUrl: topic.previewWebpUrl,
//       },
//     });
//     return acc;
//   }, []);
// };

// const createMarkUp = data => {
//   const swiperWrapper = document.querySelector('.swiper-wrapper');
//   data.forEach(({ cook, topic }) => {
//     const markUp = `
//     <div class="swiper-slide">
//     <div class="swiper-content">
//       <div class="slide-first-img" style="background-image: url(${cook.imgWebpUrl})"></div>
//       <div class="slide-second">
//           <div class="slide-second-img" style="background-image: url(${topic.previewWebpUrl});"></div>
//           <h2 class="slide-second-title">${topic.name}</h2>
//           <p class="slide-second-description">${topic.area}</p>
//       </div>
//       <div class="slide-third-img" style="background-image: url(${topic.imgWebpUrl})"></div>
//     </div>
//   </div>`;

//     swiperWrapper.insertAdjacentHTML('beforeend', markUp);
//   });
//   initSwiper();
// };

// getSwiperData();

// export default initSwiper;
