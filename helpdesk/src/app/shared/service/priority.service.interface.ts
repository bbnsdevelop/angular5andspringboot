import { Observable } from 'rxjs';

export interface PriorityService{

  findAllPriority(): Observable<any>;
}
