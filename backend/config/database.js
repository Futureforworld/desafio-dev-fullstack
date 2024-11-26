const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    const mongoURI = process.env.MONGO_URL || 'mongodb://localhost:27017/simulacao_energia';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexão com o MongoDB bem-sucedida!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
