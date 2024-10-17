import { HttpException, HttpStatus } from '@nestjs/common';

interface IError {
  [key: string]: string;
  message?: never;
  error?: never;
  createAt?: never;
}

export class NotFoundVolunteerException extends HttpException {
  constructor(error: IError = null) {
    super(
      {
        message: 'Волонтер не найден',
        error: 'not found volunteer exception',
        createAt: new Date(),
        ...error,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
