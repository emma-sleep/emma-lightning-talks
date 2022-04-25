import axios from "axios";

export class ApiCallingService {
  async callApi(): Promise<string> {
    return (await axios.get("my-uri")).data;
  }
}
