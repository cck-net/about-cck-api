import express, { Request, Response } from 'express'
import { Linkedin } from './integration/linkedin'
import { Github } from './integration/github'


const app  = express()
const cors = require('cors');
const port = process.env.PORT || 3000

const linkedin = new Linkedin()
const github   = new Github()

app.use(cors());

app.get('/', async (req, res) => {

    const linkedinFut = linkedin.getLinkedIn()
    const githubFut   = github.getGithub()

    const [linkedinRes, githubRes] = await Promise.all([linkedinFut, githubFut]);

    res.send({
        linkedin: linkedinRes,
        github:   githubRes
    })
});

export default app;
  
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });