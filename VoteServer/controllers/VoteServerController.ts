import express, { Express } from "express";
import { MongoClient, Db, Collection, Document } from "mongodb";
import * as fs from "fs";
import * as https from "https";
import * as crypto from "crypto";

/* DATABASE CONNECTIONS                             */

const uri: string = "mongodb://127.0.0.1:27017";
const client: MongoClient = new MongoClient(uri);

// Optional: Define an interface for what your MongoDB document looks like
interface CertificateDoc extends Document {
    fingerprint: string;
}

/* FUNCTION TO CONVERT THE CERTIFICATE TO A FINGERPRINT     */

// Note: Removed 'async' because none of the crypto operations here are asynchronous.
// If you keep 'async', the return type would be Promise<string>.
function certToFingerprint(certPem: string): string {
    const certBody: string = certPem
        .replace(/-----BEGIN CERTIFICATE-----/, "")
        .replace(/-----END CERTIFICATE-----/, "")
        .replace(/\s+/g, "");
    
    const certBuffer: Buffer = Buffer.from(certBody, "base64");
    const fingerprint: string = crypto.createHash("sha256").update(certBuffer).digest("hex");
    
    return fingerprint;
}

/* FUNCTION TO SEARCH FOR FINGERPRINT                   */

async function searchFingerPrint(fingerprint: string): Promise<void> {
    try {
        await client.connect();
        const db: Db = client.db("clientCreds"); // Database name
        const collection: Collection<CertificateDoc> = db.collection<CertificateDoc>("certificates");

        // search by fingerprint
        const certDoc = await collection.findOne({ fingerprint });
        
        if (certDoc) {
            console.log("Certificate found !");
        } else {
            console.log("Certificate not found in database");
        }
    } catch (err: unknown) {
        console.error("Error : ", err);
    } finally {
        await client.close();
    }
}

/* FUNCTION TO CHECK FOR CLIENT'S CREDENTIALS           */

const app: Express = express();

app.use(express.json());

const options: https.ServerOptions = {
    key: fs.readFileSync('private-key.pem'),
    cert: fs.readFileSync('certificate.pem'),
    requestCert: true,
    // rejectUnauthorized: false // Uncomment this if you want to handle verification manually in the app
};

app.post("/","");



const server = https.createServer(options, app).listen(443, () => {
    console.log("Server started at port 443");
});



