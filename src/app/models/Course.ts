import { Author } from "./Author";

export interface ICourse {
  id: number;
  title: string;
  date: Date;
  length: number;
  description?: string;
  authors?: Author[];
}

export class Course implements ICourse {
  id: number;
  title: string;
  date: Date;
  length: number;
  topRated?: boolean;
  description: string;
  authors?: Author[];
}

export class UpdatedCourse {
  id: number;
  title?: string;
  length?: number;
  authors?: Author[];
  description?: string;
}

export class NewCourse {
  title: string;
  length: number;
  authors?: Author[];
  description?: string;
}

export class EditableCourse {
  id?: number;
  title: string;
  description: string;
  length: number;
  date?: Date;
  authors?: Author[];
  header: string;
}
