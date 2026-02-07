import prisma from '../config/db.js';

// Add a new candidate to an election

export const createCandidate = async (req, res) => {
    try {
        const { electionId, candidateId, name, party, symbol } = req.body;

        const Candidate = await prisma.candidate.create({
            data: {
                electionId,
                candidateId,
                name,
                party,
                symbol
            }
        });

        res.status(201).json(Candidate);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCandidateInfo = async (req, res) => {
    try {
        const { candidateId } = req.params;

        const candidate = await prisma.candidate.findUnique({
            where: { candidateId: candidateId }
        });

        res.json(candidate);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
