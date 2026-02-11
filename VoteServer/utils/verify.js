// Import prisma libs here


export function verifyClient(cert , ipaddr) {
   // Use prisma to get the certificate at the position
   const fetchedCert = ....;
  // 
   if (cert !== fetchedCert || !cert) {
      throw new Error("Certificates do not match");

   }
   return null;



};
