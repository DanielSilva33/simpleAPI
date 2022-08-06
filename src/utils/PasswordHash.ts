import { hash } from "bcryptjs";
export class PasswordHash {
    async hash(password: string) {
        return hash(password, 8);
    }
}
