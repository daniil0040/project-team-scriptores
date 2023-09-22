import{g as R,b as N,c as g,a as l,f as b,n as x}from"./scroll-up-fda31022.js";const C=document.querySelector(".fav-container-js");C.addEventListener("click",q);function q(e){if(!e.target.classList.contains("btn-see-recipe-js"))return;const n=e.target.closest(".btn-see-recipe-js").dataset.id;V(n)}async function V(e){try{const t=await R(e);_(t)}catch(t){console.log(t)}}function _(e){const t=N.create(O(e));t.show();const n=document.querySelector(".js-modal-video"),a=document.querySelector(".js-modal-img");W(e.youtube,n,a);const i=document.querySelector(".js-favorite-btn");(JSON.parse(localStorage.getItem(g.LS_RECIPES))??[]).find(({_id:c})=>c===e._id)?i.textContent="Remove":i.textContent="Add to favorite",i.addEventListener("click",()=>{i.textContent=Y(e);const c=JSON.parse(localStorage.getItem(g.LS_RECIPES));C.innerHTML=l(c),b(),f(),t.close(),location.reload(!0)}),document.querySelector(".js-modal-close").addEventListener("click",()=>t.close()),document.addEventListener("keydown",c=>{c.code==="Escape"&&(t.close(),document.removeEventListener("keydown"))})}function O(e){let t;const{thumb:n,title:a,rating:i,time:o,instructions:u,ingredients:d,tags:c,youtube:w}=e,j=i.toFixed(1),T=d.map(({name:k,measure:P})=>`<li class="ing-item">
    <p class="ing-name">${k}</p>
    <p class="ing-measure">${P}</p>
    </li>`).join("");let H=c.map(k=>`<li class="tags-item">
    <p class="tags-name">#${k}</p>
    </li>`).join(""),B=J(i);return t=`<div class="modal-box categories-block-modal"><div class="img-title-box"><iframe class="modal-img js-modal-video"  width="295" height="295" src="https://www.youtube.com/embed/${U(w)}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
     <img src="${n}" alt="${a}" class="modal-img js-modal-img is-none" id="fallback-image" width="295" height="295">
    <h1 class="modal-title">${a}</h1></div>
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
    </li>`,a=Math.round(e);let i=[];for(let o=0;o<5;o++)o+1>a?i.push(n):i.push(t);return i.join("")}function U(e){let t=e,n=t.indexOf("=");if(n!==-1)return t.substring(n+1)}function W(e,t,n){e||(t.classList.add("is-none"),n.classList.remove("is-none"))}function Y(e){const t=JSON.parse(localStorage.getItem(g.LS_RECIPES))??[],n=t.find(({_id:i})=>i===e._id),a=t.findIndex(({_id:i})=>i===e._id);if(n){t.splice(a,1),localStorage.setItem(g.LS_RECIPES,JSON.stringify(t));let i="Add to favorite";return x.Notify.warning("The recipe removed from favorites"),i}else{t.push(e),localStorage.setItem(g.LS_RECIPES,JSON.stringify(t));let i="Remove";return x.Notify.success("The recipe is added to favorites"),i}}let m,s=JSON.parse(localStorage.getItem(g.LS_RECIPES))??[],p,E=1;const A=document.querySelector(".fav-empty"),r=document.querySelector(".fav-container"),M=document.querySelector(".fav-categories"),y=document.querySelector(".fav-static");G();function G(){if(s.length)A.classList.add("is-none"),F(),I(),et();else return}function I(){const e="category",t=s.map(i=>i[e]),a=[...new Set(t)];a.unshift("All categories"),K(a)}function K(e){M.innerHTML=D(e);const t=document.querySelectorAll(".js-category-btn");t[0].classList.add("fav-btn-active"),t.forEach(n=>{n.addEventListener("click",function(a){const i=a.currentTarget.getAttribute("data-button");i==="All categories"?F():z(i),t.forEach(o=>{console.log(o.classList.contains("fav-btn-active")),o.classList.contains("fav-btn-active")&&o.classList.remove("fav-btn-active")}),n.classList.add("fav-btn-active")})})}function z(e){const t=s.filter(n=>n.category===e);document.getElementById("paginationFAV").innerHTML="",r.innerHTML=l(t,!0),b(),f()}function D(e){return e.map(t=>`<button class="category-btn js-category-btn" data-button="${t}">${t}</button>`).join("")}function F(){s.length>12&&window.innerWidth>767?(p=s.slice(0,12),r.innerHTML=l(p,!0),L(s)):s.length>9&&window.innerWidth<=767?(p=s.slice(0,9),r.innerHTML=l(p,!0),L(s)):(document.getElementById("paginationFAV").innerHTML="",r.innerHTML=l(s,!0)),b(),f(),y.classList.contains("fav-phantom")&&(y.classList.remove("fav-phantom"),r.classList.remove("fav-style-reset"))}function L(e,t=E){const n=Math.ceil(e.length/12),a=t,i=Z(n,a),o=Number(i)+2;if(n===1)return document.getElementById("paginationFAV").innerHTML="";const u=Q(a),d=tt(i,o,n,t),c=X(a,n),w=`<div class="pagination-bar">
    <div class="pag-btn-block">${u}</div>
    <div class="pag-btn-block">${d}</div>
    <div class="pag-btn-block">${c}</div>
  </div>`;document.getElementById("paginationFAV").innerHTML=w,b(),f()}function Q(e){const t=e-1;let n="pag-btn-number";return Number(e)===1&&(n=""),`<button
      id="pag-btn-start"
      class="gag-btn-black pag-btn-number"
      type="button"
      aria-label="first page"
      page-number="1"
    >
      <span class="icon-wrap left-double"></span>
    </button>

    <button
      id="pag-btn-prev"
      class="gag-btn-black ${n}"
      type="button"
      aria-label="previous page"
      page-number="${t}"
    >
      <span class="icon-wrap left-single"></span>
    </button>`}function X(e,t){const n=Number(e)+1;let a="pag-btn-number";return Number(e)===t&&(a=""),`<button
          id="pag-btn-next"
          class="pag-btn-green ${a}"
          type="button"
          aria-label="next page"
          page-number="${n}"
        >
           <span class="icon-wrap-right right-single"></span>
        </button>
        
        <button
          id="pag-btn-last"
          class="pag-btn-green pag-btn-number"
          type="button"
          aria-label="last page"
          page-number="${t}"
        >
          <span class="icon-wrap-right right-double"></span>
        </button>`}function Z(e,t){let n=1;return t>1&&(n=t-1),Number(t)===e&&(n=e-2),n===0&&(n=1),n}function tt(e,t,n,a){let i="";a=Number(a),a>2&&(i+=`<button
          id="pag-btn-dots-left"
          class="pag-btn-white pag-btn-number"
          aria-label="more pages"
          page-number="${a-2}"
        >
          ...
        </button>`);for(let o=e;o<=t;o++){if(o>n)continue;let u="pag-btn-number",d="";o==a&&(u="",d="active"),i+=`<button
          id="pag-btn-${o}"
          class="pag-btn-white ${u} ${d}"
          type="button"
          aria-label="page ${o}"
          page-number="${o}"
        >
          ${o}
        </button>`}return a+2<=n&&(i+=`<button
          id="pag-btn-dots-left"
          class="pag-btn-white pag-btn-number"
          aria-label="more pages"
          page-number="${a+2}"
        >
          ...
        </button>`),i}let h=0,S=12,v;document.addEventListener("click",async e=>{const t=e.target.closest(".pag-btn-number");if(p=$(t),t){m=t;const n=t.getAttribute("page-number"),a=l(p,!0);r.innerHTML=a,b(),f(),L(s,n)}});function $(e){return e===1?s.slice(0,12):(e&&(v=e.getAttribute("page-number")),s.length>12&&window.innerWidth>767?(h=12*v-12,S=12*v,s.slice(h,S)):(h=9*v-9,S=9*v,s.slice(h,S)))}function et(){r.addEventListener("click",e=>{if(!e.target.classList.contains("js-add"))return;const t=e.target.dataset.id,n=s.findIndex(({_id:a})=>a===t);s.splice(n,1),localStorage.setItem(g.LS_RECIPES,JSON.stringify(s)),nt(m??1),b(),f(),I(),s.length||(A.classList.remove("is-none"),y.classList.add("fav-phantom"),r.classList.add("fav-style-reset"),M.classList.add("is-none"))})}function f(){document.querySelectorAll(".js-add").forEach(t=>t.classList.add("liked"))}function nt(e){s.length>12&&window.innerWidth>767?(m&&(E=m.getAttribute("page-number")),r.innerHTML=l($(e),!0),L(s)):s.length>9&&window.innerWidth<=767?(m&&(E=m.getAttribute("page-number")),r.innerHTML=l($(e),!0),L(s)):(document.getElementById("paginationFAV").innerHTML="",r.innerHTML=l(s,!0)),b(),f(),y.classList.contains("fav-phantom")&&(y.classList.remove("fav-phantom"),r.classList.remove("fav-style-reset"))}
