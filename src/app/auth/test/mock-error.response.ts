import { HttpErrorResponse } from '@angular/common/http';
export const mockErrorResponse = new HttpErrorResponse({
  error: {
    status_message: 'Error Message',
    status_code: 404,
  },
  statusText: 'Not found',
  status: 400,
  url: 'test.com',
});
export const mockExpectederror = {
  status_message: 'Error Message',
  status_code: 404,
};
