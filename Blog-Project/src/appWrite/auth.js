import config from '../config/config';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);

    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("AuthService :: createAccount :: Error:", error);
            throw new Error("Failed to create account. Please try again.");
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.error("AuthService :: login :: Error:", error);
            throw new Error("Login failed. Please check your credentials.");
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("AuthService :: getCurrentUser :: Error:", error);
            if (error.code === 401) { // Unauthorized - no user logged in
                return null;
            }
            throw new Error("Failed to get current user. Please try again.");
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
            throw new Error("Failed to log out. Please try again.");
        }
    }
}

const authService = new AuthService();

export default authService;