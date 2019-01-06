import { User } from "../model/user.model";

export interface UserService {

  login(user: User);
  createOrUpdate(user: User);
  findAll(page: number, count: number);
  findById(id: number);
  deleteById(id: number);

}
