

const crypto = require('crypto')
/*

	Public Key format is .PEM

*/




export function encrypt(message,publicKey) {
  const buffer = Buffer.from(message,'utf-8'); // Initialization
  const encryptedData = crypto.publicEncrypt(
	  {
          	key : publicKey,
  	  	padding : crypto.constants.RSA_PKCS1_OAEP_PADDING,
	  	oaepHash : "sha256"
  	  },
	buffer
   );
  return encryptedData;



}

