import{g as R,b as N,c as g,a as l,f as k,n as x}from"./scroll-up-d4b714c9.js";const $=document.querySelector(".fav-container-js");$.addEventListener("click",q);function q(e){if(!e.target.classList.contains("btn-see-recipe-js"))return;const n=e.target.closest(".btn-see-recipe-js").dataset.id;V(n)}async function V(e){try{const t=await R(e);_(t)}catch(t){console.log(t)}}function _(e){const t=N.create(O(e));t.show();const n=document.querySelector(".js-modal-video"),i=document.querySelector(".js-modal-img");W(e.youtube,n,i);const s=document.querySelector(".js-favorite-btn");(JSON.parse(localStorage.getItem(g.LS_RECIPES))??[]).find(({_id:c})=>c===e._id)?s.textContent="Remove":s.textContent="Add to favorite",s.addEventListener("click",()=>{s.textContent=Y(e);const c=JSON.parse(localStorage.getItem(g.LS_RECIPES));$.innerHTML=l(c),k(),E(),t.close(),location.reload(!0)}),document.querySelector(".js-modal-close").addEventListener("click",()=>t.close()),document.addEventListener("keydown",c=>{c.code==="Escape"&&(t.close(),document.removeEventListener("keydown"))})}function O(e){let t;const{thumb:n,title:i,rating:s,time:o,instructions:u,ingredients:d,tags:c,youtube:L}=e,j=s.toFixed(1),T=d.map(({name:S,measure:P})=>`<li class="ing-item">
    <p class="ing-name">${S}</p>
    <p class="ing-measure">${P}</p>
    </li>`).join("");let H=c.map(S=>`<li class="tags-item">
    <p class="tags-name">#${S}</p>
    </li>`).join(""),B=J(s);return t=`<div class="modal-box categories-block-modal"><div class="img-title-box"><iframe class="modal-img js-modal-video"  width="295" height="295" src="https://www.youtube.com/embed/${U(L)}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
     <img src="${n}" alt="${i}" class="modal-img js-modal-img is-none" id="fallback-image" width="295" height="295">
    <h1 class="modal-title">${i}</h1></div>
    <div class="desc-box">
    <div class="raiting-time-box">
    <p class="raiting-text">${j}</p>
    <ul class="star-list list">${B}</ul>
    <p class="time">${o} min</p>
    </div>
    <div class="ing-box">
    <ul class="ing-list list">${T}</ul>
    </div>
    <div class="tags-box">
    <ul class="tags-list list">${H}</ul>
    </div>
    </div>
    <p class="instruction">${u}</p>
    <button type="button" class="modal-close-btn js-modal-close">
    
     </button>
    <div class="button-block">
    <button class="btn add-to-favorite js-favorite-btn" type="button">Add to favorite</button>
    <button class="btn order-now js-rating" type="button">Give a rating</button>
    </div>
    </div>`,t}function J(e){const t=` <li class="item-star-icon">
        <button class="yellow-star"></button>
    </li>`,n=`<li class="item-star-icon" >
        <button class="gray-star"></button>
    </li>`,i=Math.round(e);let s=[];for(let o=0;o<5;o++)o+1>i?s.push(n):s.push(t);return s.join("")}function U(e){let t=e,n=t.indexOf("=");if(n!==-1)return t.substring(n+1)}function W(e,t,n){e||(t.classList.add("is-none"),n.classList.remove("is-none"))}function Y(e){const t=JSON.parse(localStorage.getItem(g.LS_RECIPES))??[],n=t.find(({_id:s})=>s===e._id),i=t.findIndex(({_id:s})=>s===e._id);if(n){t.splice(i,1),localStorage.setItem(g.LS_RECIPES,JSON.stringify(t));let s="Add to favorite";return x.Notify.warning("The recipe removed from favorites"),s}else{t.push(e),localStorage.setItem(g.LS_RECIPES,JSON.stringify(t));let s="Remove";return x.Notify.success("The recipe is added to favorites"),s}}let y,a=JSON.parse(localStorage.getItem(g.LS_RECIPES))??[],b,C=1;const A=document.querySelector(".fav-empty"),r=document.querySelector(".fav-container"),M=document.querySelector(".fav-categories"),p=document.querySelector(".fav-static");G();function G(){if(a.length)A.classList.add("is-none"),F(),I(),et();else return}function I(){const e="category",t=a.map(s=>s[e]),i=[...new Set(t)];i.unshift("All categories"),K(i)}function K(e){M.innerHTML=D(e),document.querySelectorAll(".js-category-btn").forEach(n=>{n.addEventListener("click",function(i){const s=i.currentTarget.getAttribute("data-button");s==="All categories"?F():z(s)})})}function z(e){const t=a.filter(n=>n.category===e);document.getElementById("paginationFAV").innerHTML="",r.innerHTML=l(t),k(),E()}function D(e){return e.map(t=>`<button class="category-btn js-category-btn" data-button="${t}">${t}</button>`).join("")}function F(){a.length>12&&window.innerWidth>767?(b=a.slice(0,12),r.innerHTML=l(b),f(a)):a.length>9&&window.innerWidth<=767?(b=a.slice(0,9),r.innerHTML=l(b),f(a)):(document.getElementById("paginationFAV").innerHTML="",r.innerHTML=l(a)),k(),E(),p.classList.contains("fav-phantom")&&(p.classList.remove("fav-phantom"),r.classList.remove("fav-style-reset"))}function f(e,t=C){const n=Math.ceil(e.length/12),i=t,s=Z(n,i),o=Number(s)+2;if(n===1)return document.getElementById("paginationFAV").innerHTML="";const u=Q(i),d=tt(s,o,n,t),c=X(i,n),L=`<div class="pagination-bar">
    <div class="pag-btn-block">${u}</div>
    <div class="pag-btn-block">${d}</div>
    <div class="pag-btn-block">${c}</div>
  </div>`;document.getElementById("paginationFAV").innerHTML=L}function Q(e){const t=e-1;let n="pag-btn-number";return Number(e)===1&&(n=""),`<button
      id="pag-btn-start"
      class="gag-btn-black pag-btn-number"
      type="button"
      aria-label="first page"
      page-number="1"
    >
      <span class="icon-wrap">
        <svg class="pag-btn-left-icon" width="20" height="20">
          <use href="img/sprite/icons.svg#icon-left-two"></use>
        </svg>
      </span>
    </button>
    <button
      id="pag-btn-prev"
      class="gag-btn-black ${n}"
      type="button"
      aria-label="previous page"
      page-number="${t}"
    >
      <svg class="pag-btn-left-icon" width="20" height="20">
        <use href="img/sprite/icons.svg#icon-left-one"></use>
      </svg>
    </button>`}function X(e,t){const n=Number(e)+1;let i="pag-btn-number";return Number(e)===t&&(i=""),`<button
          id="pag-btn-next"
          class="pag-btn-green ${i}"
          type="button"
          aria-label="next page"
          page-number="${n}"
        >
          <svg class="pag-btn-right-icon-next" width="20" height="20">
            <use href="img/sprite/icons.svg#icon-arrow"></use>
          </svg>
        </button>
        
        <button
          id="pag-btn-last"
          class="pag-btn-green pag-btn-number"
          type="button"
          aria-label="last page"
          page-number="${t}"
        >
          <span class="icon-container">
            <span class="icon-wrap-right">
              <svg class="pag-btn-right-icon" width="20" height="20">
                <use href="img/sprite/icons.svg#icon-right-two"></use>
              </svg>

          </span>
        </button>`}function Z(e,t){let n=1;return t>1&&(n=t-1),Number(t)===e&&(n=e-2),n===0&&(n=1),n}function tt(e,t,n,i){let s="";i=Number(i),i>2&&(s+=`<button
          id="pag-btn-dots-left"
          class="pag-btn-white pag-btn-number"
          aria-label="more pages"
          page-number="${i-2}"
        >
          ...
        </button>`);for(let o=e;o<=t;o++){if(o>n)continue;let u="pag-btn-number",d="";o==i&&(u="",d="active"),s+=`<button
          id="pag-btn-${o}"
          class="pag-btn-white ${u} ${d}"
          type="button"
          aria-label="page ${o}"
          page-number="${o}"
        >
          ${o}
        </button>`}return i+2<=n&&(s+=`<button
          id="pag-btn-dots-left"
          class="pag-btn-white pag-btn-number"
          aria-label="more pages"
          page-number="${i+2}"
        >
          ...
        </button>`),s}let v=0,h=12,m;document.addEventListener("click",async e=>{const t=e.target.closest(".pag-btn-number");if(b=w(t),t){y=t;const n=t.getAttribute("page-number"),i=l(b);r.innerHTML=i,f(a,n)}});function w(e){return e===1?a.slice(0,12):(e&&(m=e.getAttribute("page-number")),a.length>12&&window.innerWidth>767?(v=12*m-12,h=12*m,a.slice(v,h)):(v=9*m-9,h=9*m,a.slice(v,h)))}function et(){r.addEventListener("click",e=>{if(!e.target.classList.contains("js-add"))return;const t=e.target.dataset.id,n=a.findIndex(({_id:i})=>i===t);a.splice(n,1),localStorage.setItem(g.LS_RECIPES,JSON.stringify(a)),nt(y??1),I(),a.length||(A.classList.remove("is-none"),p.classList.add("fav-phantom"),r.classList.add("fav-style-reset"),M.innerHTML="")})}function E(){document.querySelectorAll(".js-add").forEach(t=>t.classList.add("liked"))}function nt(e){a.length>12&&window.innerWidth>767?(y&&(C=y.getAttribute("page-number")),r.innerHTML=l(w(e)),f(a)):a.length>9&&window.innerWidth<=767?(r.innerHTML=l(w(e)),f(a)):(document.getElementById("paginationFAV").innerHTML="",r.innerHTML=l(a)),p.classList.contains("fav-phantom")&&(p.classList.remove("fav-phantom"),r.classList.remove("fav-style-reset"))}
