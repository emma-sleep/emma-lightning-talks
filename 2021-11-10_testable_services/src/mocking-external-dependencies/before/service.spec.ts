import axios from "axios";
import { ApiCallingService } from "./service";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("ApiCallingService", () => {
  describe("callApi", () => {
    it("should return API call result", async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: "hello world" });

      const response = await new ApiCallingService().callApi();

      expect(response).toEqual("hello world");
    });
  });
});
