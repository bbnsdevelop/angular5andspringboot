import { Observable } from 'rxjs';

export interface ProfileService {

  getProfiles(): Observable<any>;
}
