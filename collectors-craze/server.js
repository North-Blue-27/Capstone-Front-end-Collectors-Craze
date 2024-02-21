const jsonServer = require('json-server');
const auth = require('json-server-auth');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Aggiungi il middleware di autenticazione
server.use(auth);

// Middleware per il parsing del corpo della richiesta
server.use(jsonServer.bodyParser());

// Log delle richieste di login
server.post('/login', (req, res, next) => {
  console.log('Richiesta di login ricevuta:', req.body);
  next();
});

// Gestione della richiesta di login
server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = server.db.get('users').find({ email }).value();

  if (!user) {
    console.error('Utente non trovato');
    return res.status(400).json({ error: 'Credenziali non valide' });
  }

  if (password !== user.password) {
    console.error('Credenziali non valide');
    return res.status(400).json({ error: 'Credenziali non valide' });
  }

  res.status(200).json({ message: 'Login avvenuto con successo' });
});

// Inizializza il server
server.use(middlewares);
server.use(router);
server.listen(3001, () => {
  console.log('Server JSON avviato sulla porta 3001');
});