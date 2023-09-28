import { Client } from "appwrite";

export const getAppwriteClient = () => {
    const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
    const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(PROJECT_ID);               // Your project ID
    return client;
}