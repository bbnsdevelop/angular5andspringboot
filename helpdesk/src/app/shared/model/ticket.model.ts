import { User } from './user.model'
import { ChangesStatus } from './change-status.model'

export class Ticket {

  constructor(
    public id: string,
    public number: number,
    public title: string,
    public status: string,
    public priority: string,
    public image: string,
    public user: User,
    public assignedUser: User,
    public date: string,
    public changes: Array<ChangesStatus>,
    public description: string
  ){ }
}
