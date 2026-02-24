import {encrypt} from  './utils/encrypt.js'
import express from 'express'
import https from 'https';
import { WebSocketServer } from 'ws';
import fs from 'fs';
import {randomInt} from 'crypto';
import {verifyClient} from './utils/verify.js'

const app= express();

app.use(express.json());

const options = {
	key : fs.readFileSync('private-key.pem'),
	cert : fs.readFileSync('certificate.pem'),
	requestCert: true,
	rejectUnauthorized : false,
};


const server = https.createServer(options,app).listen(443,() => {

	console.log("Server started at port 443");


});

const wss = new WebSocketServer({noServer : true});

// Handle WebSocket Connection

wss.on('connection',(ws,req) => {
    ws.ip  = req.socket.remoteAddress;
    let token = null;
    ws.on('message',(message)=> {
	const data = JSON.parse(message.toString());
	const type = data.type;
	switch (type) {
	  case "initProc":
	     // Look up the data using  prisma
 	     const publicKey = ...
	    // Random number to generate the token to the 
	      token = randomInt(0,1e9+7);

	     encryptedData = encrypt(token, publicKey);
	     ws.send(JSON.stringify(encryptedData));
	     break;

	  case "recievePayload" :
		const recievedToken = data.token;

		if (!token || recievedToken !== token) {
    			ws.send(JSON.stringify({code: 401,data: "Unauthorized"}));

    			ws.close(1008, "Unauthorized");
    			return;
		}
		// Get the payload
		const  payload = data.paylaod; 
		if (payload === undefined ) {
		   ws.send(JSON.stringify({code : 1002,data : "Malformed paylaod"}));
		   ws.close(1008,"Malformed packet recieved");
		}

		token = null;
		// Prisma db here



		// Please handle and return any error if you find any

		ws.send(JSON.stringify({code : 200 , data : "Success"}));


	}


   })

});




server.on('upgrade', async function upgrade(request, socket, head) {
  const cert = socket.getPeerCertificate();
  let args;

  try {
    args = await verifyClient(cert,socket.remoteAddress);
  } catch (e) {
    socket.destroy();
    return;
  }

  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request, ...args);
  });
})
