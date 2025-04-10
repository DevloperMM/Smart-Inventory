class ApiResponse {
  constructor(
    statusCode,
    apiData,
    message = "Successful! This is default message"
  ) {
    this.statusCode = statusCode;
    this.apiData = apiData;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export default ApiResponse;
