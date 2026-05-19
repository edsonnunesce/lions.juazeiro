import React from 'react';

const script = `
(function(){
  const LS='lj_revista_imagens';
  const get=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d));}catch(e){return d;}};
  const set=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const esc=(v)=>String(v||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;');
  function ensureStyles(){
    let s=document.getElementById('revista-images-render-style');
    if(!s){s=document.createElement('style');s.id='revista-images-render-style';document.head.appendChild(s);}
    s.textContent='.manualRevistaBlock{margin:5mm 0}.manualRevistaImg{width:100%;aspect-ratio:1/1;height:auto;object-fit:cover;border-radius:8mm;border:1px solid #d6d3c3;display:block;background:#f8fbff}.manualRevistaCaption{font-size:8.8pt;color:#65758b;margin:2mm 0 0}.manualGallery{display:grid;grid-template-columns:1fr 1fr;gap:6mm}.manualGallery figure{margin:0}.manualGallery img{width:100%;aspect-ratio:1/1;height:auto;object-fit:cover;border-radius:7mm;border:1px solid #d6d3c3;display:block;background:#f8fbff}.manualGallery figcaption{font-size:8.5pt;color:#65758b;margin-top:2mm}.manualPhotoBox{padding:0!important;overflow:hidden!important;display:block!important;aspect-ratio:1/1!important;min-height:0!important}.manualPhotoBox img{width:100%;aspect-ratio:1/1;height:auto;object-fit:cover;display:block}.manualPhotoBox figcaption{padding:3mm;color:#65758b;font-size:9pt}@media(max-width:620px){.manualGallery{grid-template-columns:1fr}}';
  }
  async function load(){try{const r=await fetch('/api/revista-imagens',{cache:'no-store'});const j=await r.json();if(j&&j.ok&&Array.isArray(j.data)){const arr=j.data.map(x=>[x.secao||'',x.titulo||'',x.imagem_url||'',x.legenda||'',x.credito||'',x.ordem||100,x.id||'']);set(LS,arr);return arr;}}catch(e){}return get(LS,[]);}
  function bySecao(data,secao){return data.filter(x=>x[0]===secao).sort((a,b)=>Number(a[5]||100)-Number(b[5]||100));}
  function pageByNumber(n){return document.querySelector('.magPage[data-page="'+n+'"]');}
  function imageHtml(item){return '<div class="manualRevistaBlock"><img class="manualRevistaImg" src="'+esc(item[2])+'" alt="'+esc(item[1]||item[3]||'Imagem da revista')+'"><p class="manualRevistaCaption">'+esc(item[3]||item[1]||'')+(item[4]?' · '+esc(item[4]):'')+'</p></div>';}
  function insertAfterTitle(page,item){if(!page||!item)return;const h2=page.querySelector('h2');if(!h2)return;page.querySelectorAll('.manualRevistaBlock').forEach(x=>x.remove());const wrap=document.createElement('div');wrap.innerHTML=imageHtml(item);h2.after(wrap.firstChild);}
  function fillPhotoBoxes(page,items){if(!page||!items.length)return;const boxes=Array.from(page.querySelectorAll('.photoBox'));boxes.forEach((box,i)=>{const item=items[i];if(!item)return;box.outerHTML='<figure class="photoBox manualPhotoBox"><img src="'+esc(item[2])+'" alt="'+esc(item[1]||item[3]||'Imagem')+'"><figcaption>'+esc(item[3]||item[1]||'')+'</figcaption></figure>';});}
  function galleryHtml(items){return '<div class="manualGallery">'+items.map(item=>'<figure><img src="'+esc(item[2])+'" alt="'+esc(item[1]||item[3]||'Imagem')+'"><figcaption>'+esc(item[3]||item[1]||'')+(item[4]?' · '+esc(item[4]):'')+'</figcaption></figure>').join('')+'</div>';}
  async function patch(){
    if(!location.pathname.startsWith('/revista'))return;
    ensureStyles();
    const data=await load();
    document.querySelectorAll('.manualGallery,.manualRevistaBlock').forEach(x=>x.remove());
    if(!data.length)return;
    insertAfterTitle(pageByNumber('06'),bySecao(data,'lcif')[0]);
    fillPhotoBoxes(pageByNumber('05'),bySecao(data,'presidencia'));
    fillPhotoBoxes(pageByNumber('08'),[...bySecao(data,'la4'),...bySecao(data,'dmla')]);
    const galeria=pageByNumber('10');
    const gal=bySecao(data,'galeria').concat(bySecao(data,'juazeiro')).slice(0,8);
    if(galeria&&gal.length){Array.from(galeria.querySelectorAll('.photoBox')).forEach(x=>x.remove());const footer=galeria.querySelector('.pageFooter');const wrap=document.createElement('div');wrap.innerHTML=galleryHtml(gal);galeria.insertBefore(wrap.firstChild,footer||null);}
    const cover=document.querySelector('.coverPage');const coverImg=bySecao(data,'capa')[0];if(cover&&coverImg&&!cover.querySelector('.manualCoverBg')){const img=document.createElement('img');img.className='manualCoverBg';img.src=coverImg[2];img.alt='Capa';img.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.22;mix-blend-mode:screen';cover.prepend(img);}  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',patch);else patch();setTimeout(patch,900);setTimeout(patch,2200);
})();
`;

export default function RevistaImagesRenderPatch(){return React.createElement('script',{dangerouslySetInnerHTML:{__html:script}});}
