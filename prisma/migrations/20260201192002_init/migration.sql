-- CreateEnum
CREATE TYPE "ElectionStatus" AS ENUM ('CREATED', 'OPEN', 'CLOSED', 'FINALIZED');

-- CreateTable
CREATE TABLE "elections" (
    "electionId" TEXT NOT NULL,
    "status" "ElectionStatus" NOT NULL,

    CONSTRAINT "elections_pkey" PRIMARY KEY ("electionId")
);

-- CreateTable
CREATE TABLE "candidates" (
    "candidateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "party" TEXT,
    "symbol" TEXT,
    "electionId" TEXT NOT NULL,

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("candidateId")
);

-- CreateTable
CREATE TABLE "voter_records" (
    "id" SERIAL NOT NULL,
    "voterId" TEXT NOT NULL,
    "authMetaRef" TEXT NOT NULL,
    "hasVoted" BOOLEAN NOT NULL DEFAULT false,
    "electionId" TEXT NOT NULL,

    CONSTRAINT "voter_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vote_payloads" (
    "payloadId" TEXT NOT NULL,
    "encryptedPayload" BYTEA NOT NULL,
    "encryptedMask" BYTEA NOT NULL,
    "secretShare" BYTEA NOT NULL,
    "f" INTEGER NOT NULL,
    "electionId" TEXT NOT NULL,

    CONSTRAINT "vote_payloads_pkey" PRIMARY KEY ("payloadId")
);

-- CreateIndex
CREATE INDEX "candidates_electionId_idx" ON "candidates"("electionId");

-- CreateIndex
CREATE INDEX "voter_records_electionId_idx" ON "voter_records"("electionId");

-- CreateIndex
CREATE UNIQUE INDEX "voter_records_electionId_voterId_key" ON "voter_records"("electionId", "voterId");

-- CreateIndex
CREATE INDEX "vote_payloads_electionId_idx" ON "vote_payloads"("electionId");

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "elections"("electionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voter_records" ADD CONSTRAINT "voter_records_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "elections"("electionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote_payloads" ADD CONSTRAINT "vote_payloads_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "elections"("electionId") ON DELETE RESTRICT ON UPDATE CASCADE;
