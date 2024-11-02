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

export interface TaskFormInputs {
  id: string;
  name: string;
  description: string;
  task_type: string;
  priority: number;
  emp?: string;
  department_id?: string;
  status: string;
  due_date: string;
  files?: string[];
  isRecurring?: boolean;
  intervalInDays?: number;
  end_date?: string;
}

export interface ITaskStatus {
  id: string;
  name: string;
  description: string;
}

export interface ITaskType {
  id: string;
  name: string;
  description: string;
}

export interface TaskFormInputs {
  id: string;
  name: string;
  description: string;
  task_type: string;
  priority: number;
  emp?: string;
  department_id?: string;
  status: string;
  due_date: string;
  files?: string[];
}

// Props for the CreateTask component
export interface CreateTaskProps {
  isOpen: boolean;
  onClose: () => void;
  taskData?: TaskFormInputs | null;
}

export interface TaskStatusFormInputs {
  id: string;
  name: string;
  description: string;
}

export interface CreateTaskStatusProps {
  isOpen: boolean;
  onClose: () => void;
  taskStatusData?: TaskStatusFormInputs | null;
}

export interface TaskTypeFormInputs {
  id: string;
  name: string;
  description: string;
}

export interface CreateTaskTypeProps {
  isOpen: boolean;
  onClose: () => void;
  taskTypeData?: TaskTypeFormInputs | null;
}
