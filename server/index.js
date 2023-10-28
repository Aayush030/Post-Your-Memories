import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user',userRoutes)
const PORT = process.env.PORT|| 5000;
// const CONNECTION_URL = "mongodb+srv://javascriptmastery:javascriptmastery123@cluster0.9jiyrpe.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

  app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
  
    const post = await Post.findOneAndUpdate({ _id: id }, { content });
  
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }
  
    return res.json(post);
  });