import { Schema, model } from "mongoose";

const adminSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
});

const Admin = model("admin", adminSchema);

export { Admin };
