import type { ApiResponseType, ApiSuccessType, AuthType, RequestBodyType, RequestHeadersType, RequestOptionsType, UserType } from '../interfaces/api';
import { isError } from '../interfaces/api';

const sendRequest = async <T>(path: string, method: string, body: RequestBodyType = {}, token: string | null = null) => {

  const headers: RequestHeadersType = { 'Content-type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const options: RequestOptionsType = { method, headers };
  if(body && Object.keys(body).length > 0) options['body'] = JSON.stringify(body);

  const url = `http://localhost:3000${path}`;

  const response = await fetch(url, options);
  const apiResponse: ApiResponseType<T> = await response.json();
  return new Promise<ApiSuccessType<T>>(function (resolve, reject) {
    if (isError(apiResponse)) reject(apiResponse);
    else resolve(apiResponse);
  });
};


const getUser = async (token: string) => {
  return sendRequest<UserType>('/api/getUser', 'GET', {}, token);
};

const register = async (username: string, email: string, password: string) => {
  const body = {
    username,
    email,
    password
  };

  return sendRequest<UserType>('/api/signup', 'POST', body);
};

const login = async (email: string, password: string) => {
  const body = {
    email,
    password
  };
  
  return sendRequest<AuthType>('/api/login', 'POST', body);
};

const getFriendList = async (token: string) => {
  return sendRequest<UserType[]>('/api/getFriendList', 'GET', {}, token);
};

const getFriendRequestList = async (token: string) => {
  return sendRequest<UserType[]>('/api/getFriendRequestsList', 'GET', {}, token);
};

const sendFriendRequest = async (token: string, username: string) => {
  const body = {
    username
  };

  return sendRequest<null>('/api/sendFriendRequest', 'POST', body, token);
};

const rejectFriendRequest = async (token: string, friendId: string) => {
  const body = {
    friendId
  };
  
  return sendRequest<null>('/api/rejectFriendRequest', 'POST', body, token);
};

const acceptFriendRequest = async (token: string, friendId: string) => {
  const body = {
    friendId
  };
  
  return sendRequest<null>('/api/acceptFriendRequest', 'POST', body, token);
};

export { register, login, getUser, getFriendList, getFriendRequestList, sendFriendRequest, rejectFriendRequest, acceptFriendRequest };