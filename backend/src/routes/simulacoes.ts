import { Router, Request, Response } from 'express';  // Importação dos tipos necessários
import multer from 'multer';

// Tipagem para o Request, incluindo o file (alteração)
interface ICustomRequest extends Request {
  file: Express.Multer.File;  // Definindo a tipagem para o arquivo que será enviado
}

// Inicialize o roteador
const router = Router();

// Configuração do multer para upload do arquivo (alteração)
const upload = multer({ dest: 'uploads/' });

// Defina o endpoint POST (não há alteração aqui, mas certifique-se de estar usando o tipo correto)
router.post('/', upload.single('file'), async (req: ICustomRequest, res: Response): Promise<Response> => {
  try {
    console.log('Requisição recebida:', req.body);
    console.log('Arquivo recebido:', req.file);

    // Lógica para processar a requisição e gerar a resposta
    return res.status(200).json({ message: 'Simulação registrada com sucesso!' });
  } catch (error) {
    console.error('Erro no processamento:', error);
    return res.status(500).json({ error: 'Erro interno ao registrar a simulação.' });
  }
});

// Exporte a rota
export default router;




