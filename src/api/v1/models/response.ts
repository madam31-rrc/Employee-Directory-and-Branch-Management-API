export type SuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

export type ErrorResponse = {
  success: false;
  error: string;
  code?: number;
};

export type Response<T> = SuccessResponse<T> | ErrorResponse;