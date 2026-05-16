-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users Profiles
create table if not exists users_profiles (
  id uuid default uuid_generate_v4() primary key,
  auth_id uuid references auth.users(id) on delete cascade unique not null,
  full_name text not null,
  email text unique not null,
  country text,
  skills text[] default '{}',
  verification_status text default 'pending_verification'
    check (verification_status in ('pending_verification', 'under_verification', 'approved', 'rejected')),
  certificate_url text,
  linkedin_url text,
  role text default 'contributor' check (role in ('contributor', 'admin')),
  created_at timestamptz default now()
);

-- Jobs
create table if not exists jobs (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  category text not null,
  category_color text default 'violet',
  pay_range text not null,
  pay_min numeric not null,
  pay_max numeric not null,
  contract_type text default 'Contract',
  location text default 'Remote · Worldwide',
  tags text[] default '{}',
  description text not null,
  skills text[] default '{}',
  duration text default 'Ongoing',
  level text default 'Intermediate',
  course_id uuid,
  course_name text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Courses
create table if not exists courses (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  price numeric not null,
  description text not null,
  duration text,
  level text,
  modules_count integer default 0,
  thumbnail_url text,
  related_job_category text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Course Modules
create table if not exists course_modules (
  id uuid default uuid_generate_v4() primary key,
  course_id uuid references courses(id) on delete cascade not null,
  title text not null,
  video_url text,
  description text,
  order_index integer not null,
  duration_minutes integer,
  created_at timestamptz default now()
);

-- Course Progress
create table if not exists course_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id uuid references courses(id) on delete cascade not null,
  completion_percentage numeric default 0 check (completion_percentage between 0 and 100),
  last_module_id uuid references course_modules(id),
  updated_at timestamptz default now(),
  unique(user_id, course_id)
);

-- Applications
create table if not exists applications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  job_id uuid references jobs(id) on delete cascade not null,
  status text default 'pending_verification'
    check (status in ('pending_verification', 'under_verification', 'approved', 'rejected')),
  certificate_url text,
  admin_notes text,
  created_at timestamptz default now()
);

-- Certificates
create table if not exists certificates (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id uuid references courses(id) on delete cascade not null,
  certificate_url text,
  issued_at timestamptz default now(),
  unique(user_id, course_id)
);

-- Payments
create table if not exists payments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete set null,
  course_id uuid references courses(id) on delete set null,
  paypal_order_id text unique not null,
  amount numeric not null,
  currency text default 'USD',
  status text default 'pending' check (status in ('pending', 'completed', 'failed', 'refunded')),
  created_at timestamptz default now()
);

-- Row Level Security
alter table users_profiles enable row level security;
alter table applications enable row level security;
alter table course_progress enable row level security;
alter table certificates enable row level security;
alter table payments enable row level security;

-- Policies
create policy "Users can view own profile"
  on users_profiles for select using (auth.uid() = auth_id);

create policy "Users can update own profile"
  on users_profiles for update using (auth.uid() = auth_id);

create policy "Users can insert own profile"
  on users_profiles for insert with check (auth.uid() = auth_id);

create policy "Users can view own applications"
  on applications for select using (auth.uid() = user_id);

create policy "Users can create applications"
  on applications for insert with check (auth.uid() = user_id);

create policy "Users can view own progress"
  on course_progress for select using (auth.uid() = user_id);

create policy "Users can update own progress"
  on course_progress for all using (auth.uid() = user_id);

create policy "Users can view own certificates"
  on certificates for select using (auth.uid() = user_id);

create policy "Public jobs are viewable"
  on jobs for select using (is_active = true);

create policy "Public courses are viewable"
  on courses for select using (is_active = true);

-- Admin full access (set role = 'admin' in users_profiles)
create policy "Admins have full access to applications"
  on applications for all
  using (
    exists (
      select 1 from users_profiles
      where auth_id = auth.uid() and role = 'admin'
    )
  );

-- Storage bucket for certificates
insert into storage.buckets (id, name, public)
values ('certificates', 'certificates', false)
on conflict do nothing;

create policy "Users can upload their certificates"
  on storage.objects for insert
  with check (bucket_id = 'certificates' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can view their own certificates"
  on storage.objects for select
  using (bucket_id = 'certificates' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Admins can view all certificates"
  on storage.objects for select
  using (
    bucket_id = 'certificates' and
    exists (
      select 1 from users_profiles
      where auth_id = auth.uid() and role = 'admin'
    )
  );