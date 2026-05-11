-- Execute no SQL Editor do Supabase para ativar o banco real de campanhas.

create extension if not exists pgcrypto;

create table if not exists public.campanhas (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  causa_global text not null default 'Esforços Humanitários',
  data_inicio date not null default current_date,
  local text,
  resumo text,
  fotos jsonb not null default '[]'::jsonb,
  status text not null default 'publicada',
  entra_revista boolean not null default true,
  criado_em timestamptz not null default now()
);

create index if not exists idx_campanhas_data on public.campanhas(data_inicio desc);

alter table public.campanhas enable row level security;

drop policy if exists campanhas_publicas_select on public.campanhas;
create policy campanhas_publicas_select on public.campanhas
for select using (status = 'publicada');
