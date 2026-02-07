import prisma from '../config/db.js';

// Register a new voter

export const registerVoter = async (req, res) => {
    try {
        const { electionID, voterID, authMetaRef } = req.body;

        const Voter = await prisma.voter.create({
            data: {
               electionID,
                voterID,
                authMetaRef,
                hasVoted: false
            }
        });

        res.status(201).json(Voter);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};