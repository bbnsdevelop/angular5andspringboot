
export class Utils {

  static classCss: string = '';

  public static buildClass(type: string){
    this.classCss = 'alert '+'alert-'+type
    return this.classCss;
  }

  public static getFormGroupClass(isValid: boolean, isDirty: boolean):{} {
    return{
      'form-group': true,
      'has-error': isValid && isDirty,
      'has-success': !isValid && isDirty
    };
  }

}
