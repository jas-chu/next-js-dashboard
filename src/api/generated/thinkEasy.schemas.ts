/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * ThinkEasy
 * Test Task BE
 * OpenAPI spec version: 1.0
 */
export interface PostResponse {
  authorId: string;
  content: string;
  createdAt: string;
  id: string;
  published: boolean;
  title: string;
  updatedAt: string;
}

export type PostResponceContent = { [key: string]: unknown };

export type PostResponceAuthor = { [key: string]: unknown };

export interface PostResponce {
  author: PostResponceAuthor;
  content: PostResponceContent;
  published: boolean;
  title: string;
}

export interface CreatePostInput {
  content: string;
  title: string;
}

export interface RefreshResponceModel {
  access_token: string;
}

export interface RefreshTokenInput {
  token: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface Auth {
  accessToken: string;
  refreshToken: string;
}

export interface SignupInput {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

