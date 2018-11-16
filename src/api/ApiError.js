class ApiError {
  constructor(message, errors) {
    this.message = message;
    this.errors = errors;
  }
}

export default ApiError;
