import { getAppwriteClient } from "@/cloud/appwrite";
const { Account, ID} = require("appwrite");


export const createUser = async (data) => {
    const {email,
        password,
        name} = data;
    try {
        const client = getAppwriteClient();
        const account = new Account(client);
        if(!email || !password || !name){
            return {
                status : 400,
                message : "Email/Password/Name missing",
                data : null,
                error : new Error("Credentials Missing")
            }
        }
        const result = await account.create(
            ID.unique(),
            email,
            password,
            name
        );
        return {
            status : 201,
            message : "Account Created",
            data : result,
            error : null
        };
    } catch (error) {
        console.log(error);
        if(error.name && error.name==='AppwriteException'){
            return {
                status : error.code,
                message : error.response.message,
                data : null,
                error
            }
        }
        return {
            status : 500,
            message : "Account not created",
            data : null,
            error
        };
    }
}
export const createSession = async (data) => {
    const {email,
        password} = data;
    try {
        const client = getAppwriteClient();
        const account = new Account(client);
        if(!email || !password){
            return {
                status : 400,
                message : "Email/Password missing",
                data : null,
                error : new Error("Credentials Missing")
            }
        }
        const result = await account.createEmailSession(
            email,
            password,
        );
        return {
            status : 201,
            message : "Session Created",
            data : result,
            error : null
        };
    } catch (error) {
        console.log(error);
        if(error.name && error.name==='AppwriteException'){
            return {
                status : error.code,
                message : error.response.message,
                data : null,
                error
            }
        }
        return {
            status : 500,
            message : "Account not created",
            data : null,
            error
        };
    }
}

export const getCurrentUser = async () => {
    try {
        const client = getAppwriteClient();
        const account = new Account(client);
        const {name, email} = await account.get(); 
        return {
            status : 201,
            message : "Session Created",
            data : {
                name,
                email
            },
            error : null
        };

    } catch (error) {
        console.log(error);
        if(error.name && error.name==='AppwriteException'){
            return {
                status : error.code,
                message : error.response.message,
                data : null,
                error
            }
        }
        return {
            status : 500,
            message : "Error Getting Account",
            data : null,
            error
        };
    }
}



