const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const graphqlServer = require('./src/graphQl');
const { expressMiddleware } = require("@as-integrations/express5");
const { decodeJWTToken } = require('./src/graphQl/services/user.service');

const startServer = async () => {
    const app = express();

    await graphqlServer.start();
    app.use(cors());
    app.use(express.json());
   
    app.use("/graphql",express.json() ,expressMiddleware(graphqlServer, {
        context : async ({ req }) =>{
            const token = req.headers['authorization'];
            try {
                const user = decodeJWTToken(token);
                if (!user) {
                    return {};
                }
                return { user };
            } catch (error) {
                return {};
            }
        }
    }));

    app.get("/", (req, res) => {
        res.send("server is running");
    });

    const PORT = process.env.PORT || 4000;
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://writer:weFpnETyqS@176.57.184.23:27017/graphqlTest?authSource=graphqlTest';

    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}/graphql`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
}

startServer()