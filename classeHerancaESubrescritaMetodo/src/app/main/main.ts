import { Person } from "../model/person.model";
import { Student } from "../model/student.model";
export class Main{

  public exec(){
    let person: Person = new Person('Bruno');
    person.showPerson();
    let s = new Student('Jose')
    s.showAge(25);
  }

}

