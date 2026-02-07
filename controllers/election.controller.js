import prisma from '../config/db.js';

// Create a new election

export const createElection = async (req, res) => {
    try{
        const {electionId} = req.body;
        const newElection = await prisma.election.create({
            data: {
                electionId,
                status: "CREATED"
            }
        });
        res.status(201).json(newElection);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

export const updateElectionStatus = async (req, res) => {
    try{
        const {electionId, status} = req.body;
        const updated = await prisma.election.update({
            where: { electionId },
            data: { status }
        });

        res.status(200).json(updated);

    }catch(err){
        res.status(500).json({error: err.message});
    }
};

export const getElectionInfo = async (req, res) => {
    try{
        const {electionId} = req.params;
        const election = await prisma.election.findUnique({
            where: {electionId }
        });
        res.status(200).json(election);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

