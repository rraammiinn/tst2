import { create } from 'zustand';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  tags: string[];
  featuredImage?: string;
}

export interface CMSState {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => BlogPost | undefined;
}

const initialPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Our Platform',
    slug: 'getting-started',
    excerpt: 'Learn how to make the most of our comprehensive admin dashboard.',
    content: 'Full article content here...',
    author: 'Admin User',
    status: 'published',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15',
    tags: ['tutorial', 'guide'],
    featuredImage: '/images/post1.jpg',
  },
  {
    id: '2',
    title: 'Best Practices for CRM Management',
    slug: 'crm-best-practices',
    excerpt: 'Discover proven strategies for effective customer relationship management.',
    content: 'Full article content here...',
    author: 'Admin User',
    status: 'published',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-14',
    tags: ['crm', 'business'],
  },
  {
    id: '3',
    title: 'Upcoming Features Preview',
    slug: 'upcoming-features',
    excerpt: 'A sneak peek at what\'s coming next.',
    content: 'Full article content here...',
    author: 'Admin User',
    status: 'draft',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    tags: ['announcement'],
  },
];

export const useCMSStore = create<CMSState>((set, get) => ({
  posts: initialPosts,
  
  addPost: (post) => {
    const now = new Date().toISOString().split('T')[0];
    const newPost: BlogPost = {
      ...post,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: now,
      updatedAt: now,
    };
    set((state) => ({
      posts: [...state.posts, newPost],
    }));
  },
  
  updatePost: (id, updated) => {
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id ? { ...p, ...updated, updatedAt: new Date().toISOString().split('T')[0] } : p
      ),
    }));
  },
  
  deletePost: (id) => {
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== id),
    }));
  },
  
  getPost: (id) => {
    return get().posts.find((p) => p.id === id);
  },
}));
