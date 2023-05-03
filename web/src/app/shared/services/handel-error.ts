import {Observable, of} from "rxjs";

export const handleError =<T>(operation = 'operation', result?: T) => {
  return (error: any): Observable<T> => {
    console.error(`
      ERROR : ${operation}
      STATUS : ${error.status}
      MESSAGE : ${error.message}
      FULL TEXT : ${error}
      `)
    return of(result as T);
  };
}
