### Tema aplicatiei

Aplicatia implementeaza un sistem de publish - subscribe a curselor cu masina de la o destinatie sau catre o destinatie. Astfel, am implementat un mecanism de log in prin care doar utilizatorii autentificati pot publica curse, iar utilizatorii neautentificati au permisiuni doar de subscribe. Notificarea se face prin trimiterea unui e-mail.

De exemplu:
- Utilizatorul A da subscribe pentru plecarea din Kiev. Atunci cand se posteaza o cursa care pleaca din Kiev el va fi notificat prin email, indiferent de destinatie
- Utilizatorul B da subscribe pentru Varsovia ca destinatie. Astfel, el va fi notificat de fiecare data cand o cursa cu destinatia Varsovia va fi incarcata in aplicatie

Aplicatia nu suporta un mecanism de subscribe atat pe baza de orasul de plecare, cat si pe baza de orasul de sosire

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

PWeb:
- Cosmina Mindru
- Stefania Gherasie