import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => {console.log("Server is running  on port 5000 And Mongodb is successfully connected")}))
  .catch((err) => console.error(err));

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  jobType: String,
  salaryRange: String,
  description: String,
  responsibilities: [String],
  applicationDeadline: Date,
});

const Job = mongoose.model('Job', jobSchema);

app.get('/api/jobs', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

app.post('/api/jobs', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json(job);
});

