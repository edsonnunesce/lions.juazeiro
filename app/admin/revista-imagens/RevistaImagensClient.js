'use client';

import React,{useEffect,useState} from 'react';

const sections=[
  ['capa','Capa da revista'],['presidencia','Mensagem da Presidência'],['lcif','LCIF'],['dmla','Distrito Múltiplo LA'],['la4','Distrito LA-4'],['juazeiro','Juazeiro / Comunidade'],['campanhas','Campanhas locais'],['galeria','Galeria da revista'],['contracapa','Contracapa']
];

const emptyForm={id:'',secao:'capa',titulo:'',legenda:'',credito:'',ordem:100,edicao_id:'al-2025-2026-001',imagem_url:''};

export default function RevistaImagensClient(){
  const [items,setItems]=useState([]);
  const [form,setForm]=useState(emptyForm);
  const [file,setFile]=useState(null);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [message,setMessage]=useState('');

  async function load(){
    setLoading(true);
    try{
      const r=await fetch('/api/revista-imagens',{cache:'no-store'});
      const j=await r.json();
      if(!r.ok||!j.ok||j.configured===false) throw new Error(j.error||'Banco não configurado.');
      setItems(Array.isArray(j.data)?j.data:[]);
    }catch(e){setMessage(e.message);setItems([]);}finally{setLoading(false);}
  }

  useEffect(()=>{load();},[]);

  async function upload(){
    if(!file) return form.imagem_url;
    const fd=new FormData();fd.append('files',file);
    const r=await fetch('/api/imgbb',{method:'POST',body:fd});
    const j=await r.json();
    if(!r.ok||!j.ok||!j.data?.[0]?.url) throw new Error(j.error||'Falha ao enviar imagem ao ImgBB.');
    return j.data[0].url;
  }

  async function submit(e){
    e.preventDefault();setSaving(true);setMessage('');
    try{
      const imagem_url=await upload();
      if(!imagem_url) throw new Error('Selecione uma imagem.');
      const r=await fetch('/api/revista-imagens',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,imagem_url})});
      const j=await r.json();
      if(!r.ok||!j.ok) throw new Error(j.error||'Falha ao salvar no banco.');
      setForm(emptyForm);setFile(null);setMessage('Imagem salva no ImgBB e registrada no banco.');await load();
    }catch(e){setMessage(e.message);}finally{setSaving(false);}
  }

  function edit(item){setForm({...emptyForm,...item,ordem:item.ordem||100});setFile(null);window.scrollTo({top:0,behavior:'smooth'});}

  async function remove(id){
    if(!confirm('Excluir este registro de imagem?'))return;
    const r=await fetch('/api/revista-imagens?id='+encodeURIComponent(id),{method:'DELETE'});
    const j=await r.json();
    if(!r.ok||!j.ok){setMessage(j.error||'Falha ao excluir.');return;}
    setMessage('Registro excluído do banco.');await load();
  }

  const preview=file?URL.createObjectURL(file):form.imagem_url;

  return <div className="grid">
    <aside className="panel">
      <h2>{form.id?'Editar imagem':'Nova imagem'}</h2>
      <p className="hint">A imagem será enviada ao ImgBB. O Supabase guardará somente a URL permanente.</p>
      <div className="previewBox">{preview?<img src={preview} alt="Prévia 1:1"/>:'Prévia quadrada 1:1'}</div>
      <form className="form" onSubmit={submit}>
        <label>Seção<select value={form.secao} onChange={e=>setForm({...form,secao:e.target.value})}>{sections.map(s=><option key={s[0]} value={s[0]}>{s[1]}</option>)}</select></label>
        <label>Edição<input value={form.edicao_id} onChange={e=>setForm({...form,edicao_id:e.target.value})}/></label>
        <label>Título<input value={form.titulo} onChange={e=>setForm({...form,titulo:e.target.value})}/></label>
        <label>Imagem 1:1<input type="file" accept="image/*" required={!form.imagem_url} onChange={e=>setFile(e.target.files?.[0]||null)}/></label>
        <label>Legenda<input value={form.legenda} onChange={e=>setForm({...form,legenda:e.target.value})}/></label>
        <label>Crédito<input value={form.credito} onChange={e=>setForm({...form,credito:e.target.value})}/></label>
        <label>Ordem<input type="number" value={form.ordem} onChange={e=>setForm({...form,ordem:Number(e.target.value||100)})}/></label>
        <button className="btn" disabled={saving}>{saving?'Enviando e salvando...':'Salvar imagem'}</button>
        {form.id?<button type="button" className="btn blue" onClick={()=>{setForm(emptyForm);setFile(null);}}>Cancelar edição</button>:null}
      </form>
      {message?<p className="status">{message}</p>:null}
    </aside>
    <section className="panel">
      <h2>Imagens cadastradas</h2>
      {loading?<p>Carregando...</p>:items.length?<div className="imagesGrid">{items.map(item=><article className="imgCard" key={item.id}><img src={item.imagem_url} alt={item.titulo||item.legenda||'Imagem da revista'}/><div className="imgBody"><b>{sections.find(s=>s[0]===item.secao)?.[1]||item.secao}</b><small>{item.edicao_id}</small><p>{item.titulo||item.legenda}</p><div className="imgActions"><button onClick={()=>edit(item)}>Editar</button><button className="danger" onClick={()=>remove(item.id)}>Excluir</button></div></div></article>)}</div>:<div className="empty">Nenhuma imagem cadastrada no banco.</div>}
    </section>
  </div>;
}
