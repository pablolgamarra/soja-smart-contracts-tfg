import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from '@routes/index.ts';

dotenv.config();
console.log(process.env.RELAYER_KEY)

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend corriendo en puerto ${PORT}`));

export default app;