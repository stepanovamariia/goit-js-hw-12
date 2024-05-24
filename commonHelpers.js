import{a as h,i as d,S as g}from"./assets/vendor-f736e62a.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();async function y(o,a){const s="https://pixabay.com/api/",n="42892988-1a177f86546a7a1e93a2f736f",e=new URLSearchParams({key:n,q:o,image_type:"photo",orientation:"horizontal",safesearch:"true",page:a,per_page:15});try{return(await h.get(`${s}?${e}`)).data}catch{throw new Error("Не удалось получить данные с Pixabay API")}}function p(o){return o.map(({webformatURL:a,largeImageURL:s,tags:n,likes:e,views:t,comments:i,downloads:m})=>`
  <a class="photo-card" href="${s}" alt="${n}"><img src="${a}" alt="${n}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span class="value">${e}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span class="value">${t}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><span class="value">${i}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span class="value">${m}</span>
    </p>
  </div>
</a>`).join("")}const r={form:document.querySelector(".search-form"),input:document.querySelector("input"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more"),loader:document.querySelector(".loader")};let f,c="",l=1,u=0;r.form.addEventListener("submit",b);r.loadMoreBtn.addEventListener("click",L);async function b(o){if(o.preventDefault(),c=r.input.value.toLowerCase(),!c||c.includes(" ")){r.gallery.innerHTML="",d.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"red"}),r.loader.style.display="none",r.loadMoreBtn.style.display="none";return}l=1,r.loader.style.display="block",r.gallery.innerHTML="",r.loadMoreBtn.style.display="none";let a;try{if(a=await y(c,l),u=a.totalHits,a.hits.length===0){r.loader.style.display="none",d.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"red"});return}}catch(n){console.log(n);return}r.loader.style.display="none";const s=p(a.hits);r.gallery.innerHTML=s,f=new g(".gallery a",{captionsData:"alt",captionDelay:250}),r.loadMoreBtn.style.display="block"}async function L(){l+=1,r.loader.style.display="block";let o;try{if(o=await y(c,l),o.hits.length===0||(l-1)*15>=u){r.loader.style.display="none",r.loadMoreBtn.style.display="none",d.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"red"});return}}catch(s){console.log(s);return}r.loader.style.display="none";const a=p(o.hits);r.gallery.insertAdjacentHTML("beforeend",a),f.refresh(),(l-1)*15+o.hits.length>=u&&(r.loadMoreBtn.style.display="none",d.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"red"}))}
//# sourceMappingURL=commonHelpers.js.map
