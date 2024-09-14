import { Queue, Worker } from 'bullmq';
import { applyToJob } from './controller/jobController.js';
import secondaryConnection from './config/db.second.connection.js';
import dotenv from "dotenv";
import express from 'express'
import { io } from 'socket.io-client';

const app = express();

dotenv.config({ path: "./config/config.env" });



export const socket = io('http://localhost:4001/'); // Connect to primary server



const port = process.env.PORT || 5000;


// server
app.listen(port, async () => {
    console.log(`worker is running at http://localhost:${port}`);

    await secondaryConnection(process.env.DB_URI_APP, {});

});



socket.on('connect', () => {
    console.log('Client 2 connected');

    socket.emit('message', 'Hello from Client 2!');
});

 


// Create a BullMQ adapter with host and port
const adapter = {
    connection: {
        host: '127.0.0.1',
        port: 6379
    }
};

const queueName = 'worker_1_clients'; 

// processing active clients from queue
const worker = new Worker(queueName, async (job) => {
    try {
        // building queue name
        const clientQueueName = `queue_${JSON.parse(job.name)}`

        // worker for processing queue request;
        const subworker = new Worker(clientQueueName, async (job2) => {
            // hitting api
            const res = await applyToJob(JSON.parse(job2.name), JSON.parse(job.name));
 
        }, adapter);

    } catch (error) {
        console.log(error);
    }

}, adapter);

 