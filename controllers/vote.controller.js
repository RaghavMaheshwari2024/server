import prisma from '../config/db';

// submit a vote

exports.submitVote = async(req, res) => {
    try{
        const{
            electionID,
            payloadID,
            encryptedPayload,
            encryptedMask,
            secretShare,
            f,
            voterID
        } = req.body;

        const voter = await prisma.voter.findUnique({
            where: {
                electionID_voterID: {
                electionID,
                voterID
                }
            }
        });

        if(!voter || voter.hasVoted){
            return res.status(400).json({error: "Voter not eligible to vote"});
        }

        await prisma.VotePayload.create({
            data: {
                electionID,
                payloadID,
                encryptedPayload,
                encryptedMask,
                secretShare,
                f
            }
        });

        await prisma.voter.update({
            where: {
                electionID_voterID: {
                    electionID,
                    voterID
                }
            },
            data: {
                hasVoted: true
            }
        });

        res.json({message: "Vote submitted successfully"}); 
    
    }catch(err){
        console.error("Error submitting vote:", err);
        res.status(500).json({error: "Internal server error"});
    }
};

