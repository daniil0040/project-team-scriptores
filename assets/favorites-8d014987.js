import{c as l,a as d}from"./all-categ-cards-6b7c0894.js";let a=JSON.parse(localStorage.getItem(l.LS_RECIPES))??[];const u=document.querySelector(".fav-empty"),s=document.querySelector(".fav-container"),f=document.querySelector(".fav-categories"),c=document.querySelector(".fav-static");m();function m(){if(a.length)u.classList.add("is-none"),i(),g(),S();else return}function g(){const t="category",e=a.map(o=>o[t]),n=[...new Set(e)];n.unshift("All categories"),v(n)}function v(t){f.innerHTML=L(t),document.querySelectorAll(".js-category-btn").forEach(r=>{r.addEventListener("click",function(n){const o=n.currentTarget.getAttribute("data-button");o==="All categories"?i():y(o)})})}function y(t){const e=a.filter(r=>r.category===t);s.innerHTML=d(e)}function L(t){return t.map(e=>`<button class="category-btn js-category-btn" data-button="${e}">${e}</button>`).join("")}function i(){s.innerHTML=d(a),c.classList.contains("fav-phantom")&&(c.classList.remove("fav-phantom"),s.classList.remove("fav-style-reset"))}function S(){s.addEventListener("click",t=>{if(!t.target.classList.contains("js-add"))return;const e=t.target.dataset.id,r=a.findIndex(({_id:n})=>n===e);a.splice(r,1),localStorage.setItem(l.LS_RECIPES,JSON.stringify(a)),i(),g(),a.length||(u.classList.remove("is-none"),c.classList.add("fav-phantom"),s.classList.add("fav-style-reset"),f.classList.add("is-none"))})}
