const PROXY_CONFIG = [
   {
     context: ['/api'],
     target: 'http://localhost:8000/',
     secure: false,   // indica se vai ou não ter https
     logLevel: 'debug',
     pathRewrite: { '^/api': '' } // vai trocar o /api, por string vazia, exemplo
     // troca http://localhost/api:8000/ por 'http://localhost:8000/
   }
 ];
 
 module.exports = PROXY_CONFIG; 