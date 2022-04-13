import { AxiosInstance } from "axios";

export class ApiCallingService {
  constructor(private axios: AxiosInstance) {}

  async callApi(): Promise<string> {
    return (await this.axios.get("my-uri")).data;
  }
}
