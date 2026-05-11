import React from 'react';

const script = `
(function(){
  const esc=(v)=>String(v||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;');
  const toast=(m)=>{let t=document.getElementById('toast');if(t){t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400);}};
  const get=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d));}catch(e){return d;}};
  const set=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const roles={owner:'Administrador Geral',comunicacao:'Diretor de Comunicação e Marketing',campanhas:'Editor de Campanhas',diretoria:'Diretoria',leitura:'Leitura'};

  function directorFromDb(x){return [x.cargo||'',x.nome||'',x.funcao||'',x.id||'',x.periodo_al||'',x.foto_url||'',x.ordem||100];}
  function directorToDb(r){return {cargo:r[0]||'',nome:r[1]||'',funcao:r[2]||'',id:r[3]||undefined,periodo_al:r[4]||'AL 2026/2027',foto_url:r[5]||'',ordem:Number(r[6]||100),ativo:true};}
  function userFromDb(x){return [x.nome||'',x.email||'',x.senha_temporaria||'',x.perfil||'campanhas',x.id||''];}
  function userToDb(r){return {nome:r[0]||'',email:r[1]||'',senha_temporaria:r[2]||'temporaria123',perfil:r[3]||'campanhas',id:r[4]||undefined,ativo:true};}

  function renderDirectorsPublic(){
    const data=get('lj_directors',[]);
    const grid=document.getElementById('directorGrid');
    if(grid)grid.innerHTML=data.map(d=>'<article><div class="avatar">'+esc((d[0]||'L')[0])+'</div><h2>'+esc(d[0])+'</h2><p><b>'+esc(d[1])+'</b></p><p>'+esc(d[2])+'</p></article>').join('');
  }

  async function loadDirectors(){
    try{const r=await fetch('/api/diretoria',{cache:'no-store'});const j=await r.json();if(j&&j.ok&&j.configured!==false&&Array.isArray(j.data)){set('lj_directors',j.data.map(directorFromDb));renderDirectorsPublic();return true;}}
    catch(e){}
    renderDirectorsPublic();return false;
  }
  async function saveDirector(values){
    try{const r=await fetch('/api/diretoria',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(directorToDb(values))});const j=await r.json();if(j&&j.ok){await loadDirectors();toast(values[3]?'Diretoria salva no banco':'Diretoria adicionada ao banco');return true;}toast('Tabela diretoria ainda não configurada; salvo localmente');}
    catch(e){toast('Banco indisponível; salvo localmente');}
    return false;
  }
  async function deleteDirector(values,index){
    if(values[3]){try{const r=await fetch('/api/diretoria?id='+encodeURIComponent(values[3]),{method:'DELETE'});const j=await r.json();if(j&&j.ok){await loadDirectors();toast('Diretoria excluída do banco');return true;}}catch(e){}}
    const data=get('lj_directors',[]);data.splice(index,1);set('lj_directors',data);renderDirectorsPublic();renderDirectorsAdmin();return false;
  }

  function dirRow(r,i,editing){
    const labels=['Cargo','Responsável','Função','ID','Período AL','Foto URL','Ordem'];
    if(editing)return '<tr data-row="'+i+'">'+labels.map((l,idx)=>idx===3?'<td style="display:none"><input data-field="3" value="'+esc(r[3]||'')+'"></td>':'<td><label style="display:block;font-weight:800;color:#00338d;font-size:.78rem">'+l+'<input data-field="'+idx+'" value="'+esc(r[idx]||'')+'" style="width:100%;min-width:130px;border:1px solid #d9e2ef;border-radius:10px;padding:9px;margin-top:4px;font:inherit"></label></td>').join('')+'<td><button data-dsave="'+i+'">Salvar</button> <button data-dcancel="'+i+'">Cancelar</button></td></tr>';
    return '<tr data-row="'+i+'"><td>'+esc(r[0])+'</td><td>'+esc(r[1])+'</td><td>'+esc(r[2])+'</td><td>'+(r[4]?esc(r[4]):'')+'</td><td><button data-dedit="'+i+'">Editar</button> <button data-ddel="'+i+'">Excluir</button></td></tr>';
  }
  function bindDirectorRows(){
    const m=document.getElementById('adminMain');if(!m)return;
    m.querySelectorAll('[data-dedit]').forEach(b=>b.onclick=()=>{const data=get('lj_directors',[]),i=+b.dataset.dedit;const tr=m.querySelector('tr[data-row="'+i+'"]');if(tr){tr.outerHTML=dirRow(data[i]||[],i,true);bindDirectorRows();}});
    m.querySelectorAll('[data-dcancel]').forEach(b=>b.onclick=()=>renderDirectorsAdmin());
    m.querySelectorAll('[data-dsave]').forEach(b=>b.onclick=async()=>{const data=get('lj_directors',[]),i=+b.dataset.dsave;const tr=m.querySelector('tr[data-row="'+i+'"]');const values=Array.from(tr.querySelectorAll('input[data-field]')).sort((a,b)=>Number(a.dataset.field)-Number(b.dataset.field)).map(x=>x.value);const ok=await saveDirector(values);if(!ok){data[i]=values;set('lj_directors',data);renderDirectorsPublic();}renderDirectorsAdmin();});
    m.querySelectorAll('[data-ddel]').forEach(b=>b.onclick=async()=>{const data=get('lj_directors',[]),i=+b.dataset.ddel;await deleteDirector(data[i]||[],i);});
  }
  function renderDirectorsAdmin(){
    const m=document.getElementById('adminMain');if(!m)return;const data=get('lj_directors',[]);
    m.innerHTML='<h2>Diretoria <span class="dbBadge">banco compartilhado</span></h2><form id="dirDbForm" class="form"><label>Cargo<input name="cargo" required></label><label>Responsável<input name="nome" required></label><label>Função<input name="funcao"></label><label>Período AL<input name="periodo" value="AL 2026/2027"></label><label>Foto URL<input name="foto"></label><label>Ordem<input name="ordem" type="number" value="100"></label><button>Adicionar</button></form><table class="table adminEditableTable"><tbody>'+data.map((r,i)=>dirRow(r,i,false)).join('')+'</tbody></table>';
    document.getElementById('dirDbForm').onsubmit=async(e)=>{e.preventDefault();const f=new FormData(e.target);const values=[f.get('cargo'),f.get('nome'),f.get('funcao'),' ',f.get('periodo'),f.get('foto'),f.get('ordem')];values[3]='';const ok=await saveDirector(values);if(!ok){const data=get('lj_directors',[]);data.unshift(values);set('lj_directors',data);renderDirectorsPublic();}e.target.reset();renderDirectorsAdmin();};
    bindDirectorRows();
  }

  async function loadUsers(){
    try{const r=await fetch('/api/usuarios',{cache:'no-store'});const j=await r.json();if(j&&j.ok&&j.configured!==false&&Array.isArray(j.data)){set('lj_users_db',j.data.map(userFromDb));return true;}}
    catch(e){}return false;
  }
  async function saveUser(values){
    try{const r=await fetch('/api/usuarios',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(userToDb(values))});const j=await r.json();if(j&&j.ok){await loadUsers();toast(values[4]?'Usuário salvo no banco':'Usuário criado no banco');return true;}toast('Tabela usuários ainda não configurada; salvo localmente');}
    catch(e){toast('Banco indisponível; salvo localmente');}
    return false;
  }
  async function deleteUser(values,index){
    if(values[4]){try{const r=await fetch('/api/usuarios?id='+encodeURIComponent(values[4]),{method:'DELETE'});const j=await r.json();if(j&&j.ok){await loadUsers();toast('Usuário excluído do banco');return true;}}catch(e){}}
    const data=get('lj_users_db',[]);data.splice(index,1);set('lj_users_db',data);renderUsersAdmin();return false;
  }
  function userRow(r,i,editing){
    if(editing)return '<tr data-row="'+i+'"><td><input data-ufield="0" value="'+esc(r[0])+'"></td><td><input data-ufield="1" value="'+esc(r[1])+'"></td><td><input data-ufield="2" value="'+esc(r[2]||'temporaria123')+'"></td><td><select data-ufield="3"><option value="owner" '+(r[3]==='owner'?'selected':'')+'>Administrador Geral</option><option value="comunicacao" '+(r[3]==='comunicacao'?'selected':'')+'>Comunicação e Marketing</option><option value="campanhas" '+(r[3]==='campanhas'?'selected':'')+'>Campanhas</option><option value="diretoria" '+(r[3]==='diretoria'?'selected':'')+'>Diretoria</option><option value="leitura" '+(r[3]==='leitura'?'selected':'')+'>Leitura</option></select></td><td style="display:none"><input data-ufield="4" value="'+esc(r[4]||'')+'"></td><td><button data-usave="'+i+'">Salvar</button> <button data-ucancel="'+i+'">Cancelar</button></td></tr>';
    return '<tr data-row="'+i+'"><td>'+esc(r[0])+'</td><td>'+esc(r[1])+'</td><td>'+esc(roles[r[3]]||r[3])+'</td><td><button data-uedit="'+i+'">Editar</button> <button data-udel2="'+i+'">Excluir</button></td></tr>';
  }
  function bindUserRows(){
    const m=document.getElementById('adminMain');if(!m)return;
    m.querySelectorAll('[data-uedit]').forEach(b=>b.onclick=()=>{const data=get('lj_users_db',[]),i=+b.dataset.uedit;const tr=m.querySelector('tr[data-row="'+i+'"]');if(tr){tr.outerHTML=userRow(data[i]||[],i,true);bindUserRows();}});
    m.querySelectorAll('[data-ucancel]').forEach(b=>b.onclick=()=>renderUsersAdmin());
    m.querySelectorAll('[data-usave]').forEach(b=>b.onclick=async()=>{const data=get('lj_users_db',[]),i=+b.dataset.usave;const values=Array.from(m.querySelectorAll('tr[data-row="'+i+'"] [data-ufield]')).sort((a,b)=>Number(a.dataset.ufield)-Number(b.dataset.ufield)).map(x=>x.value);const ok=await saveUser(values);if(!ok){data[i]=values;set('lj_users_db',data);}renderUsersAdmin();});
    m.querySelectorAll('[data-udel2]').forEach(b=>b.onclick=async()=>{const data=get('lj_users_db',[]),i=+b.dataset.udel2;await deleteUser(data[i]||[],i);});
  }
  async function renderUsersAdmin(){
    const m=document.getElementById('adminMain');if(!m)return;const data=get('lj_users_db',[]);
    m.innerHTML='<h2>Usuários <span class="dbBadge">banco compartilhado</span></h2><form id="userDbForm" class="form"><label>Nome<input name="nome" required></label><label>E-mail<input name="email" type="email" required></label><label>Senha temporária<input name="senha" required value="temporaria123"></label><label>Perfil<select name="perfil"><option value="owner">Administrador Geral</option><option value="comunicacao">Diretor de Comunicação e Marketing</option><option value="campanhas">Editor de Campanhas</option><option value="diretoria">Diretoria</option><option value="leitura">Leitura</option></select></label><button>Criar usuário</button></form><table class="table adminEditableTable"><tbody>'+data.map((r,i)=>userRow(r,i,false)).join('')+'</tbody></table>';
    document.getElementById('userDbForm').onsubmit=async(e)=>{e.preventDefault();const f=new FormData(e.target);const values=[f.get('nome'),f.get('email'),f.get('senha'),f.get('perfil'),''];const ok=await saveUser(values);if(!ok){const data=get('lj_users_db',[]);data.unshift(values);set('lj_users_db',data);}e.target.reset();renderUsersAdmin();};bindUserRows();
  }

  const oldTab=window.tab;
  window.tab=function(t){
    if(t==='directors'){loadDirectors().then(renderDirectorsAdmin);return;}
    if(t==='users'){loadUsers().then(renderUsersAdmin);return;}
    if(typeof oldTab==='function')return oldTab(t);
  };
  function boot(){loadDirectors();loadUsers();document.querySelectorAll('[data-tab="directors"]').forEach(b=>b.onclick=()=>window.tab('directors'));document.querySelectorAll('[data-tab="users"]').forEach(b=>b.onclick=()=>window.tab('users'));}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();setTimeout(boot,900);setTimeout(boot,2200);
})();
`;

export default function AdminFullDbPatch(){return React.createElement('script',{dangerouslySetInnerHTML:{__html:script}});}
