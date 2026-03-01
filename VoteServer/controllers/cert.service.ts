import * as crypto from "crypto";
import {getDb } from "../data/database.ts"

export function certToFingeprint(certPem : string) :string  {
  const certBody  : string = certPem
  .replace(/-----BEGIN CERTIFICATE-----/g, "")
  .replace(/-----END CERTIFICATE-----/g, "")
  .replace(/\s+/g, "");
    
  const certBuffer: Buffer = Buffer.from(certBody, "base64");
  return crypto.createHash("sha256").update(certBuffer).digest("hex");

}


export async function searchFingerPrint(cert : string ) : Promise<boolean> {
  try {
    const fingerprint = certToFingeprint(cert);
    const certExists = await 
    const collection = db.collection<CertificateDoc>("certificates");
    const certDoc = await collection.findOne({fingerprint});
  }
     


}
