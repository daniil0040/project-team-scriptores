import{g as j,b as I,c as r,n as v,a as b}from"./scroll-up-6caa7df1.js";const $=document.querySelector(".fav-container-js");$.addEventListener("click",A);function A(e){if(!e.target.classList.contains("btn-see-recipe-js"))return;const a=e.target.closest(".btn-see-recipe-js").dataset.id;R(a)}async function R(e){try{const t=await j(e);M(t)}catch(t){console.log(t)}}function M(e){const t=I.create(q(e));t.show();const a=document.querySelector(".js-modal-video"),o=document.querySelector(".js-modal-img");O(e.youtube,a,o);const s=document.querySelector(".js-favorite-btn");(JSON.parse(localStorage.getItem(r.LS_RECIPES))??[]).find(({_id:c})=>c===e._id)?s.textContent="Remove":s.textContent="Add to favorite",s.addEventListener("click",()=>s.textContent=P(e)),document.querySelector(".js-modal-close").addEventListener("click",()=>t.close()),document.addEventListener("keydown",c=>{c.code==="Escape"&&t.close()})}function q(e){let t;const{thumb:a,title:o,rating:s,time:n,instructions:m,ingredients:f,tags:c,youtube:h}=e,k=s.toFixed(1),x=f.map(({name:d,measure:w})=>`<li class="ing-item">
    <p class="ing-name">${d}</p>
    <p class="ing-measure">${w}</p>
    </li>`).join("");let C=c.map(d=>`<li class="tags-item">
    <p class="tags-name">#${d}</p>
    </li>`).join(""),E=_(s);return t=`<div class="modal-box categories-block-modal"><div class="img-title-box"><iframe class="modal-img js-modal-video"  width="295" height="295" src="https://www.youtube.com/embed/${N(h)}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
     <img src="${a}" alt="${o}" class="modal-img js-modal-img is-none" id="fallback-image" width="295" height="295">
    <h1 class="modal-title">${o}</h1></div>
    <div class="desc-box">
    <div class="raiting-time-box">
    <p class="raiting-text">${k}</p>
    <ul class="star-list list">${E}</ul>
    <p class="time">${n} min</p>
    </div>
    <div class="ing-box">
    <ul class="ing-list list">${x}</ul>
    </div>
    <div class="tags-box">
    <ul class="tags-list list">${C}</ul>
    </div>
    </div>
    <p class="instruction">${m}</p>
    <button type="button" class="modal-close-btn js-modal-close">
    
     </button>
    <div class="button-block">
    <button class="btn add-to-favorite js-favorite-btn" type="button">Add to favorite</button>
    <button class="btn order-now js-rating" type="button">Give a rating</button>
    </div>
    </div>`,t}function _(e){const t=` <li class="item-star-icon">
        <button class="yellow-star"></button>
    </li>`,a=`<li class="item-star-icon" >
        <button class="gray-star"></button>
    </li>`,o=Math.round(e);let s=[];for(let n=0;n<5;n++)n+1>o?s.push(a):s.push(t);return s.join("")}function N(e){let t=e,a=t.indexOf("=");if(a!==-1)return t.substring(a+1)}function O(e,t,a){e||(t.classList.add("is-none"),a.classList.remove("is-none"))}function P(e){const t=JSON.parse(localStorage.getItem(r.LS_RECIPES))??[],a=t.find(({_id:s})=>s===e._id),o=t.findIndex(({_id:s})=>s===e._id);if(a){t.splice(o,1),localStorage.setItem(r.LS_RECIPES,JSON.stringify(t));let s="Add to favorite";return v.Notify.warning("The recipe removed from favorites"),s}else{t.push(e),localStorage.setItem(r.LS_RECIPES,JSON.stringify(t));let s="Remove";return v.Notify.success("The recipe is added to favorites"),s}}let i=JSON.parse(localStorage.getItem(r.LS_RECIPES))??[];const p=document.querySelector(".fav-empty"),l=document.querySelector(".fav-container"),y=document.querySelector(".fav-categories"),u=document.querySelector(".fav-static");T();function T(){if(i.length)p.classList.add("is-none"),g(),S(),H();else return}function S(){const e="category",t=i.map(s=>s[e]),o=[...new Set(t)];o.unshift("All categories"),B(o)}function B(e){y.innerHTML=J(e),document.querySelectorAll(".js-category-btn").forEach(a=>{a.addEventListener("click",function(o){const s=o.currentTarget.getAttribute("data-button");s==="All categories"?g():F(s)})})}function F(e){const t=i.filter(a=>a.category===e);l.innerHTML=b(t),L()}function J(e){return e.map(t=>`<button class="category-btn js-category-btn" data-button="${t}">${t}</button>`).join("")}function g(){l.innerHTML=b(i),L(),u.classList.contains("fav-phantom")&&(u.classList.remove("fav-phantom"),l.classList.remove("fav-style-reset"))}function H(){l.addEventListener("click",e=>{if(!e.target.classList.contains("js-add"))return;const t=e.target.dataset.id,a=i.findIndex(({_id:o})=>o===t);i.splice(a,1),localStorage.setItem(r.LS_RECIPES,JSON.stringify(i)),g(),S(),i.length||(p.classList.remove("is-none"),u.classList.add("fav-phantom"),l.classList.add("fav-style-reset"),y.innerHTML="")})}function L(){document.querySelectorAll(".js-add").forEach(t=>t.classList.add("liked"))}
