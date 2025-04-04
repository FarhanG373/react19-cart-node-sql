import express from 'express';
import cors from 'cors';
import authRoutes   from './Router/authRoutes.js';
import prodRoutes   from './Router/prodRoutes.js';
const PORT = 9090;


const app = express();
app.use(express.json());
app.use(cors());


app.use("/uploads", express.static("./uploads"));

app.use('/auth',authRoutes );
app.use('/product',prodRoutes );

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});