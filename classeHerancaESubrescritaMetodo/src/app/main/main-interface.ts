import { PersonDaoImpl } from './../interface/impl/person-dao-impl';
import { DaoInterface } from './../interface/dao.interface';
import { Person } from '../model/person.model';

let personDao: DaoInterface = new PersonDaoImpl;
let person: Person = new Person('Bruno')


personDao.insert(person);
