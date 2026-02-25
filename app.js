import express, { json } from 'express';
import electionRoutes from './routes/election.route.js';
import candidateRoutes from './routes/candidate.route.js';
import voterRoutes from './routes/voter.route.js';
import voteRoutes from './routes/vote.route.js';


const app = express();
app.use(json());

app.use('/election',electionRoutes);
app.use('/candidate',candidateRoutes);
app.use('/voter',voterRoutes);
app.use('/vote',voteRoutes);

const new = express()


export default app;
