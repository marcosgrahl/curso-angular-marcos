const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Multipart = require('connect-multiparty');

// instanciando a aplicação
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// para o JS liberar o consumo de um para para outra, um jeito é usar o cors

const corsOptions = {
   origin: '*',
   optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


const multipart1 = Multipart({uploadDir: './uploads' });

app.post('/upload', multipart1, (req, res) => {
   const files = req.files;
   res.json({message: files});
});


app.get('/downloadExcel',(req,res) => {
   res.download('./uploads/report.xlsx');
});

app.get('/downloadPDF',(req,res) => {
   res.download('./uploads/report.pdf');   
});


app.use((err, req, res, next) => res.json({error: err.message}));

app.listen(8000, () => {
   console.log('servidor porta 8000 foi iniciado.')
})