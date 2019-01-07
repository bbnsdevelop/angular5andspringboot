import { Injectable } from '@angular/core';
import { SummaryService } from '../summary-service-impl';
import { HttpClient } from '@angular/common/http';
import { HELP_DESK_API } from '../../config/help-desk-api';

@Injectable({
  providedIn: 'root'
})
export class SummaryServiceImpl implements SummaryService{

  constructor(private http: HttpClient) { }

  private SUMMARYAPI = '/api/summary';

  summary(){
    return this.http.get(`${HELP_DESK_API}/${this.SUMMARYAPI}`);
  }
}
