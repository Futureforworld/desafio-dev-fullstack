
Simulação de Energia - Projeto Backend e Frontend
Este projeto tem como objetivo a criação de um sistema de simulação de energia, onde o usuário pode enviar uma fatura de energia para realizar uma simulação, utilizando tecnologias como Node.js, Express, Axios, TypeScript, multer e React.

Descrição do Projeto
O desafio consistia em criar um sistema de simulação que permitisse aos usuários enviar arquivos (como contas de energia) e, a partir disso, realizar uma simulação no backend. A proposta era simples, mas houve alguns ajustes e improvisos durante o desenvolvimento, que foram essenciais para o sucesso da implementação.

Tecnologias Utilizadas
Node.js e Express: Para a criação do servidor backend.
multer: Middleware utilizado para o upload de arquivos.
TypeScript: Para garantir um código mais robusto e tipado.
Axios: Biblioteca para fazer requisições HTTP do frontend para o backend.
React: Para o desenvolvimento do frontend, onde o formulário para enviar os dados foi criado.
CORS: Para permitir a comunicação entre o frontend e o backend.
O Processo
Configuração do Backend: A primeira etapa foi configurar o servidor backend usando o Express e o TypeScript. Em seguida, configuramos o middleware multer para possibilitar o upload de arquivos PDF (como contas de energia). A escolha do multer se deu devido à sua simplicidade e por ser uma ferramenta muito eficiente para o tipo de tarefa que precisávamos realizar. O servidor foi configurado para rodar na porta 4000.

Criação das Rotas: Criamos uma rota POST em /simulacao, onde os usuários podem enviar o arquivo via formulário. O arquivo enviado é armazenado em um diretório local chamado uploads/ e o nome do arquivo é alterado para incluir a data atual, evitando conflitos.

Frontend: No lado do frontend, foi criado um formulário simples em React, onde o usuário preenche seu nome, email, telefone e anexa a conta de energia. Ao submeter o formulário, os dados são enviados para o servidor backend via uma requisição HTTP POST utilizando Axios. A resposta do servidor é então tratada, exibindo a mensagem de sucesso.

Desafios e Improvisos: Durante o desenvolvimento, surgiram alguns desafios que exigiram improvisos:

CORS: Precisamos configurar o CORS corretamente para permitir que o frontend (executando em outra porta) fizesse requisições para o backend.
Configuração do Upload: O diretório de upload (uploads/) não estava presente inicialmente, então criamos manualmente esse diretório para garantir que os arquivos fossem armazenados corretamente.
Processamento do Arquivo: Embora o foco fosse a simulação, tivemos que lidar com a manipulação dos arquivos enviados, que foi uma parte crítica, já que precisávamos garantir que o arquivo fosse corretamente armazenado e processado no backend.
Resiliência e Persistência: Em diversos momentos, o processo não foi tão simples como parecia inicialmente. Foi necessário ajustar e testar várias vezes, principalmente nas configurações do servidor, rotas e no tratamento das requisições do frontend. A persistência foi crucial para superar as dificuldades e alcançar a conclusão bem-sucedida do projeto.

