import {Observable, of} from "rxjs";

export class Handel {

  /**
   * error
   * @param classStr string
   * @param methodeStr string
   * @param massageUser
   * @param result HandelError
   */
  static error<T>(classStr: string, methodeStr: string, massageUser: string, result?: T) {
    const errorClass = Handel.operation(classStr, methodeStr)
    return (error: any): Observable<T> => {
      console.error(`
      ERROR : ${errorClass}
      STATUS : ${error.status}
      MESSAGE CODE : ${massageUser}
      MESSAGE ERROR : ${error.message}
      FULL TEXT : ${error}
      `)
      return of(result as T);
    };
  }

  private static operation(strClass: string = 'operation' ,method: string): string {
    return `[ ${strClass} ] - ${method} : `;
  }
}
