import { create } from 'zustand';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive' | 'lead';
  value: number;
  lastContact: string;
}

export interface CRMState {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  getCustomer: (id: string) => Customer | undefined;
}

const initialCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    company: 'Acme Inc',
    status: 'active',
    value: 50000,
    lastContact: '2024-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 234 567 891',
    company: 'Tech Corp',
    status: 'lead',
    value: 75000,
    lastContact: '2024-01-14',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '+1 234 567 892',
    company: 'Global Ltd',
    status: 'inactive',
    value: 25000,
    lastContact: '2024-01-10',
  },
];

export const useCRMStore = create<CRMState>((set, get) => ({
  customers: initialCustomers,
  
  addCustomer: (customer) => {
    const newCustomer: Customer = {
      ...customer,
      id: Math.random().toString(36).substr(2, 9),
    };
    set((state) => ({
      customers: [...state.customers, newCustomer],
    }));
  },
  
  updateCustomer: (id, updated) => {
    set((state) => ({
      customers: state.customers.map((c) =>
        c.id === id ? { ...c, ...updated } : c
      ),
    }));
  },
  
  deleteCustomer: (id) => {
    set((state) => ({
      customers: state.customers.filter((c) => c.id !== id),
    }));
  },
  
  getCustomer: (id) => {
    return get().customers.find((c) => c.id === id);
  },
}));
