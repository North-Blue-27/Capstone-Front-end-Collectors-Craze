import * as jsonServer from 'json-server';
const auth = require('json-server-auth');

// Crea un'istanza del server JSON
const server = jsonServer.create();
// Inizializza un router con il file db.json
const router = jsonServer.router('db.json');
// Applica il middleware di default
const middlewares = jsonServer.defaults();

// Aggiungi il middleware di autenticazione al server
server.use(auth);

// Middleware per il parsing del corpo della richiesta
server.use(jsonServer.bodyParser());

// Log delle richieste di login
server.post('/login', (req, res, next) => {
  console.log('Richiesta di login ricevuta:', req.body);
});

// Gestione della richiesta di login
server.post('/login', (req, res) => {
  const { email, password } = req.body; // Estrae email e password dalla richiesta
  const user = server.db.get('users').find({ email }).value(); // Trova l'utente nel database

  // Se l'utente non esiste, restituisci un errore
  if (!user) {
    console.error('Utente non trovato');
    return res.status(400).json({ error: 'Credenziali non valide' });
  }

  // Se la password non corrisponde, restituisci un errore
  if (password !== user.password) {
    console.error('Credenziali non valide');
    return res.status(400).json({ error: 'Credenziali non valide' });
  }

  // Se le credenziali sono corrette, restituisci un messaggio di successo
  res.status(200).json({ message: 'Login avvenuto con successo' });
});

// Inizializza il server con i middleware e il router
server.use(middlewares);
server.use(router);
// Avvia il server sulla porta 3001
server.listen(3001, () => {
  console.log('Server JSON avviato sulla porta 3001');
});