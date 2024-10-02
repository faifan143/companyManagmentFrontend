export default interface ITask {
  id: string;
  name: string;
  description: string;
  task_type: {
    id: string;
    name: string;
    description?: string;
  };
  priority: number;
  emp?: {
    id: string;
    name: string;
    address?: string;
    department?: {
      id: string;
      name: string;
    };
    dob?: string;
    job?: {
      id: string;
      name: string;
      title: string;
      department?: {
        parent_department_id: string | null;
      };
      grade_level: string;
      description?: string;
      responsibilities?: string[];
      permissions?: string[];
    };
    phone?: string;
    email?: string;
  };
  department?: {
    id: string;
    name: string;
  };
  status: {
    id: string;
    name: string;
    description?: string;
  };
  due_date: string;
  files?: string[];
  createdAt?: string;
  updatedAt?: string;
}
