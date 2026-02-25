import mongoose from 'mongoose'
import {EvmClientIp} from '../models/evmClientIp.js'
import { info } from 'node:console';
import {generateKey} from 'node:crypto'
import { randomInt } from 'node:crypto';






const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/evmClientIpTable' 

// Dummy data for validation
//
//
//
async function generateKeyHMAC() {
	// Generate a random key 
	return new Promise((resolve , reject) => {
		generateKey('hmac',{length : 512 } , (err,key) => {
		if (err) throw err;
		else resolve(key);
		})
	});
}
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
//
//
//

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
