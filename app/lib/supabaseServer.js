import { createClient } from '@supabase/supabase-js';

function normalizeSupabaseUrl(raw){
  const value = String(raw || '').trim();
  if(!value) return '';
  try{
    const parsed = new URL(value);
    return parsed.origin;
  }catch(error){
    return value.replace(/\/$/, '');
  }
}

export function hasSupabaseEnv(){
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getSupabaseServer(){
  if(!hasSupabaseEnv()) return null;
  const url = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  return createClient(
    url,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );
}

export function jsonOk(data, extra = {}){
  return Response.json({ ok: true, data, ...extra });
}

export function jsonError(message, status = 500, extra = {}){
  return Response.json({ ok: false, error: message, ...extra }, { status });
}
