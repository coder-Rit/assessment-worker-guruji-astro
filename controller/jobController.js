import JobModel from "../model/job.schema.js";
import { socket } from "../worker-file.js";

// apply to job
export const applyToJob = async (job_id, user_id) => {

    let jobdetails = {}
    setTimeout(() => {
        socket.emit("JOB_STATUS",{user_id,job_id});
    }, 1000);


    // try {
    //     // const updateJob = await JobModel.findOneAndUpdate(
    //     //     { _id: job_id },
    //     //     { $push: { applied: user_id } },
    //     //   );
      
    //     //   if (!updateJob) { 
    //     //     return { message: `Job with ID ${job_id} not found` };
    //     //   }
      
    //     //   return {
    //     //     message: `Successfully applied for ${updateJob.title} at ${updateJob.company}`,
    //     //   };

        

    // } catch (error) {

    //     return {
    //         message: `Failed to apply for ${job_id} `,
    //         error
    //     }
    // }
};



