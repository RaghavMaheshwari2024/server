import mongoose from 'mongoose'
import {clientCreds} from '../models/clientCredentials.js'
import {generateKeyPairSync} from 'node:crypto'
import fs from 'fs'





const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/clientCredentials' 

const {privateKey , publicKey } = generateKeyPairSync("rsa", {
   modulusLength : 2048,
   publicKeyEncoding : {
	type : "spki",
	format : "pem",

   },
   privateKeyEncoding : {
	type : "pkcs8",
	format : "pem",

   }








});


:wq










var SEED_COUNT = 10;
async function connectDB() {
	
   try {
	await mongoose.connect(MONGODB_URI);
	console.log("connected");
	const entries = [];
	await EvmClientIp.deleteMany({});
	   for  (let  i = 0 ; i  < SEED_COUNT;i++) {
		const new_key = await generateKeyHMAC();
		const uuid = (1e9 +7 + i*i).toString();
		const electionId  = (1e9 + i).toString();
		const ipAddr = (`127.0.0.${i}`).toString();
		entries.push({uuid,electionId,ipAddr,pubKey : new_key.export().toString('hex')});

	}
	await EvmClientIp.insertMany(entries);
	console.log("Pushed all entries succesfully");
	await mongoose.disconnect(MONGODB_URI);
	console.log("Quitting the mongoDB server");
   
   }
   catch (err) {

     console.error("This is an error !" , err.message )
     process.exit(1)

   }

};

connectDB();
