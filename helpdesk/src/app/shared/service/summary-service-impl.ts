import { Observable } from 'rxjs';

export interface SummaryService{

  summary():Observable<any>;

}
