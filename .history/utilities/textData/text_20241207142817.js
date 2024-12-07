import axios from "axios"

export const fetchTyprData = async ({url, query, key, concat})=> {
    const DATA_API_KEY = process.env.NEXT_PUBLIC_DATA_API_KEY;

    try {
        const headers = {
            'X-Api-Key': DATA_API_KEY
          };
        const response = await axios.get(`${url}`,{
            headers: key==="words" ? "" : headers
        });
        const {data, status, message} = response;
        if(status!==200){
            throw new Error(message)
        }
        let result = "";
        if(concat===true) {
            result = merge(data,key);
        }
        else result = data[0][key];
        return {
            status : 200,
            message : "Typr String Created",
            data : result,
            error : null
        }
    } catch (error) {
        return {
            status : 500,
            message : error.message,
            data : null,
            error
        }
    }
}

const merge = (dataArray, key)=>{
    let result = "";
    dataArray.forEach((obj)=> {
        const str = obj[key].replace("."," ");
        result += str;
    })
    return result.trim();
}