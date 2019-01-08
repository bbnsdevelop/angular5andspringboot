import { User } from "../model/user.model";
import { Observable } from 'rxjs';

export interface UserService {

  login(user: User):Observable<any>;
  createOrUpdate(user: User);
  findAll(page: number, count: number);
  findById(id: number);
  deleteById(id: number);
  delete(id: number);

}
