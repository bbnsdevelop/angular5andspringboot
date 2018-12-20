import { Component, OnInit } from '@angular/core';
import { Main } from './main/main';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'classeHerancaESubrescritaMetodo';
  main: Main = new Main();

  ngOnInit(): void {
    this.main.exec();
  }
}
