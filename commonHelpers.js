import{a as g,S as b,i as d}from"./assets/vendor-f736e62a.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function a(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(r){if(r.ep)return;r.ep=!0;const t=a(r);fetch(r.href,t)}})();async function u(s,o){const a="https://pixabay.com/api/",l="42892988-1a177f86546a7a1e93a2f736f",r=new URLSearchParams({key:l,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:15});try{return(await g.get(`${a}?${r}`)).data}catch{throw new Error("Не удалось получить данные с Pixabay API")}}function p(s){return s.map(({webformatURL:o,largeImageURL:a,tags:l,likes:r,views:t,comments:i,downloads:h})=>`
  <a class="photo-card" href="${a}" alt="${l}"><img src="${o}" alt="${l}" loading="lazy" />
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
      <b>Downloads</b><span class="value">${h}</span>
    </p>
  </div>
</a>`).join("")}const e={form:document.querySelector(".search-form"),input:document.querySelector("input"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more"),loader:document.querySelector(".loader")},m=new b(".gallery a",{captionsData:"alt",captionDelay:250});let c="",n=1,y=0;e.form.addEventListener("submit",M);e.loadMoreBtn.addEventListener("click",w);async function M(s){if(s.preventDefault(),c=e.input.value.toLowerCase(),!c){e.gallery.innerHTML="",d.show({message:"Enter your request!",messageColor:"red"}),e.loader.style.display="none",e.loadMoreBtn.style.display="none";return}if(c.includes(" ")){e.gallery.innerHTML="",d.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"red"}),e.loader.style.display="none",e.loadMoreBtn.style.display="none";return}n=1,e.loader.style.display="block",e.gallery.innerHTML="",e.loadMoreBtn.style.display="none";let o;try{if(o=await u(c,n),y=o.totalHits,o.hits.length===0){e.loader.style.display="none",d.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"red"});return}}catch(l){console.log(l);return}e.loader.style.display="none";const a=p(o.hits);e.gallery.innerHTML=a,m.refresh(),e.loadMoreBtn.style.display="block",f()}async function w(){e.loadMoreBtn.style.display="none",e.loader.style.display="block",n+=1;let s;try{if(s=await u(c,n),s.hits.length===0||(n-1)*15>=y){e.loader.style.display="none",e.loadMoreBtn.style.display="none",d.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"red"});return}}catch(a){console.log(a),e.loader.style.display="none",e.loadMoreBtn.style.display="block";return}e.loader.style.display="none";const o=p(s.hits);e.gallery.insertAdjacentHTML("beforeend",o),m.refresh(),(n-1)*15+s.hits.length>=y?(e.loadMoreBtn.style.display="none",d.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"red"})):e.loadMoreBtn.style.display="block",f()}function f(){const{height:s}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map