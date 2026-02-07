import express from 'express';
import * as controller from '../controllers/election.controller.js';

const router = express.Router();

// Creating an election
router.post('/',controller.createElection);

// Updating the election status
router.patch('/status', controller.updateElectionStatus);

// Getting the election info
router.get('/:electionId', controller.getElectionInfo);

export default router;