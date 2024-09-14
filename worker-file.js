import { Queue, Worker } from 'bullmq';
import { applyToJob } from './controller/jobController.js';
import secondaryConnection from './config/db.second.connection.js';
import dotenv from "dotenv";
// Replace 'my-queue' with your actual queue name
import express from 'express'
import { io } from 'socket.io-client';

const app = express();
// Replace 'localhost' and '6379' with your actual host and port

dotenv.config({ path: "./config/config.env" });



export const socket = io('http://localhost:4001/'); // Connect to Server 1



const port = process.env.PORT || 5000;

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

// Create a worker
const worker = new Worker(queueName, async (job) => {
    // Access job data
    try {
        console.log(`job: ${job.name}`);
        const clientQueueName = `queue_${JSON.parse(job.name)}`

        console.log(clientQueueName);
        // const dynamicJob = await dynamicQueue.data;
        const subworker = new Worker(clientQueueName, async (job2) => {
            // Access job data
            console.log(`job: ${JSON.parse(job2.name)}`);
            const res = await applyToJob(JSON.parse(job2.name), JSON.parse(job.name));
 
        }, adapter);

    } catch (error) {
        console.log(error);

    }

}, adapter);

// Start the worker

// console.log("worker started");
// // worker.run();

// // worker.close();
// console.log("worker closed");