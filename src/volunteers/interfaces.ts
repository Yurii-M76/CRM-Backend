export interface IVolunteer {
  id?: string;
  surname?: string;
  name: string;
  patronymic?: string;
  phone: string;
  email?: string;
  rating?: number;
  projects?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IVolunteers {
  count: number;
  items: IVolunteer[];
}
