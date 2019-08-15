export interface ICourse {
  id: number;
  title: string;
  creationDate: Date;
  duration: number;
  description?: string;
}

export class Course implements ICourse {
  id: number;
  title: string;
  creationDate: Date;
  duration: number;
  topRated: boolean;
  description?: string;
}

export class UpdatedCourse {
  id: number;
  title?: string;
  duration?: number;
  topRated?: boolean;
  description?: string;
}

export class NewCourse {
  title: string;
  duration: number;
  topRated: boolean;
  description?: string;
}
