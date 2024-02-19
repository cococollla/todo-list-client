class BaseApiService {
  private readonly domain: string;

  constructor() {
    this.domain = "http://localhost:8089/api/ToDoList";
  }

  protected async request<T>(
    path: string,
    method: string,
    data?: any
  ): Promise<T> {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const requestOptions: any = {
      method: method,
      headers: headers,
    };

    if (data) {
      requestOptions.body = JSON.stringify(data);
    }

    const response = await fetch(this.domain + path, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const responseBody = await response.text();
    return responseBody ? JSON.parse(responseBody) : undefined;
  }
}

export default BaseApiService;
