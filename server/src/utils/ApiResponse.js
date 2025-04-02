class ApiResponse {
  constructor(
    statusCode,
    data,
    message = "Successful! This is default message"
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export default ApiResponse;
