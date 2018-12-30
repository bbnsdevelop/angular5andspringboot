import { DaoInterface } from '../dao';
import { Person } from '../../model/person.model';

export class DaoImpl<T> implements DaoInterface<T>{

  tableName: string;

  insert(object: T): boolean {
    return true;
  }
  update(object: T): boolean {
    return true;
  }
  delete(id: number): boolean {
    return true;
  }
  find(id: number): T {
    return null;
  }
  findAll(): [T] {
    return [null]
  }


}
