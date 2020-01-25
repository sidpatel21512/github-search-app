// System imports
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, noop } from 'rxjs';
import { Constants } from '../common/constants/constants';

export class ExceptionHandler {

  public static handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('client-side or network error: ', error.error.message);
    } else if (error instanceof HttpErrorResponse) {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `status code: ${error.status}, ` +
        `status text: ${error.statusText}, ` +
        `body was: ${error.error}, ` +
        `error message: ${error.message}`);
      if (error.status >= 400 && error.status <= 499) {
        // Client make mistake
        switch (error.status) {
          case 400:
            // Directly throw the error message that back-end provides.
            return throwError(error.error);
          default:
            return throwError(error);
        }
      } else if (error.status >= 500 && error.status <= 599) {
        // Server make mistake
        switch (error.status) {
          case 500:
            return throwError('Internal server error');
          // No need for default case, let it be throw default error message.
        }
      } else {
        // Write it for code-coverage branch missing
        noop();
      }

    } else {
      console.log(`Error Message: ${error.message}`);
      console.error(`Error Message Stack: ${error.stack}`);
    }

    // Return an observable with a user-facing error message
    return throwError(Constants.genericToasterErrorMessage);
  }
}