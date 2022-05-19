export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  pictureUrl: string;
}

export class User implements IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  pictureUrl: string;

  constructor(item: IUser | null) {
    this.id = item?.id ?? 0;
    this.email = item?.email ?? "";
    this.firstName = item?.firstName ?? "";
    this.lastName = item?.lastName ?? "";
    this.pictureUrl = item?.pictureUrl ?? "";
  }
}
