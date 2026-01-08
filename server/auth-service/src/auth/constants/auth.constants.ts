export const AUTH_MESSAGES = {
    USER_ALREADY_EXISTS: 'User already exists',
    DEFAULT_ROLE_NOT_FOUND: 'Default role not found',
    INVALID_CREDENTIALS: 'Invalid credentials',
} as const;

export const JWT_CONFIG = {
    ACCESS_TOKEN_EXPIRATION: '1d',
    REFRESH_TOKEN_EXPIRATION: '7d',
} as const;

export const ROLES = {
    CLIENT: 'Client',
} as const;
