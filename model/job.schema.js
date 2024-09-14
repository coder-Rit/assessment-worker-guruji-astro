import mongoose from 'mongoose';
 
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Job title is required"],
        trim: true,
        maxLength: [100, "Job title cannot exceed 100 characters"]
    },
    company: {
        type: String,
        required: [true, "Company name is required"],
        trim: true,
        maxLength: [100, "Company name cannot exceed 100 characters"]
    },
    applied:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    salary: {
        type: Number,
        required: false
    },
    postedAt: {
        type: Date,
        default: Date.now
    }
});

const jobModel = mongoose.model('job', jobSchema);

export default jobModel;
