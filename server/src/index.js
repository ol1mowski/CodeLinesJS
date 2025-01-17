import express from 'express';
import cors from 'cors';
import groupsRouter from './routes/groups.routes.js';
import rankingRouter from './routes/ranking.routes.js';
import trendingRouter from './routes/trending.routes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/groups', groupsRouter);
app.use('/ranking', rankingRouter);
app.use('/trending', trendingRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 