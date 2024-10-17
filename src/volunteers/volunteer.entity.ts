import { IVolunteer } from './interfaces';

export class VolunteerEntity implements IVolunteer {
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  email: string;
  rating: number;
  projects: string[];

  constructor(
    surname: string,
    name: string,
    patronymic: string,
    phone: string,
    email: string,
    rating: number,
    projects: string[],
  ) {
    this.surname = surname;
    this.name = name;
    this.patronymic = patronymic;
    this.phone = phone;
    this.email = email;
    this.rating = rating;
    this.projects = projects;
  }
}
