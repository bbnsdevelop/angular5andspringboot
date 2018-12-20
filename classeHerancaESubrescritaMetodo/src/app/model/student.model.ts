import { Person } from './person.model'

export class Student extends Person {

  constructor(name: string){
    super(name);
  }

  showAge(age: number){
    console.log('stundying.....')
    super.showPerson();
  }
}
