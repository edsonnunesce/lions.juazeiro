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
  const toast=(m)=>{let t=document.getElementById('toast');if(!t)return;t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200);};
  function renderPublic(){
    let cg=document.getElementById('campaignGrid');
    if(cg){cg.innerHTML=get(LS.campaigns,[]).map(c=>'<article class="campaign"><span class="tag">'+(c[1]||'')+'</span><h2>'+(c[0]||'')+'</h2><p><b>'+(c[2]||'')+'</b> · '+(c[3]||'')+'</p><p>'+(c[4]||'')+'</p></article>').join('');}
    let dg=document.getElementById('directorGrid');
    if(dg){dg.innerHTML=get(LS.directors,[]).map(d=>'<article><div class="avatar">'+((d[0]||'L')[0])+'</div><h2>'+(d[0]||'')+'</h2><p><b>'+(d[1]||'')+'</b></p><p>'+(d[2]||'')+'</p></article>').join('');}
  }
  function renderEditable(area,key,labels,editIndex){
    let m=document.getElementById('adminMain');
    if(!m)return;
    if(!can(area)){m.innerHTML='<h2>Acesso restrito</h2>';return;}
    let data=get(key,[]);
    let editing=Number.isInteger(editIndex)&&editIndex>=0;
    let current=editing?(data[editIndex]||[]):[];
    m.innerHTML='<h2>'+area+'</h2>'+
      '<form id="editForm" class="form">'+
      labels.map((l,i)=>'<label>'+l+'<input name="f'+i+'" required value="'+String(current[i]||'').replace(/"/g,'&quot;')+'"></label>').join('')+
      '<button>'+(editing?'Salvar alteração':'Adicionar')+'</button>'+
      (editing?'<button type="button" id="cancelEdit">Cancelar edição</button>':'')+
      '</form>'+
      '<table class="table">'+
      data.map((r,i)=>'<tr>'+r.map(x=>'<td>'+String(x||'')+'</td>').join('')+'<td style="white-space:nowrap"><button data-edit="'+i+'">Editar</button> <button data-del="'+i+'">Excluir</button></td></tr>').join('')+
      '</table>';
    document.getElementById('editForm').onsubmit=function(e){
      e.preventDefault();
      let values=Object.values(Object.fromEntries(new FormData(e.target).entries()));
      if(editing){data[editIndex]=values;set(key,data);toast('Alteração salva');}
      else{data.unshift(values);set(key,data);toast('Adicionado');}
      renderPublic();renderEditable(area,key,labels);
    };
    let cancel=document.getElementById('cancelEdit');
    if(cancel)cancel.onclick=function(){renderEditable(area,key,labels);};
    m.querySelectorAll('[data-edit]').forEach(b=>b.onclick=function(){renderEditable(area,key,labels,+b.dataset.edit);});
    m.querySelectorAll('[data-del]').forEach(b=>b.onclick=function(){data.splice(+b.dataset.del,1);set(key,data);renderPublic();renderEditable(area,key,labels);toast('Excluído');});
  }
  function renderUsers(){
    let m=document.getElementById('adminMain');
    if(!m)return;
    if(!can('all')){m.innerHTML='<h2>Acesso restrito</h2>';return;}
    let us=get(LS.users,[]);
    m.innerHTML='<h2>Usuários</h2><form id="uf" class="form"><label>Nome<input name="name" required></label><label>E-mail<input name="email" type="email" required></label><label>Senha temporária<input name="password" required minlength="6"></label><label>Perfil<select name="role"><option value="comunicacao">Diretor de Comunicação e Marketing</option><option value="campanhas">Editor de Campanhas</option><option value="diretoria">Diretoria</option><option value="owner">Administrador Geral</option></select></label><button>Criar usuário local</button></form><table class="table">'+us.map((x,i)=>'<tr><td>'+x.name+'</td><td>'+x.email+'</td><td>'+roles[x.role]+'</td><td><button data-udel="'+i+'">Remover</button></td></tr>').join('')+'</table>';
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
  document.addEventListener('DOMContentLoaded',function(){
    document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=function(){window.tab(b.dataset.tab);});
    renderPublic();
  });
})();
`;

export default function AdminEditPatch(){
  return React.createElement('script',{dangerouslySetInnerHTML:{__html:patchScript}});
}
