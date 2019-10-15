import { Author } from "./Author";

export interface ICourse {
  id: number;
  name: string;
  date: Date;
  length: number;
  description?: string;
  authors?: Author[];
}

export class Course implements ICourse {
  id: number;
  name: string;
  date: Date;
  length: number;
  isTopRated?: boolean;
  description: string;
  authors?: Author[];
}

export class UpdatedCourse {
  id: number;
  name?: string;
  length?: number;
  authors?: Author[];
  description?: string;
}

export class NewCourse {
  name: string;
  length: number;
  authors?: Author[];
  description?: string;
}

export class EditableCourse {
  id?: number;
  name: string;
  description: string;
  length: number;
  date?: Date;
  authors?: Author[];
}
