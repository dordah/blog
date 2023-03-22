// Errors
export const OK = { status: 200, message: "OK" };
export const SERVER_ERROR = { status: 500, message: "Server error" };
export const POST_NOT_FOUND = { status: 404, message: "Post not found" };
export const USER_NOT_FOUND = { status: 404, message: "User not found" };
export const UNAUTHORIZED = { status: 401, message: "Unauthorized" };
export const CREATED = { status: 201, message: "Post created" };
export const BAD_REQUEST = { status: 400, message: "Bad request" };
export const WRONG_CREDENTIALS = { status: 400, message: "Wrong Credentials" };
export const FAILED_GENERATE_JWT = "Failed to generate JWT";

// Posts
export const MAX_POSTS_MAIN = 20;
