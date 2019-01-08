import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared/service/impl/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'helpdesk';

  showTemplate: boolean = false;
  public shared: SharedService;

  constructor(){
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.shared.showTemplate.subscribe(
      show => this.showTemplate = show
    );
  }

}
