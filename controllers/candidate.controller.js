import prisma from '../prisma/client';

// Add a new candidate to an election

exports.addCandidate = async (req, res) => {
    try {
        const { electionID, candidateID, name, party, symbol } = req.body;

        const Candidate = await prisma.candidate.create({
            data: {
                electionID,
                candidateID,
                name,
                party,
                symbol,
            }
        });

        res.status(201).json(Candidate);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getElection = async (req, res) =>{
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

