import { DaoInterface } from '../dao.interface';
import { Person } from './../../model/person.model';

export class PersonDaoImpl implements DaoInterface{

  tableName: string;

  insert(Person: any): boolean {
    return true;
  }
  update(Person: any): boolean {
    return true;
  }
  delete(id: number): boolean {
    return true;
  }
  find(id: number): Person {
    return new Person('Bruno');
  }
  findAll(): [Person] {
    return [new Person('Bruno')]
  }


}
