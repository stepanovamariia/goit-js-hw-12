import{a as h,i as d,S as g}from"./assets/vendor-f736e62a.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(r){if(r.ep)return;r.ep=!0;const t=s(r);fetch(r.href,t)}})();async function u(a,o){const s="https://pixabay.com/api/",l="42892988-1a177f86546a7a1e93a2f736f",r=new URLSearchParams({key:l,q:a,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:15});try{return(await h.get(`${s}?${r}`)).data}catch{throw new Error("Не удалось получить данные с Pixabay API")}}function p(a){return a.map(({webformatURL:o,largeImageURL:s,tags:l,likes:r,views:t,comments:i,downloads:m})=>`
  <a class="photo-card" href="${s}" alt="${l}"><img src="${o}" alt="${l}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span class="value">${r}</span>
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
</a>`).join("")}const e={form:document.querySelector(".search-form"),input:document.querySelector("input"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more"),loader:document.querySelector(".loader")};let f,c="",n=1,y=0;e.form.addEventListener("submit",b);e.loadMoreBtn.addEventListener("click",M);async function b(a){if(a.preventDefault(),c=e.input.value.toLowerCase(),!c||c.includes(" ")){e.gallery.innerHTML="",d.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"red"}),e.loader.style.display="none",e.loadMoreBtn.style.display="none";return}n=1,e.loader.style.display="block",e.gallery.innerHTML="",e.loadMoreBtn.style.display="none";let o;try{if(o=await u(c,n),y=o.totalHits,o.hits.length===0){e.loader.style.display="none",d.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"red"});return}}catch(l){console.log(l);return}e.loader.style.display="none";const s=p(o.hits);e.gallery.innerHTML=s,f=new g(".gallery a",{captionsData:"alt",captionDelay:250}),e.loadMoreBtn.style.display="block"}async function M(){e.loadMoreBtn.style.display="none",e.loader.style.display="block",n+=1;let a;try{if(a=await u(c,n),a.hits.length===0||(n-1)*15>=y){e.loader.style.display="none",e.loadMoreBtn.style.display="none",d.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"red"});return}}catch(s){console.log(s),e.loader.style.display="none",e.loadMoreBtn.style.display="block";return}e.loader.style.display="none";const o=p(a.hits);e.gallery.insertAdjacentHTML("beforeend",o),f.refresh(),(n-1)*15+a.hits.length>=y?(e.loadMoreBtn.style.display="none",d.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"red"})):e.loadMoreBtn.style.display="block"}
//# sourceMappingURL=commonHelpers.js.map
