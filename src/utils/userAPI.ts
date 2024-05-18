import axios, { AxiosResponse } from "axios";

const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:8001/api" : "https://krispywebsites.com/api";

// Define a generic function for GET requests
export const fetchData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get(`${baseURL}${endpoint}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

interface User {
  name: string;
  username: string;
  email: string;
  password: string;
  profileImg?: string;
}

export const signupUser = async <T>({ name, username, email, password }: User): Promise<T> => {
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
    // console.log(response.status);
    return response.status;
  } catch (error) {
    throw new Error("Error during login");
  }
};

export const getUser = async <T>(): Promise<T> => {
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

// Updated function to accept a Partial<User> object for updating user details
export const updateUser = async <T>(userDetails: Partial<User>): Promise<T> => {
  try {
    // Assuming the endpoint and HTTP method might be different for an update operation
    const response: AxiosResponse<T> = await axios.patch(`${baseURL}/user`, userDetails, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error("Error Updating User");
  }
};
