import { ExceptionHandler } from './exception-handler';
import { Observable } from 'rxjs';
import { fail } from 'assert';
import { Constants } from '../common/constants/constants';
import { HttpErrorResponse } from '@angular/common/http';

describe('ExceptionHandler', () => {
  beforeEach(() => {
    spyOn(console, 'error');
    spyOn(console, 'log');
  });

  it('should have client-side error and return default error message', () => {
    const errorEvent = {
      error: new ErrorEvent('type')
    };
    const errorMessage = ExceptionHandler.handleError(errorEvent);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(errorMessage instanceof Observable).toBeTruthy('errorMessage type is not observable');
    errorMessage.subscribe(() => {
      fail('Error message promise success');
    }, ((message: string) => {
      expect(message).toEqual(Constants.genericToasterErrorMessage, 'Generic error message is changed');
    }));
  });

  it('should have HttpErrorResponse error with 400 status code return specific error message', () => {
    const httpErrorResponse = new HttpErrorResponse({
      status: 400,
      statusText: 'Bad Request',
      error: {
        message: 'client make mistake'
      }
    });
    const errorMessage = ExceptionHandler.handleError(httpErrorResponse);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(errorMessage instanceof Observable).toBeTruthy('errorMessage type is not observable');
    errorMessage.subscribe(() => {
      fail('Error message promise success');
    }, ((e: any) => {
      expect(e.message).toEqual('client make mistake', '400 case error message is changed');
    }));
  });

  it('should have HttpErrorResponse error with 4xx status code for default case return specific error message', () => {
    const httpErrorResponse = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
      error: {
        message: 'client make mistake'
      }
    });
    const errorMessage = ExceptionHandler.handleError(httpErrorResponse);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(errorMessage instanceof Observable).toBeTruthy('errorMessage type is not observable');
    errorMessage.subscribe(() => {
      fail('Error message promise success');
    }, ((message: HttpErrorResponse) => {
      expect(message).toEqual(httpErrorResponse, '4xx case error message is changed');
    }));
  });

  it('should have HttpErrorResponse error with 500 status code return specific error message', () => {
    const httpErrorResponse = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error',
      error: {
        message: 'server make mistake'
      }
    });
    const errorMessage = ExceptionHandler.handleError(httpErrorResponse);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(errorMessage instanceof Observable).toBeTruthy('errorMessage type is not observable');
    errorMessage.subscribe(() => {
      fail('Error message promise success');
    }, ((message: string) => {
      expect(message).toEqual('Internal server error', '500 case error message is changed');
    }));
  });

  it('should have HttpErrorResponse error with 5xx status code for default case return generic error message', () => {
    const httpErrorResponse = new HttpErrorResponse({
      status: 502,
      statusText: 'Bad Gateway',
      error: {
        message: 'server make mistake'
      }
    });
    const errorMessage = ExceptionHandler.handleError(httpErrorResponse);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(errorMessage instanceof Observable).toBeTruthy('errorMessage type is not observable');
    errorMessage.subscribe(() => {
      fail('Error message promise success');
    }, ((message: string) => {
      expect(message).toEqual(
        Constants.genericToasterErrorMessage,
        '5xx case error message is changed');
    }));
  });

  it('should have HttpErrorResponse error except 4xx, 5xx status code return generic error message', () => {
    const httpErrorResponse = new HttpErrorResponse({
      status: 301,
      statusText: 'Moved Permanently',
      error: {
        message: 'No one make mistake'
      }
    });
    const errorMessage = ExceptionHandler.handleError(httpErrorResponse);
    expect(errorMessage instanceof Observable).toBeTruthy('errorMessage type is not observable');
    errorMessage.subscribe(() => {
      fail('Error message promise success');
    }, ((message: string) => {
      expect(message).toEqual(
        Constants.genericToasterErrorMessage,
        '3xx case error message is changed');
    }));
  });

  it('should have unhandle error and return default error message', () => {
    const errorEvent = {
      error: 'error',
      message: 'message',
      stack: 'stack'
    };
    const errorMessage = ExceptionHandler.handleError(errorEvent);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(errorMessage instanceof Observable).toBeTruthy('errorMessage type is not observable');
    errorMessage.subscribe(() => {
      fail('Error message promise success');
    }, ((message: string) => {
      expect(message).toEqual(Constants.genericToasterErrorMessage, 'Generic error message is changed');
    }));
  });
});
