import { z } from "zod";

export enum EncryptionMethod {
    AES256 = "AES256",
    Chacha20 = "Chacha20",
    Blowfish = "Blowfish",
    DESTripleDES = "DESTripleDES",
}

export const loginSchema = z.object({
    email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

    password: z.string()
    .min(6, { message: "Password should be at least 6 characters long" }),
})


export const registerSchema = z.object({
    email: z.string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
        
        name: z.string()
        .min(1, { message: "Name is required" }),
        
        password: z.string()
        .min(6, { message: "Password should be at least 6 characters long" }),
        
        passwordConfirm: z.string()
        .min(1, { message: "Password confirmation is required" }),
    }).refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match",
    path: ["passwordConfirm"]
});


export const userDataSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required" 
    }),
    email: z.string().min(1, {
        message: "Email is required",
    }).email({ message: "Invalid email address" }),
});


export const passwordChangeSchema = z.object({
    oldpassword: z.string()
    .min(6, { message: "Password should be at least 6 characters long" }),
    newpassword: z.string()
    .min(6, { message: "Password should be at least 6 characters long" }),
    
    newpasswordConfirm: z.string()
    .min(1, { message: "Password confirmation is required" }),
}).refine((data) => data.newpassword === data.newpasswordConfirm, {
    message: "Passwords do not match",
    path: ["newpasswordConfirm"]
});

export const userDatabaseSchema = z.object({
    host: z.string()
    .min(1, { message: "Host is required" }),
    username: z.string()
    .min(1, { message: "Username is required" }),
    password: z.string()
    .min(1, { message: "Password is required" }),
    database: z.string()
    .min(1, { message: "Database name is required" }),
    port: z.number()
    .int()  // Ensures it's an integer
    .min(1, { message: "Port must be greater than 0" })  // Minimum valid port
    .max(65535, { message: "Port must be less than or equal to 65535" }),
});

export const addSecertSchema = z.object({
    values: z.array(z.object({
        secret_name: z.string().min(1, "secret name is required"),
        secret_value: z.string().min(1, 'Secret value is required'),
    })).default([{
        secret_name: '',
        secret_value: '',
    }]),
})

export const updateSecertSchema = z.object({
    secret_name: z.string().min(1, "secret name is required"),
    secret_value: z.string().min(1, 'Secret value is required'),
    id: z.string(),
})

export const userEncryptionSchema = z.object({
    encryption_method: z.enum([EncryptionMethod.AES256, EncryptionMethod.Blowfish, EncryptionMethod.Chacha20, EncryptionMethod.DESTripleDES])
})

export type LoginSchema = typeof loginSchema;
export type RegisterSchema = typeof registerSchema;
export type UserDataSchema = typeof userDataSchema;
export type PasswordChangeSchema = typeof passwordChangeSchema;