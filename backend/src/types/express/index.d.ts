import { Request } from 'express';
import { File } from 'multer';

declare global {
  namespace Express {
    interface Request {
      file: File;  // Defina a tipagem correta para os arquivos
    }
  }
}
