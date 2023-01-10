import { userModel } from "../models/user.model";
import { getUsers } from "../services/user.service";

jest.mock("../models/user.model");

const dummy_data = {
  _id: 1,
  username: "Jone Doe",
  email: "jonedoe@gmail.com",
};

describe("Get User's detail", () => {
  it("should return status code of 200 on fetching users successfully", async () => {
    (userModel.find as jest.Mock).mockResolvedValueOnce([{ ...dummy_data }]);

    const response = await getUsers();

    expect(response.status).toBe(200);
    expect(response.data).toEqual([{ ...dummy_data }]);
  });

  it("should return status code of 500 on bad request.", async () => {
    (userModel.find as jest.Mock).mockRejectedValueOnce(undefined);

    const response = await getUsers();

    expect(response.status).toBe(500);
    expect(response.data).toEqual({ message: "Something went wrong." });
  });
});
