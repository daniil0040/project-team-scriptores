import{g as I,b as $,c as r,n as v,a as b,f as p}from"./scroll-up-37f93111.js";const A=document.querySelector(".fav-container-js");A.addEventListener("click",R);function R(e){if(!e.target.classList.contains("btn-see-recipe-js"))return;const a=e.target.closest(".btn-see-recipe-js").dataset.id;M(a)}async function M(e){try{const t=await I(e);q(t)}catch(t){console.log(t)}}function q(e){const t=$.create(_(e));t.show();const a=document.querySelector(".js-modal-video"),o=document.querySelector(".js-modal-img");P(e.youtube,a,o);const s=document.querySelector(".js-favorite-btn");(JSON.parse(localStorage.getItem(r.LS_RECIPES))??[]).find(({_id:c})=>c===e._id)?s.textContent="Remove":s.textContent="Add to favorite",s.addEventListener("click",()=>s.textContent=T(e)),document.querySelector(".js-modal-close").addEventListener("click",()=>t.close()),document.addEventListener("keydown",c=>{c.code==="Escape"&&t.close()})}function _(e){let t;const{thumb:a,title:o,rating:s,time:n,instructions:m,ingredients:f,tags:c,youtube:k}=e,x=s.toFixed(1),C=f.map(({name:d,measure:j})=>`<li class="ing-item">
    <p class="ing-name">${d}</p>
    <p class="ing-measure">${j}</p>
    </li>`).join("");let E=c.map(d=>`<li class="tags-item">
    <p class="tags-name">#${d}</p>
    </li>`).join(""),w=N(s);return t=`<div class="modal-box categories-block-modal"><div class="img-title-box"><iframe class="modal-img js-modal-video"  width="295" height="295" src="https://www.youtube.com/embed/${O(k)}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
     <img src="${a}" alt="${o}" class="modal-img js-modal-img is-none" id="fallback-image" width="295" height="295">
    <h1 class="modal-title">${o}</h1></div>
    <div class="desc-box">
    <div class="raiting-time-box">
    <p class="raiting-text">${x}</p>
    <ul class="star-list list">${w}</ul>
    <p class="time">${n} min</p>
    </div>
    <div class="ing-box">
    <ul class="ing-list list">${C}</ul>
    </div>
    <div class="tags-box">
    <ul class="tags-list list">${E}</ul>
    </div>
    </div>
    <p class="instruction">${m}</p>
    <button type="button" class="modal-close-btn js-modal-close">
    
     </button>
    <div class="button-block">
    <button class="btn add-to-favorite js-favorite-btn" type="button">Add to favorite</button>
    <button class="btn order-now js-rating" type="button">Give a rating</button>
    </div>
    </div>`,t}function N(e){const t=` <li class="item-star-icon">
        <button class="yellow-star"></button>
    </li>`,a=`<li class="item-star-icon" >
        <button class="gray-star"></button>
    </li>`,o=Math.round(e);let s=[];for(let n=0;n<5;n++)n+1>o?s.push(a):s.push(t);return s.join("")}function O(e){let t=e,a=t.indexOf("=");if(a!==-1)return t.substring(a+1)}function P(e,t,a){e||(t.classList.add("is-none"),a.classList.remove("is-none"))}function T(e){const t=JSON.parse(localStorage.getItem(r.LS_RECIPES))??[],a=t.find(({_id:s})=>s===e._id),o=t.findIndex(({_id:s})=>s===e._id);if(a){t.splice(o,1),localStorage.setItem(r.LS_RECIPES,JSON.stringify(t));let s="Add to favorite";return v.Notify.warning("The recipe removed from favorites"),s}else{t.push(e),localStorage.setItem(r.LS_RECIPES,JSON.stringify(t));let s="Remove";return v.Notify.success("The recipe is added to favorites"),s}}let i=JSON.parse(localStorage.getItem(r.LS_RECIPES))??[];const y=document.querySelector(".fav-empty"),l=document.querySelector(".fav-container"),S=document.querySelector(".fav-categories"),u=document.querySelector(".fav-static");B();function B(){if(i.length)y.classList.add("is-none"),g(),L(),U();else return}function L(){const e="category",t=i.map(s=>s[e]),o=[...new Set(t)];o.unshift("All categories"),F(o)}function F(e){S.innerHTML=H(e),document.querySelectorAll(".js-category-btn").forEach(a=>{a.addEventListener("click",function(o){const s=o.currentTarget.getAttribute("data-button");s==="All categories"?g():J(s)})})}function J(e){const t=i.filter(a=>a.category===e);l.innerHTML=b(t),p(),h()}function H(e){return e.map(t=>`<button class="category-btn js-category-btn" data-button="${t}">${t}</button>`).join("")}function g(){l.innerHTML=b(i),p(),h(),u.classList.contains("fav-phantom")&&(u.classList.remove("fav-phantom"),l.classList.remove("fav-style-reset"))}function U(){l.addEventListener("click",e=>{if(!e.target.classList.contains("js-add"))return;const t=e.target.dataset.id,a=i.findIndex(({_id:o})=>o===t);i.splice(a,1),localStorage.setItem(r.LS_RECIPES,JSON.stringify(i)),g(),L(),i.length||(y.classList.remove("is-none"),u.classList.add("fav-phantom"),l.classList.add("fav-style-reset"),S.innerHTML="")})}function h(){document.querySelectorAll(".js-add").forEach(t=>t.classList.add("liked"))}
