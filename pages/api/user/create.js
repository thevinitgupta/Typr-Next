import { createUser } from "@/utilities/appwrite/user";
export default async function handler(req,res){
    console.log(req.body, req.method);
    console.log(createUser)
    if(req.method!=='POST') {
        res.status(404).json({
            message : "Endpoint not found",
            data : null,
            error : new Error("POST Request Only")
        });
    }
    
        const {status, ...response} = await createUser(req,res);
        res.status(status).json({...response})
}

