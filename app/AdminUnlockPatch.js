import React from 'react';

const script = `
(function(){
  function unlock(){
    if(location.pathname !== '/admin') return;
    const LS={users:'lj_users',session:'lj_session'};
    const get=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d));}catch(e){return d;}};
    const set=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
    let users=get(LS.users,[]);
    let admin=users.find(u=>u.role==='owner');
    if(!admin){
      admin={id:'local-owner-lions-juazeiro',name:'Administrador Local',email:'admin@lcjuazeiro.local',password:'local',role:'owner'};
      users.unshift(admin);
      set(LS.users,users);
    }
    localStorage.setItem(LS.session,admin.id);
    const setup=document.getElementById('setup');
    const login=document.getElementById('login');
    const app=document.getElementById('adminApp');
    if(setup)setup.classList.add('hide');
    if(login)login.classList.add('hide');
    if(app)app.classList.remove('hide');
    const who=document.getElementById('who');
    const role=document.getElementById('role');
    if(who)who.textContent=admin.name;
    if(role)role.textContent='Administrador Geral do Site';
    if(typeof window.tab==='function')window.tab('resumo');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',unlock);else unlock();
  setTimeout(unlock,300);setTimeout(unlock,900);setTimeout(unlock,1600);
})();
`;

export default function AdminUnlockPatch(){
  return React.createElement('script',{dangerouslySetInnerHTML:{__html:script}});
}
