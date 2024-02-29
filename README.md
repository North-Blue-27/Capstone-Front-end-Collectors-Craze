# Capstone-Front-end-Collectors-Craze



Collector's Craze è una piattaforma per giochi di carte collezionabili che consente agli utenti di cercare e visualizzare dettagli sulle carte, aggiungerle ai preferiti e gestire la propria collezione. Attualmente supporta due giochi di carte collezionabili, ma verranno implementati altri giochi in futuro. L'applicazione è completamente responsive e ottimizzata per essere fruibile su dispositivi desktop, tablet e smartphone.

Questa applicazione è stata sviluppata come Capstone Project per un corso di Front-End Developer.

Funzionalità:

   1) Ricerca di carte: Gli utenti possono cercare le carte per nome, set o altre caratteristiche.
   2) Visualizzazione dettagliata: Ogni carta ha una pagina dettagliata con informazioni come immagini, abilità, prezzi e statistiche.
   3) Gestione della collezione: Gli utenti registrati possono aggiungere carte alla loro lista di preferiti e visualizzare le carte già inserite.
   4) Preferiti: Gli utenti possono aggiungere le carte ad una di preferiti per accedervi facilmente in seguito.
   5) Autenticazione degli utenti: Il sistema di autenticazione consente agli utenti di registrarsi, accedere e gestire il proprio profilo.

Tecnologie utilizzate:

Collector's Craze è sviluppato con le seguenti tecnologie:

   React: Per la creazione dell'interfaccia utente.
   React Router: Per la gestione del routing nell'applicazione.
   Bootstrap: Per lo stile e la struttura responsive.
   Axios: Per le richieste HTTP al server API.
   Redux Toolkit: Per la gestione dello stato dell'applicazione
   JSON Server: Per simulare un server API locale.
   JSON Server Auth: Per l'autenticazione degli utenti nel server JSON.

- Installazione -

Clona il repository:

     git clone <URL del repository>

Naviga nella directory del progetto:

bash

    cd collectors-craze

Installa le dipendenze:

bash

    npm install

Avvio dell'applicazione

Per avviare Collector's Craze, esegui il seguente comando dalla radice del progetto:

bash

    npm start

L'applicazione sarà disponibile all'indirizzo http://localhost:3000.

Avvio del server API:

Collector's Craze utilizza json-server come server API per gestire i dati della collezione e dell'autenticazione degli utenti. 

Per avviare il server API, esegui il seguente comando dalla radice del progetto:

bash

    npx json-server --watch db.json --middlewares ./node_modules/json-server-auth --port 3001

Il server sarà disponibile all'indirizzo http://localhost:3001.

Contatti:  Linkedin: Antonio Casalena - GitHub: Antonio Casalena / Nort-Blue-27

Per ulteriori informazioni sull'utilizzo dell'applicazione, la struttura del codice e le funzionalità, 
consulta la documentazione nel repository.


