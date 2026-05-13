import React from 'react';

const script = `
(function(){
  const LS='lj_revista_imagens';
  const get=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d));}catch(e){return d;}};
  const set=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const esc=(v)=>String(v||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;');
  function ensureStyles(){if(document.getElementById('revista-images-render-style'))return;const s=document.createElement('style');s.id='revista-images-render-style';s.textContent='.manualRevistaImg{width:100%;height:54mm;object-fit:cover;border-radius:8mm;border:1px solid #d6d3c3;margin:5mm 0}.manualRevistaCaption{font-size:8.8pt;color:#65758b;margin-top:-2mm}.manualGallery{display:grid;grid-template-columns:1fr 1fr;gap:6mm}.manualGallery figure{margin:0}.manualGallery img{width:100%;height:42mm;object-fit:cover;border-radius:7mm;border:1px solid #d6d3c3}.manualGallery figcaption{font-size:8.5pt;color:#65758b;margin-top:2mm}@media(max-width:620px){.manualGallery{grid-template-columns:1fr}.manualGallery img,.manualRevistaImg{height:190px}}';document.head.appendChild(s);}
  async function load(){try{const r=await fetch('/api/revista-imagens',{cache:'no-store'});const j=await r.json();if(j&&j.ok&&Array.isArray(j.data)){const arr=j.data.map(x=>[x.secao||'',x.titulo||'',x.imagem_url||'',x.legenda||'',x.credito||'',x.ordem||100,x.id||'']);set(LS,arr);return arr;}}catch(e){}return get(LS,[]);}
  function bySecao(data,secao){return data.filter(x=>x[0]===secao).sort((a,b)=>Number(a[5]||100)-Number(b[5]||100));}
  function imageHtml(item){return '<img class="manualRevistaImg" src="'+esc(item[2])+'" alt="'+esc(item[1]||item[3]||'Imagem da revista')+'"><p class="manualRevistaCaption">'+esc(item[3]||item[1]||'')+(item[4]?' · '+esc(item[4]):'')+'</p>';}
  function insertAfterTitle(page,item){if(!page||!item)return;const h2=page.querySelector('h2');if(!h2)return;const old=page.querySelector('.manualRevistaImg');if(old)return;const wrap=document.createElement('div');wrap.innerHTML=imageHtml(item);let ref=h2.nextSibling;while(ref&&ref.nodeType===3)ref=ref.nextSibling;h2.after(wrap);}
  function fillPhotoBoxes(page,items){if(!page||!items.length)return;const boxes=Array.from(page.querySelectorAll('.photoBox'));boxes.forEach((box,i)=>{const item=items[i];if(!item)return;box.outerHTML='<figure class="photoBox" style="padding:0;overflow:hidden;display:block"><img src="'+esc(item[2])+'" alt="'+esc(item[1]||item[3]||'Imagem')+'" style="width:100%;height:100%;min-height:54mm;object-fit:cover"><figcaption style="padding:3mm;color:#65758b;font-size:9pt">'+esc(item[3]||item[1]||'')+'</figcaption></figure>';});}
  function galleryHtml(items){return '<div class="manualGallery">'+items.map(item=>'<figure><img src="'+esc(item[2])+'" alt="'+esc(item[1]||item[3]||'Imagem')+'"><figcaption>'+esc(item[3]||item[1]||'')+(item[4]?' · '+esc(item[4]):'')+'</figcaption></figure>').join('')+'</div>';}
  async function patch(){if(!location.pathname.startsWith('/revista'))return;ensureStyles();const data=await load();if(!data.length)return;const pages=Array.from(document.querySelectorAll('.magPage'));
    const lcif=pages.find(p=>(p.textContent||'').includes('A Fundação que amplia o servir'));insertAfterTitle(lcif,bySecao(data,'lcif')[0]);
    const la4=pages.find(p=>(p.textContent||'').includes('Ceará dentro do movimento mundial'));fillPhotoBoxes(la4,[...bySecao(data,'la4'),...bySecao(data,'dmla')]);
    const presidencia=pages.find(p=>(p.textContent||'').includes('Espaço da Presidência'));fillPhotoBoxes(presidencia,bySecao(data,'presidencia'));
    const galeria=pages.find(p=>(p.textContent||'').includes('Galeria e agenda'));const gal=bySecao(data,'galeria').concat(bySecao(data,'juazeiro')).slice(0,8);if(galeria&&gal.length){Array.from(galeria.querySelectorAll('.photoBox')).forEach(x=>x.remove());const footer=galeria.querySelector('.pageFooter');const wrap=document.createElement('div');wrap.innerHTML=galleryHtml(gal);galeria.insertBefore(wrap,footer||null);}
    const cover=pages.find(p=>p.classList.contains('coverPage'));const coverImg=bySecao(data,'capa')[0];if(cover&&coverImg&&!cover.querySelector('.manualCoverBg')){const img=document.createElement('img');img.className='manualCoverBg';img.src=coverImg[2];img.alt='Capa';img.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.22;mix-blend-mode:screen';cover.prepend(img);}  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',patch);else patch();setTimeout(patch,900);setTimeout(patch,2200);
})();
`;

export default function RevistaImagesRenderPatch(){return React.createElement('script',{dangerouslySetInnerHTML:{__html:script}});}
