export interface IUser {
  id: string;
  clerk_user_id: string;
  name: string;
  email: string;
  bio: string;
  hero_image: string;
  tag_line: string;
  title: string;
  created_at: string;
}

export interface IProject {
  id: string;
  user_id: string;
  name: string;
  description: string;
  demo_link: string;
  repo_link: string;
  tech_stack: string;
  image: string;
  created_at: string;
}

export interface IExperience {
  id: string;
  user_id: string;
  company: string;
  role: string;
  start_date: string;
  end_date: string;
  description: string;
  location: string;
  created_at: string;
}

export interface ISkill {
  id: string;
  user_id: string;
  name: string;
  level: string;
  image: string;
  created_at: string;
}