-- Execute no SQL Editor do Supabase.
-- Cria as tabelas compartilhadas do painel administrativo.

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

create table if not exists public.diretoria (
  id uuid primary key default gen_random_uuid(),
  cargo text not null,
  nome text not null,
  funcao text,
  periodo_al text not null default 'AL 2026/2027',
  foto_url text,
  ordem integer not null default 100,
  ativo boolean not null default true,
  criado_em timestamptz not null default now()
);

create table if not exists public.usuarios_admin (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text unique not null,
  senha_temporaria text not null,
  perfil text not null default 'campanhas' check (perfil in ('owner','comunicacao','campanhas','diretoria','leitura')),
  ativo boolean not null default true,
  criado_em timestamptz not null default now()
);

create index if not exists idx_campanhas_data on public.campanhas(data_inicio desc);
create index if not exists idx_diretoria_ordem on public.diretoria(ordem asc);
create index if not exists idx_usuarios_email on public.usuarios_admin(email);

alter table public.campanhas enable row level security;
alter table public.diretoria enable row level security;
alter table public.usuarios_admin enable row level security;

drop policy if exists campanhas_publicas_select on public.campanhas;
create policy campanhas_publicas_select on public.campanhas
for select using (status = 'publicada');

drop policy if exists diretoria_publica_select on public.diretoria;
create policy diretoria_publica_select on public.diretoria
for select using (ativo = true);

-- usuarios_admin não tem política pública. O acesso é feito apenas via service role no backend.
