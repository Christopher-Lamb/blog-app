import axios, { AxiosResponse } from "axios";

const baseURL = "http://localhost:8001";

interface Blog {
  title: string;
  slug: string;
  draft?: [];
}

interface BlogItem {
  type: string;
  content: string;
  src?: string | ArrayBuffer;
}

export const createBlog = async <T>(): Promise<T> => {
  try {
    // Pass the user data as the second argument to axios.post

    const response: AxiosResponse<T> = await axios.post(`${baseURL}/blog/`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error during Blog Creation");
  }
};

export const initAuthorsBlogs = async <T>(): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.post(`${baseURL}/blog/byAuthor`, {}, { withCredentials: true });
    return response.data;
  } catch (err) {
    throw new Error("Couldnt Get Authors Blogs");
  }
};

export const getDraftBySlug = async <T>(slug: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.post(`${baseURL}/blog/draftBySlug`, { slug }, { withCredentials: true });
    console.log({ response });
    return response.data;
  } catch (err) {
    throw new Error("Couldnt Get Authors Blogs");
  }
};

export const deleteAllUserBlogs = async <T>(): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.delete(`${baseURL}/blog/deleteAll`, { withCredentials: true });
    return response.data;
  } catch (err) {
    throw new Error("Couldnt Delete All Blogs :/");
  }
};

export const updateDraftBySlug = async <T>(slug: string, draft: BlogItem[]): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.patch(`${baseURL}/blog/draftBySlug`, { slug, draft }, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error("Oopsie Blog Didnt update something went wrong >:(");
  }
};

export const updateSlugBySlug = async <T>(oldSlug: string, newSlug: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.patch(`${baseURL}/blog/slugBySlug`, { oldSlug, newSlug }, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error("Oopsie Slug Didnt update something went wrong >:(");
  }
};

export const publishBlog = async <T>(slug: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.post(`${baseURL}/blog/publish-blog`, { slug }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log({ error });
    throw new Error("Couldnt get blog post...XD");
  }
};

export const getPublishedBlogsByAuthor = async <T>(): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.post(`${baseURL}/blog/published-by-author`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log({ error });
    throw new Error("Couldnt get blog post...XD");
  }
};

export const deleteBlog = async <T>(slug: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.post(`${baseURL}/blog/deleteBySlug`, { slug }, { withCredentials: true });
    console.log({ response });
    return response.data;
  } catch (error) {
    console.log({ error });
    throw new Error("Couldnt delete blog..XD");
  }
};
export const unpublishBlog = async <T>(slug: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.post(`${baseURL}/blog/unpublish-blog`, { slug }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log({ error });
    throw new Error("Couldnt get blog post...XD");
  }
};
