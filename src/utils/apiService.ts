import axios, { AxiosResponse } from "axios";

const baseURL = "http://localhost:8001";

// Define a generic function for GET requests
export const fetchData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get(`${baseURL}${endpoint}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

interface SignupProps {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const signupUser = async <T>({ name, username, email, password }: SignupProps): Promise<T> => {
  try {
    // Pass the user data as the second argument to axios.post
    const response: AxiosResponse<T> = await axios.post(`${baseURL}/user/signup`, { name, username, email, password }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error during signup");
  }
};

interface LoginProps {
  identifier: string;
  password: string;
}

export const loginUser = async <T>({ identifier, password }: LoginProps): Promise<number> => {
  try {
    const response: AxiosResponse<T> = await axios.post(`${baseURL}/user/login`, { identifier, password }, { withCredentials: true });
    console.log(response.status);
    return response.status;
  } catch (error) {
    throw new Error("Error during login");
  }
};

export const getUsers = async <T>(): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get(`${baseURL}/user`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error("Error during get users");
  }
};

export const refreshToken = async <T>(): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.post(`${baseURL}/user/refresh-token`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error("Error Refresh Token");
  }
};
export const logoutUser = async <T>(): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.post(`${baseURL}/user/logout`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error("Error Logging Out");
  }
};
