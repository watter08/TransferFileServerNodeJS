import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './swaggerConfig';


dotenv.config();

const app = express();
const port = process.env.PORT || 4125;


//////////////////////////////////////
// Swagger Configuration
//////////////////////////////////////

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


////////////////////////////////////
// Routes
///////////////////////////////////
import userRoutes from './presentation/controllers/userRoutes';
app.use(userRoutes);


/////////////////////////////////////
// Middleware
////////////////////////////////////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});