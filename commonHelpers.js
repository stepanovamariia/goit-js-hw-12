import{a as g,i as d,S as h}from"./assets/vendor-f736e62a.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();async function u(s,r){const a="https://pixabay.com/api/",n="42892988-1a177f86546a7a1e93a2f736f",e=new URLSearchParams({key:n,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:15});try{return(await g.get(`${a}?${e}`)).data}catch{throw new Error("Не удалось получить данные с Pixabay API")}}function y(s){return s.map(({webformatURL:r,largeImageURL:a,tags:n,likes:e,views:o,comments:i,downloads:m})=>`
  <a class="photo-card" href="${a}" alt="${n}"><img src="${r}" alt="${n}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span class="value">${e}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span class="value">${o}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><span class="value">${i}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span class="value">${m}</span>
    </p>
  </div>
</a>`).join("")}const t={form:document.querySelector(".search-form"),input:document.querySelector("input"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more"),loader:document.querySelector(".loader")};let f,c="",l=1,p=0;t.form.addEventListener("submit",b);t.loadMoreBtn.addEventListener("click",L);async function b(s){if(s.preventDefault(),c=t.input.value.toLowerCase(),!c||c.includes(" ")){t.gallery.innerHTML="",d.show({message:"Извините, нет изображений, соответствующих вашему запросу. Пожалуйста, попробуйте еще раз!",messageColor:"red"}),t.loader.style.display="none",t.loadMoreBtn.style.display="none";return}l=1,t.loader.style.display="block",t.gallery.innerHTML="",t.loadMoreBtn.style.display="none";let r;try{if(r=await u(c,l),p=r.totalHits,r.hits.length===0){t.loader.style.display="none",d.show({message:"Извините, нет изображений, соответствующих вашему запросу. Пожалуйста, попробуйте еще раз!",messageColor:"red"});return}}catch(n){console.log(n);return}t.loader.style.display="none";const a=y(r.hits);t.gallery.innerHTML=a,f=new h(".gallery a",{captionsData:"alt",captionDelay:250}),t.loadMoreBtn.style.display="block"}async function L(){l+=1,t.loader.style.display="block";let s;try{if(s=await u(c,l),s.hits.length===0||(l-1)*15>=p){t.loader.style.display="none",t.loadMoreBtn.style.display="none",d.show({message:"Мы извиняемся, но вы достигли конца результатов поиска.",messageColor:"red"});return}}catch(a){console.log(a);return}t.loader.style.display="none";const r=y(s.hits);t.gallery.insertAdjacentHTML("beforeend",r),f.refresh(),(l-1)*15+s.hits.length>=p&&(t.loadMoreBtn.style.display="none",d.show({message:"Мы извиняемся, но вы достигли конца результатов поиска.",messageColor:"red"}))}
//# sourceMappingURL=commonHelpers.js.map
