export declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
export declare class User {
    id: string;
    username: string;
    passwordHash: string;
    role: UserRole;
    isActive: boolean;
    currentHashedRefreshToken?: string;
    createdAt: Date;
}
