import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.BLOODAID_URI);
const db = client.db("BloodAid");

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    // socialProviders: {
    //     google: {
    //         clientId: process.env.GOOGLE_CLIENT_ID,
    //         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //     },
    // },
    user: {
        changeEmail: {
            enabled: true,
            updateEmailWithoutVerification: true
        },
        additionalFields: {
            district: {
            required: false,
            },
            upazila: {
            required: false,
            },
            role: {
            required: false,
            },
            bloodGroup: {
            required: false,
            },
            image: {
            required: false,
            },
        },
    },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
});
