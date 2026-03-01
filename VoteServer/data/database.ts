import { MongoClient ,Db, MongoGridFSChunkError} from "mongodb";


//  DOCKER
const uri : string = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";

export const client : MongoClient = new MongoClient(uri);

export function getDb() : Db {
	return client.db("clientCreds");
}
