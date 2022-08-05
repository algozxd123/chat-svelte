export interface UserType {
  _id: string,
  username: string,
  password?: string,
  email?: string,
  friends?: string,
  friendRequests?: string,
};

export interface JwtType {
  token: string
};

export interface AuthType {
  user: UserType,
  jwt: JwtType
};

export interface MessageType {
  senderId: string,
  receiverId: string,
  text: string,
  createdAt: string
}

export interface ApiErrorType {
  error: string
};

export interface ApiSuccessType<T> {
  data?: T,
  message: string
};

export type RequestBodyType = Record<string, unknown>;
export type RequestHeadersType = Record<string, string>;

export interface RequestOptionsType {
  method: string,
  headers: RequestHeadersType,
  body?: string
}

export const isError = (response: ApiResponseType<unknown>): response is ApiErrorType => {
  return (response as ApiErrorType).error !== undefined;
}

export type ApiResponseType<T> = ApiErrorType | ApiSuccessType<T>;