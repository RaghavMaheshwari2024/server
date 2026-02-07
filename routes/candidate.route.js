import express from 'express';
import * as controller from '../controllers/candidate.controller.js';

const router = express.Router();

// Creating a candidate
router.post('/', controller.createCandidate);

// Getting the candidate info
router.get('/:candidateId', controller.getCandidateInfo);

export default router;