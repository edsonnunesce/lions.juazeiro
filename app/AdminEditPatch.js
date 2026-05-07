import React from 'react';

const patchScript = `
(function(){
  const LS={campaigns:'lj_campaigns',directors:'lj_directors',users:'lj_users',session:'lj_session',interests:'lj_interests'};
  const roles={owner:'Administrador Geral do Site',comunicacao:'Diretor de Comunicação e Marketing',campanhas:'Editor de Campanhas',diretoria:'Diretoria'};
  const perm={owner:['all'],comunicacao:['campaigns','directors','export'],campanhas:['campaigns','export'],diretoria:['export']};
  const get=(k,d)=>JSON.parse(localStorage.getItem(k)||JSON.stringify(d));
  const set=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const user=()=>get(LS.users,[]).find(x=>x.id===localStorage.getItem(LS.session));
  const can=(a)=>{let u=user();return u&&((perm[u.role]||[]).includes('all')||(perm[u.role]||[]).includes(a));};
  const esc=(v)=>String(v||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;');
  const toast=(m)=>{let t=document.getElementById('toast');if(!t)return;t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200);};

  function ensureDesktopLinks(){
    const menus=document.querySelectorAll('.mainMenu');
    menus.forEach(menu=>{
      if(!menu.querySelector('a[href="/revista"]')){
        const a=document.createElement('a');a.href='/revista';a.textContent='Revista';a.className='desktopRevistaLink';menu.appendChild(a);
      }
      if(!menu.querySelector('a[href="/lcif"]')){
        const a=document.createElement('a');a.href='/lcif';a.textContent='LCIF';a.className='desktopLcifLink';menu.appendChild(a);
      }
    });
    const util=document.querySelector('.utilityLinks:last-child');
    if(util && !util.querySelector('a[href="/revista"]')){
      const r=document.createElement('a');r.href='/revista';r.textContent='Revista';util.insertBefore(r, util.firstChild);
      const l=document.createElement('a');l.href='/lcif';l.textContent='LCIF';util.insertBefore(l, util.children[1]||null);
    }
  }

  function renderPublic(){
    let cg=document.getElementById('campaignGrid');
    if(cg){cg.innerHTML=get(LS.campaigns,[]).map(c=>'<article class="campaign"><span class="tag">'+esc(c[1])+'</span><h2>'+esc(c[0])+'</h2><p><b>'+esc(c[2])+'</b> · '+esc(c[3])+'</p><p>'+esc(c[4])+'</p></article>').join('');}
    let dg=document.getElementById('directorGrid');
    if(dg){dg.innerHTML=get(LS.directors,[]).map(d=>'<article><div class="avatar">'+esc((d[0]||'L')[0])+'</div><h2>'+esc(d[0])+'</h2><p><b>'+esc(d[1])+'</b></p><p>'+esc(d[2])+'</p></article>').join('');}
  }

  function renderEditable(area,key,labels){
    let m=document.getElementById('adminMain');
    if(!m)return;
    if(!can(area)){m.innerHTML='<h2>Acesso restrito</h2>';return;}
    let data=get(key,[]);
    m.innerHTML='<h2>'+area+'</h2>'+
      '<form id="editForm" class="form">'+
      labels.map((l,i)=>'<label>'+l+'<input name="f'+i+'" required></label>').join('')+
      '<button>Adicionar</button></form>'+
      '<table class="table adminEditableTable"><tbody>'+data.map((r,i)=>rowHtml(r,i,false,labels))+'</tbody></table>';

    document.getElementById('editForm').onsubmit=function(e){
      e.preventDefault();
      data=get(key,[]);
      data.unshift(Object.values(Object.fromEntries(new FormData(e.target).entries())));
      set(key,data);e.target.reset();renderPublic();renderEditable(area,key,labels);toast('Adicionado');
    };
    bindRows(area,key,labels);
  }

  function rowHtml(r,i,editing,labels){
    if(editing){
      return '<tr data-row="'+i+'">'+labels.map((l,idx)=>'<td><label style="display:block;font-weight:800;color:#00338d;font-size:.78rem">'+l+'<input data-field="'+idx+'" value="'+esc(r[idx])+'" style="width:100%;min-width:140px;border:1px solid #d9e2ef;border-radius:10px;padding:9px;margin-top:4px;font:inherit"></label></td>').join('')+'<td style="white-space:nowrap"><button data-save="'+i+'">Salvar</button> <button data-cancel="'+i+'">Cancelar</button></td></tr>';
    }
    return '<tr data-row="'+i+'">'+r.map(x=>'<td>'+esc(x)+'</td>').join('')+'<td style="white-space:nowrap"><button data-edit="'+i+'">Editar</button> <button data-del="'+i+'">Excluir</button></td></tr>';
  }

  function bindRows(area,key,labels){
    let m=document.getElementById('adminMain');
    if(!m)return;
    m.querySelectorAll('[data-edit]').forEach(b=>b.onclick=function(){
      let data=get(key,[]),i=+b.dataset.edit;
      let tr=m.querySelector('tr[data-row="'+i+'"]');
      if(tr){tr.outerHTML=rowHtml(data[i]||[],i,true,labels);bindRows(area,key,labels);}
    });
    m.querySelectorAll('[data-cancel]').forEach(b=>b.onclick=function(){
      let data=get(key,[]),i=+b.dataset.cancel;
      let tr=m.querySelector('tr[data-row="'+i+'"]');
      if(tr){tr.outerHTML=rowHtml(data[i]||[],i,false,labels);bindRows(area,key,labels);}
    });
    m.querySelectorAll('[data-save]').forEach(b=>b.onclick=function(){
      let data=get(key,[]),i=+b.dataset.save;
      let tr=m.querySelector('tr[data-row="'+i+'"]');
      let values=Array.from(tr.querySelectorAll('input[data-field]')).map(inp=>inp.value);
      data[i]=values;set(key,data);renderPublic();renderEditable(area,key,labels);toast('Alteração salva');
    });
    m.querySelectorAll('[data-del]').forEach(b=>b.onclick=function(){
      let data=get(key,[]);data.splice(+b.dataset.del,1);set(key,data);renderPublic();renderEditable(area,key,labels);toast('Excluído');
    });
  }

  function renderUsers(){
    let m=document.getElementById('adminMain');
    if(!m)return;
    if(!can('all')){m.innerHTML='<h2>Acesso restrito</h2>';return;}
    let us=get(LS.users,[]);
    m.innerHTML='<h2>Usuários</h2><form id="uf" class="form"><label>Nome<input name="name" required></label><label>E-mail<input name="email" type="email" required></label><label>Senha temporária<input name="password" required minlength="6"></label><label>Perfil<select name="role"><option value="comunicacao">Diretor de Comunicação e Marketing</option><option value="campanhas">Editor de Campanhas</option><option value="diretoria">Diretoria</option><option value="owner">Administrador Geral</option></select></label><button>Criar usuário local</button></form><table class="table">'+us.map((x,i)=>'<tr><td>'+esc(x.name)+'</td><td>'+esc(x.email)+'</td><td>'+esc(roles[x.role])+'</td><td><button data-udel="'+i+'">Remover</button></td></tr>').join('')+'</table>';
    document.getElementById('uf').onsubmit=function(e){e.preventDefault();us.push({id:crypto.randomUUID(),...Object.fromEntries(new FormData(e.target).entries())});set(LS.users,us);renderUsers();};
    m.querySelectorAll('[data-udel]').forEach(b=>b.onclick=function(){us.splice(+b.dataset.udel,1);set(LS.users,us);renderUsers();});
  }

  window.tab=function(t){
    let u=user(),m=document.getElementById('adminMain');
    if(!u||!m)return;
    let who=document.getElementById('who'),role=document.getElementById('role');
    if(who)who.textContent=u.name;if(role)role.textContent=roles[u.role]||u.role;
    if(t==='resumo')m.innerHTML='<h2>Resumo</h2><section class="grid three"><article><h2>'+get(LS.campaigns,[]).length+'</h2><p>Campanhas</p></article><article><h2>'+get(LS.directors,[]).length+'</h2><p>Cargos</p></article><article><h2>'+get(LS.interests,[]).length+'</h2><p>Interesses</p></article></section><p class="notice">Modo local de validação. Para produção real, conectar autenticação e banco server-side.</p>';
    if(t==='campaigns')renderEditable('campaigns',LS.campaigns,['Título','Causa','Data','Local','Resumo']);
    if(t==='directors')renderEditable('directors',LS.directors,['Cargo','Responsável','Função']);
    if(t==='users')renderUsers();
    if(t==='export')m.innerHTML='<h2>Exportar</h2><textarea style="width:100%;min-height:300px">'+JSON.stringify({campaigns:get(LS.campaigns,[]),directors:get(LS.directors,[]),interests:get(LS.interests,[])},null,2)+'</textarea>';
  };

  function boot(){
    ensureDesktopLinks();renderPublic();
    document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=function(){window.tab(b.dataset.tab);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  setTimeout(boot,400);setTimeout(boot,1200);
})();
`;

export default function AdminEditPatch(){
  return React.createElement('script',{dangerouslySetInnerHTML:{__html:patchScript}});
}
