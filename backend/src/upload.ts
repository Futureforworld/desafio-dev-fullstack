import multer from 'multer';
import path from 'path';

// Configura o diretório e nome do arquivo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define o diretório de upload
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Define o nome do arquivo
  }
});

const upload = multer({ storage: storage });  // Usa a configuração de armazenamento

export default upload;
