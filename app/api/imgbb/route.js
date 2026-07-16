import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getApiKey(){
  return process.env.IMGBB_API_KEY || process.env.NEXT_PUBLIC_IMGBB_API_KEY || process.env.IMGBB_KEY || '';
}

function error(message,status=500){
  return NextResponse.json({ok:false,error:message},{status});
}

export async function POST(request){
  const apiKey=getApiKey();
  if(!apiKey) return error('Chave do ImgBB não configurada na Vercel.',503);

  const incoming=await request.formData();
  const files=incoming.getAll('files').filter(item=>item instanceof File && item.size>0);
  if(!files.length) return error('Nenhuma imagem enviada.',400);

  const uploaded=[];
  for(const file of files){
    if(!String(file.type||'').startsWith('image/')) return error(`Arquivo inválido: ${file.name}`,400);
    if(file.size>32*1024*1024) return error(`A imagem ${file.name} excede 32 MB.`,413);

    const bytes=Buffer.from(await file.arrayBuffer());
    const form=new FormData();
    form.append('image',bytes.toString('base64'));
    form.append('name',String(file.name||'imagem').replace(/\.[^.]+$/,''));

    const response=await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,{
      method:'POST',
      body:form,
      cache:'no-store'
    });
    const result=await response.json().catch(()=>null);
    if(!response.ok || !result?.success || !result?.data?.url){
      return error(result?.error?.message || `Falha ao enviar ${file.name} ao ImgBB.`,502);
    }

    uploaded.push({
      name:file.name,
      url:result.data.url,
      display_url:result.data.display_url || result.data.url,
      delete_url:result.data.delete_url || '',
      id:result.data.id || ''
    });
  }

  return NextResponse.json({ok:true,data:uploaded});
}
