import React from 'react';

const patchScript = `
(function(){
  const LS={directors:'lj_directors',users:'lj_users',session:'lj_session',interests:'lj_interests'};
  const roles={owner:'Administrador Geral do Site',comunicacao:'Diretor de Comunicação e Marketing',campanhas:'Editor de Campanhas',diretoria:'Diretoria'};
  const perm={owner:['all'],comunicacao:['directors','export'],campanhas:['export'],diretoria:['export']};
  const get=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d));}catch(e){return d;}};
  const set=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const user=()=>get(LS.users,[]).find(x=>x.id===localStorage.getItem(LS.session));
  const can=(a)=>{const u=user();return u&&((perm[u.role]||[]).includes('all')||(perm[u.role]||[]).includes(a));};
  const esc=(v)=>String(v||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;');
  const toast=(m)=>{const t=document.getElementById('toast');if(!t)return;t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200);};

  function ensureDesktopLinks(){
    document.querySelectorAll('.mainMenu').forEach(menu=>{
      if(!menu.querySelector('a[href="/revista"]')){const a=document.createElement('a');a.href='/revista';a.textContent='Revista';menu.appendChild(a);}
      if(!menu.querySelector('a[href="/lcif"]')){const a=document.createElement('a');a.href='/lcif';a.textContent='LCIF';menu.appendChild(a);}
    });
    const util=document.querySelector('.utilityLinks:last-child');
    if(util&&!util.querySelector('a[href="/revista"]')){
      const r=document.createElement('a');r.href='/revista';r.textContent='Revista';util.insertBefore(r,util.firstChild);
      const l=document.createElement('a');l.href='/lcif';l.textContent='LCIF';util.insertBefore(l,util.children[1]||null);
    }
  }

  function renderDirectorsPublic(){
    const grid=document.getElementById('directorGrid');
    if(!grid)return;
    grid.innerHTML=get(LS.directors,[]).map(d=>'<article><div class="avatar">'+esc((d[0]||'L')[0])+'</div><h2>'+esc(d[0])+'</h2><p><b>'+esc(d[1])+'</b></p><p>'+esc(d[2])+'</p></article>').join('');
  }

  function rowHtml(r,i,editing,labels){
    if(editing)return '<tr data-row="'+i+'">'+labels.map((l,idx)=>'<td><label>'+l+'<input data-field="'+idx+'" value="'+esc(r[idx])+'"></label></td>').join('')+'<td><button type="button" data-save="'+i+'">Salvar</button> <button type="button" data-cancel="'+i+'">Cancelar</button></td></tr>';
    return '<tr data-row="'+i+'">'+labels.map((l,idx)=>'<td>'+esc(r[idx])+'</td>').join('')+'<td><button type="button" data-edit="'+i+'">Editar</button> <button type="button" data-del="'+i+'">Excluir</button></td></tr>';
  }
  function renderDirectorsAdmin(){
    const m=document.getElementById('adminMain');if(!m)return;
    if(!can('directors')){m.innerHTML='<h2>Acesso restrito</h2>';return;}
    const labels=['Cargo','Responsável','Função'];let data=get(LS.directors,[]);
    m.innerHTML='<h2>Diretoria</h2><form id="editDirectors" class="form">'+labels.map((l,i)=>'<label>'+l+'<input name="f'+i+'" required></label>').join('')+'<button type="submit">Adicionar</button></form><table class="table"><tbody>'+data.map((r,i)=>rowHtml(r,i,false,labels)).join('')+'</tbody></table>';
    document.getElementById('editDirectors').onsubmit=e=>{e.preventDefault();data.unshift(Object.values(Object.fromEntries(new FormData(e.target).entries())));set(LS.directors,data);renderDirectorsPublic();renderDirectorsAdmin();toast('Adicionado');};
    m.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{const i=+b.dataset.edit;const tr=m.querySelector('tr[data-row="'+i+'"]');if(tr){tr.outerHTML=rowHtml(data[i],i,true,labels);bind();}});
    const bind=()=>{
      m.querySelectorAll('[data-cancel]').forEach(b=>b.onclick=renderDirectorsAdmin);
      m.querySelectorAll('[data-save]').forEach(b=>b.onclick=()=>{const i=+b.dataset.save;data[i]=Array.from(m.querySelectorAll('tr[data-row="'+i+'"] [data-field]')).map(x=>x.value);set(LS.directors,data);renderDirectorsPublic();renderDirectorsAdmin();toast('Alteração salva');});
    };
    bind();
    m.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{data.splice(+b.dataset.del,1);set(LS.directors,data);renderDirectorsPublic();renderDirectorsAdmin();toast('Excluído');});
  }

  function renderUsers(){
    const m=document.getElementById('adminMain');if(!m)return;
    if(!can('all')){m.innerHTML='<h2>Acesso restrito</h2>';return;}
    const us=get(LS.users,[]);
    m.innerHTML='<h2>Usuários</h2><form id="uf" class="form"><label>Nome<input name="name" required></label><label>E-mail<input name="email" type="email" required></label><label>Senha temporária<input name="password" required minlength="6"></label><label>Perfil<select name="role"><option value="comunicacao">Diretor de Comunicação e Marketing</option><option value="campanhas">Editor de Campanhas</option><option value="diretoria">Diretoria</option><option value="owner">Administrador Geral</option></select></label><button type="submit">Criar usuário local</button></form><table class="table">'+us.map((x,i)=>'<tr><td>'+esc(x.name)+'</td><td>'+esc(x.email)+'</td><td>'+esc(roles[x.role])+'</td><td><button type="button" data-udel="'+i+'">Remover</button></td></tr>').join('')+'</table>';
    document.getElementById('uf').onsubmit=e=>{e.preventDefault();us.push({id:crypto.randomUUID(),...Object.fromEntries(new FormData(e.target).entries())});set(LS.users,us);renderUsers();};
    m.querySelectorAll('[data-udel]').forEach(b=>b.onclick=()=>{us.splice(+b.dataset.udel,1);set(LS.users,us);renderUsers();});
  }

  window.tab=function(t){
    const u=user(),m=document.getElementById('adminMain');if(!u||!m)return;
    const who=document.getElementById('who'),role=document.getElementById('role');if(who)who.textContent=u.name;if(role)role.textContent=roles[u.role]||u.role;
    if(t==='resumo')m.innerHTML='<h2>Resumo</h2>';
    if(t==='directors')renderDirectorsAdmin();
    if(t==='users')renderUsers();
    if(t==='export')m.innerHTML='<h2>Exportar</h2><textarea style="width:100%;min-height:300px">'+JSON.stringify({directors:get(LS.directors,[]),interests:get(LS.interests,[])},null,2)+'</textarea>';
  };

  function boot(){ensureDesktopLinks();renderDirectorsPublic();document.querySelectorAll('[data-tab]').forEach(b=>{if(b.dataset.tab!=='campaigns')b.onclick=()=>window.tab(b.dataset.tab);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
`;

export default function AdminEditPatch(){return React.createElement('script',{dangerouslySetInnerHTML:{__html:patchScript}});}
