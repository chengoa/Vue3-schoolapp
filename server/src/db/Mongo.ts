import { MongoClient } from "mongodb"

const uri = "mongodb://localhost:27017";

const options = {
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 100000
}

export const Connect = () : Promise<MongoClient> => {
    return new Promise((resolve,reject) =>{
        // 单例
        MongoClient.connect(uri,options,(err,db:any) =>{
            if(err){
                reject(err)
            }else{
                resolve(db)
            }
        })
    })
}
