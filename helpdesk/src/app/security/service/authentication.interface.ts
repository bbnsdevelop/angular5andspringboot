import { Observable } from 'rxjs';
export interface AuthenticationService {

  isAuthentication(): Observable<any>;
}
