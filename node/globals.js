class APIError extends Error {
  constructor(status, ...params) {
    super(params);
    this.status = status;
  }
}
global.APIError = APIError;
