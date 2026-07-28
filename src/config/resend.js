import { Resend } from "resend";

let client = null;

export function getResendClient() {
    if (!client) {
        if (!process.env.RESEND_API_KEY) {
            throw new Error("Missing RESEND_API_KEY.");
        }

        client = new Resend(process.env.RESEND_API_KEY);
    }

    return client;
}