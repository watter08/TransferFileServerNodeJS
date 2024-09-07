import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const port = process.env.PORT || 4125;


/////////////////////////////////////
// Middleware
////////////////////////////////////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});