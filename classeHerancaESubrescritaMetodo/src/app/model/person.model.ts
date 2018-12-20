export class Person{

  private name: string;

  constructor(name: string){
    this.name = name;
  }

  public showPerson(): any {
    console.log(this.name);
  }
}
