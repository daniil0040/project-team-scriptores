import{g as R,b as $,c as r,a as g,f as m,n as y}from"./scroll-up-439a8d56.js";const S=document.querySelector(".fav-container-js");S.addEventListener("click",A);function A(e){if(!e.target.classList.contains("btn-see-recipe-js"))return;const a=e.target.closest(".btn-see-recipe-js").dataset.id;M(a)}async function M(e){try{const t=await R(e);q(t)}catch(t){console.log(t)}}function q(e){const t=$.create(_(e));t.show();const a=document.querySelector(".js-modal-video"),o=document.querySelector(".js-modal-img");P(e.youtube,a,o);const s=document.querySelector(".js-favorite-btn");(JSON.parse(localStorage.getItem(r.LS_RECIPES))??[]).find(({_id:n})=>n===e._id)?s.textContent="Remove":s.textContent="Add to favorite",s.addEventListener("click",()=>{s.textContent=T(e);const n=JSON.parse(localStorage.getItem(r.LS_RECIPES));S.innerHTML=g(n),m(),v(),t.close(),location.reload(!0)}),document.querySelector(".js-modal-close").addEventListener("click",()=>t.close()),document.addEventListener("keydown",n=>{n.code==="Escape"&&(t.close(),document.removeEventListener("keydown"))})}function _(e){let t;const{thumb:a,title:o,rating:s,time:c,instructions:p,ingredients:b,tags:n,youtube:E}=e,C=s.toFixed(1),x=b.map(({name:d,measure:I})=>`<li class="ing-item">
    <p class="ing-name">${d}</p>
    <p class="ing-measure">${I}</p>
    </li>`).join("");let w=n.map(d=>`<li class="tags-item">
    <p class="tags-name">#${d}</p>
    </li>`).join(""),j=N(s);return t=`<div class="modal-box categories-block-modal"><div class="img-title-box"><iframe class="modal-img js-modal-video"  width="295" height="295" src="https://www.youtube.com/embed/${O(E)}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
     <img src="${a}" alt="${o}" class="modal-img js-modal-img is-none" id="fallback-image" width="295" height="295">
    <h1 class="modal-title">${o}</h1></div>
    <div class="desc-box">
    <div class="raiting-time-box">
    <p class="raiting-text">${C}</p>
    <ul class="star-list list">${j}</ul>
    <p class="time">${c} min</p>
    </div>
    <div class="ing-box">
    <ul class="ing-list list">${x}</ul>
    </div>
    <div class="tags-box">
    <ul class="tags-list list">${w}</ul>
    </div>
    </div>
    <p class="instruction">${p}</p>
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
    </li>`,o=Math.round(e);let s=[];for(let c=0;c<5;c++)c+1>o?s.push(a):s.push(t);return s.join("")}function O(e){let t=e,a=t.indexOf("=");if(a!==-1)return t.substring(a+1)}function P(e,t,a){e||(t.classList.add("is-none"),a.classList.remove("is-none"))}function T(e){const t=JSON.parse(localStorage.getItem(r.LS_RECIPES))??[],a=t.find(({_id:s})=>s===e._id),o=t.findIndex(({_id:s})=>s===e._id);if(a){t.splice(o,1),localStorage.setItem(r.LS_RECIPES,JSON.stringify(t));let s="Add to favorite";return y.Notify.warning("The recipe removed from favorites"),s}else{t.push(e),localStorage.setItem(r.LS_RECIPES,JSON.stringify(t));let s="Remove";return y.Notify.success("The recipe is added to favorites"),s}}let i=JSON.parse(localStorage.getItem(r.LS_RECIPES))??[];const L=document.querySelector(".fav-empty"),l=document.querySelector(".fav-container"),h=document.querySelector(".fav-categories"),u=document.querySelector(".fav-static");F();function F(){if(i.length)L.classList.add("is-none"),f(),k(),U();else return}function k(){const e="category",t=i.map(s=>s[e]),o=[...new Set(t)];o.unshift("All categories"),B(o)}function B(e){h.innerHTML=H(e),document.querySelectorAll(".js-category-btn").forEach(a=>{a.addEventListener("click",function(o){const s=o.currentTarget.getAttribute("data-button");s==="All categories"?f():J(s)})})}function J(e){const t=i.filter(a=>a.category===e);l.innerHTML=g(t),m(),v()}function H(e){return e.map(t=>`<button class="category-btn js-category-btn" data-button="${t}">${t}</button>`).join("")}function f(){l.innerHTML=g(i),m(),v(),u.classList.contains("fav-phantom")&&(u.classList.remove("fav-phantom"),l.classList.remove("fav-style-reset"))}function U(){l.addEventListener("click",e=>{if(!e.target.classList.contains("js-add"))return;const t=e.target.dataset.id,a=i.findIndex(({_id:o})=>o===t);i.splice(a,1),localStorage.setItem(r.LS_RECIPES,JSON.stringify(i)),f(),k(),i.length||(L.classList.remove("is-none"),u.classList.add("fav-phantom"),l.classList.add("fav-style-reset"),h.innerHTML="")})}function v(){document.querySelectorAll(".js-add").forEach(t=>t.classList.add("liked"))}
