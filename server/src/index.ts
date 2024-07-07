import express from 'express';
import { authRouter } from './routes/auth';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(authRouter);

app.listen(PORT, () => {
  console.log(`[API] Server is running on port ${PORT}`);
});
