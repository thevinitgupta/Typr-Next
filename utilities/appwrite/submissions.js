import { getAppwriteClient } from "@/cloud/appwrite"
import { getCurrentUser } from "./user";
import { Databases, ID, Permission, Role, Query } from "appwrite";

export const createSubmission = async (submission) => {
    try {
        const client = getAppwriteClient();
        const databases = new Databases(client);
        const databaseID = process.env.NEXT_PUBLIC_DATABASE_ID;
        const collectionID = process.env.NEXT_PUBLIC_COLLECTION_ID;
        const userId = (await getCurrentUser()).data.userId;
        const doc = await databases.createDocument(databaseID, collectionID, ID.unique(), {
            ...submission,
            owner : userId
        }, 
            [
                Permission.read(Role.user(userId)),
                Permission.update(Role.user(userId)),
            ]
        );
        console.log(doc);
        if(!doc["$id"]){
            throw new Error("Submission Failed");
        }
        return {
            status : 201,
            message : "Submission Successfull",
            data : {
                id : doc["$id"]
            },
            error : null
        }
    } catch (error) {
        console.log(error)
        return {
            status : error.status ?? 500,
            message : "Submission Failed",
            data : null,
            error : error
        }
    }
}

export const getUserSubmissions = async () => {
    try {
        const client = getAppwriteClient();
        const userId = (await getCurrentUser()).data.userId;
        const databases = new Databases(client);
        const databaseID = process.env.NEXT_PUBLIC_DATABASE_ID;
        const collectionID = process.env.NEXT_PUBLIC_COLLECTION_ID;
        const submissions = await databases.listDocuments(databaseID, collectionID,[Query.equal("owner", [userId])],);
        return {
            status : 200,
            message : "Fetched Submissions",
            submissions,
            error : null
        }
    } catch (error) {
        console.log(error)
        return {
            status : error.status ?? 500,
            message : "Fetching Submissions Failed",
            data : null,
            error : error
        }
    }
}