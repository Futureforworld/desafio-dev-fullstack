import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Tipando os parâmetros req e res corretamente
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
