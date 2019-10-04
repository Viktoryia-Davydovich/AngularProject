export class Author {
  id: number;
  firstName: string;
  lastName: string;

  toString() {
    return this.firstName + " " + this.lastName;
  }
}
