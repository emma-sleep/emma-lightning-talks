import { AxiosInstance } from "axios";
import { mock } from "jest-mock-extended";
import { ApiCallingService } from "./service";

describe("ApiCallingService", () => {
  describe("callApi", () => {
    it("should return API call result", async () => {
      const mockedAxios = mock<AxiosInstance>();
      mockedAxios.get.mockResolvedValueOnce({ data: "hello world" });

      const response = await new ApiCallingService(mockedAxios).callApi();

      expect(response).toEqual("hello world");
    });
  });
});
