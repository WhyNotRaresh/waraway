## Tema aplicatiei

Aplicatia dezvoltata se numeste WarAway si este o platforma Web unde refugiatii isi pot vedea anunțuri de curse gratuite pentru a putea pleca din zonele afectate de război. 

Refugiatii se pot conecta la platforma pentru a vedea o lista cu anunțuri. Acestea pot fi vizualizate pe harta pentru a vedea anunțuri din apropiere. Se poate realiza o filtrare pe harta pentru a obține rezultate cât mai relevante. Pentru postarea unui anunț este necesara existenta unui cont pentru conectarea la aplicația. 

Pentru autorizare si autentificare s-a folosit aplicația thirt-party Auth0. S-a implementat un serviciu de alertare prin email folosind RabbitMQ (refugiatii se pot abona sa primeasca notificari dacă apare vreun anunț  într-o locație aleasă de ei).

De exemplu:
- Utilizatorul A da subscribe pentru plecarea din Kiev. Atunci cand se posteaza o cursa care pleaca din Kiev el va fi notificat prin email, indiferent de destinatie
- Utilizatorul B da subscribe pentru Varsovia ca destinatie. Astfel, el va fi notificat de fiecare data cand o cursa cu destinatia Varsovia va fi incarcata in aplicatie

Aplicatia nu suporta un mecanism de subscribe atat pe baza de orasul de plecare, cat si pe baza de orasul de sosire.

### Wireframes si Prototype

https://www.figma.com/file/X6XJzcQZcHT7RwOL92fJmz/WarAway?node-id=18%3A90

### Setup

1. ```docker-compose up -d postgres-db```
2. ```docker-compose up -d```

### Porturile expuse

Dockerele ruleaza pe urmatoarele porturi de localhost:
- aplicatie: 4200
- portainer: 9000
- grafana: 3000
- rabbitmq (interfata grafica): 15672
- database: 5433

### Componenta echipelor

IDP:
- Badita Rares Octavian - 342C3
- Alexa Robert Ionut - 342C3

Pweb:
- Gherasie Stefania Elena - 342C5
- Mandru Cosmina - 342C5
