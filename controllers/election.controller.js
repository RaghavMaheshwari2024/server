import prisma from '../config/db';

// Create a new election

exports.createElection = async (req, res) => {
    try{
        const {electionID} = req.body;
        const newElection = await prisma.election.create({
            data: {
                electionID,
                status: "CREATED"
            }
        });
        res.status(201).json(newElection);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.updateElectionStatus = async (req, res) => {
    try{
        const {electionID, status} = req.body;
        const updated = await prisma.election.update({
            where: { electionID },
            data: { status }
        });

        res.status(200).json(updated);

    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.getElection = async (req, res) => {
    try{
        const {electionID} = req.params;
        const election = await prisma.election.findUnique({
            where: { electionID }
        });
        res.status(200).json(election);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

