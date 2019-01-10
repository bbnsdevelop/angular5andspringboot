import { User } from "../model/user.model";
import { Observable } from 'rxjs';

export interface UserService {

  login(user: User):Observable<any>;
  createOrUpdate(user: User):Observable<any>;
  findAll(page: number, count: number):Observable<any>;
  findById(id: string):Observable<any>;
  delete(id: string):Observable<any>;

}
