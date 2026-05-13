import React from 'react';

const script = `
(function(){
  const LS='lj_revista_imagens';
  const sections=[
    ['capa','Capa da revista'],
    ['presidencia','Mensagem da Presidência'],
    ['lcif','LCIF'],
    ['dmla','Distrito Múltiplo LA'],
    ['la4','Distrito LA-4'],
    ['juazeiro','Juazeiro / Comunidade'],
    ['campanhas','Campanhas locais'],
    ['galeria','Galeria da revista'],
    ['contracapa','Contracapa']
  ];
  const get=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d));}catch(e){return d;}};
  const set=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const esc=(v)=>String(v||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;');
  const toast=(m)=>{let t=document.getElementById('toast');if(t){t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2300);}};
  const label=(sec)=>{const x=sections.find(s=>s[0]===sec);return x?x[1]:sec;};
  function ensureStyles(){if(document.getElementById('admin-revista-images-style'))return;const s=document.createElement('style');s.id='admin-revista-images-style';s.textContent='.revImgThumb{width:82px;height:58px;object-fit:cover;border-radius:10px;border:1px solid #d9e2ef;background:#f8fbff}.revImgTable td{vertical-align:middle}.revImgHint{background:#eef5ff;border:1px solid #bcd3ff;color:#00338d;border-radius:16px;padding:12px;margin:0 0 16px;font-weight:800}@media(max-width:760px){.revImgTable,.revImgTable tbody,.revImgTable tr,.revImgTable td{display:block;width:100%}.revImgTable tr{border-bottom:1px solid #d9e2ef;padding:10px 0}.revImgThumb{width:100%;height:170px}}';document.head.appendChild(s);}
  function fromDb(x){return [x.secao||'',x.titulo||'',x.imagem_url||'',x.legenda||'',x.credito||'',x.ordem||100,x.id||''];}
  function toDb(r){return {secao:r[0]||'',titulo:r[1]||'',imagem_url:r[2]||'',legenda:r[3]||'',credito:r[4]||'',ordem:Number(r[5]||100),id:r[6]||undefined,edicao_id:'al-2025-2026-001',ativo:true};}
  async function loadImages(){try{const res=await fetch('/api/revista-imagens',{cache:'no-store'});const j=await res.json();if(j&&j.ok&&j.configured!==false&&Array.isArray(j.data)){set(LS,j.data.map(fromDb));return true;}}catch(e){}return false;}
  async function saveImage(values){try{const res=await fetch('/api/revista-imagens',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(toDb(values))});const j=await res.json();if(j&&j.ok){await loadImages();toast(values[6]?'Imagem salva no banco':'Imagem adicionada ao banco');return true;}toast('Tabela revista_imagens não configurada; salvo localmente');}catch(e){toast('Banco indisponível; salvo localmente');}return false;}
  async function delImage(values,index){if(values[6]){try{const res=await fetch('/api/revista-imagens?id='+encodeURIComponent(values[6]),{method:'DELETE'});const j=await res.json();if(j&&j.ok){await loadImages();toast('Imagem excluída do banco');return true;}}catch(e){}}
    const data=get(LS,[]);data.splice(index,1);set(LS,data);return false;
  }
  function row(r,i,editing){
    if(editing){return '<tr data-row="'+i+'"><td><select data-field="0">'+sections.map(s=>'<option value="'+s[0]+'" '+(r[0]===s[0]?'selected':'')+'>'+s[1]+'</option>').join('')+'</select></td><td><input data-field="1" value="'+esc(r[1])+'"></td><td><input data-field="2" value="'+esc(r[2])+'"></td><td><input data-field="3" value="'+esc(r[3])+'"></td><td><input data-field="4" value="'+esc(r[4])+'"></td><td><input data-field="5" type="number" value="'+esc(r[5]||100)+'"></td><td style="display:none"><input data-field="6" value="'+esc(r[6]||'')+'"></td><td><button data-risave="'+i+'">Salvar</button> <button data-ricancel="'+i+'">Cancelar</button></td></tr>';}
    return '<tr data-row="'+i+'"><td><img class="revImgThumb" src="'+esc(r[2])+'" alt=""></td><td><b>'+esc(label(r[0]))+'</b><br><span>'+esc(r[1])+'</span></td><td>'+esc(r[3])+'</td><td>'+esc(r[4])+'</td><td>'+esc(r[5])+'</td><td><button data-riedit="'+i+'">Editar</button> <button data-ridel="'+i+'">Excluir</button></td></tr>';
  }
  function bind(){const m=document.getElementById('adminMain');if(!m)return;m.querySelectorAll('[data-riedit]').forEach(b=>b.onclick=()=>{const data=get(LS,[]),i=+b.dataset.riedit;const tr=m.querySelector('tr[data-row="'+i+'"]');if(tr){tr.outerHTML=row(data[i]||[],i,true);bind();}});m.querySelectorAll('[data-ricancel]').forEach(b=>b.onclick=()=>render());m.querySelectorAll('[data-risave]').forEach(b=>b.onclick=async()=>{const data=get(LS,[]),i=+b.dataset.risave;const tr=m.querySelector('tr[data-row="'+i+'"]');const values=Array.from(tr.querySelectorAll('[data-field]')).sort((a,b)=>Number(a.dataset.field)-Number(b.dataset.field)).map(x=>x.value);const ok=await saveImage(values);if(!ok){data[i]=values;set(LS,data);}render();});m.querySelectorAll('[data-ridel]').forEach(b=>b.onclick=async()=>{const data=get(LS,[]),i=+b.dataset.ridel;await delImage(data[i]||[],i);render();});}
  async function render(){const m=document.getElementById('adminMain');if(!m)return;ensureStyles();const data=get(LS,[]);m.innerHTML='<h2>Imagens da revista <span class="dbBadge">banco compartilhado</span></h2><p class="revImgHint">Use links diretos das imagens. Cada seção alimenta a respectiva página da revista: capa, LCIF, Distrito Múltiplo, Distrito LA-4, comunidade, campanhas e galeria.</p><form id="revImgForm" class="form"><label>Seção<select name="secao">'+sections.map(s=>'<option value="'+s[0]+'">'+s[1]+'</option>').join('')+'</select></label><label>Título<input name="titulo" placeholder="Ex.: Visita ao Distrito LA-4"></label><label>URL direta da imagem<input name="url" required placeholder="https://i.ibb.co/.../foto.jpg"></label><label>Legenda<input name="legenda" placeholder="Descrição curta da imagem"></label><label>Crédito<input name="credito" placeholder="Foto: Lions Clube Juazeiro"></label><label>Ordem<input name="ordem" type="number" value="100"></label><button>Adicionar imagem</button></form><table class="table revImgTable"><tbody>'+data.map((r,i)=>row(r,i,false)).join('')+'</tbody></table>';
    document.getElementById('revImgForm').onsubmit=async(e)=>{e.preventDefault();const f=new FormData(e.target);const values=[f.get('secao'),f.get('titulo'),f.get('url'),f.get('legenda'),f.get('credito'),f.get('ordem'),''];const ok=await saveImage(values);if(!ok){const data=get(LS,[]);data.unshift(values);set(LS,data);}e.target.reset();render();};bind();}
  const oldTab=window.tab;
  window.tab=function(t){if(t==='revistaImages'){loadImages().then(render);return;}if(typeof oldTab==='function')return oldTab(t);};
  function addButton(){const aside=document.querySelector('#adminApp aside');if(!aside||aside.querySelector('[data-tab="revistaImages"]'))return;const btn=document.createElement('button');btn.dataset.tab='revistaImages';btn.textContent='Imagens da revista';const exportBtn=aside.querySelector('[data-tab="export"]');if(exportBtn)aside.insertBefore(btn,exportBtn);else aside.appendChild(btn);btn.onclick=()=>window.tab('revistaImages');}
  function boot(){addButton();loadImages();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();setTimeout(boot,700);setTimeout(boot,1800);
})();
`;

export default function AdminRevistaImagesPatch(){return React.createElement('script',{dangerouslySetInnerHTML:{__html:script}});}
