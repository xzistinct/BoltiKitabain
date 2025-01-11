export const login = (username: string, password: string) => {
  const response: { success: boolean; token: null | string; message: string } =
    { success: false, token: null, message: "" };

  if (username === "admin" && password === "admin") {
    response.success = true;
    response.token = "token";
    return response;
  }
  response.message = "Invalid username or password";
  response.success = false;
  return response;
};
