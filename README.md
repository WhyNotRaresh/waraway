Setup:
1. ```docker-compose up -d postgres-db```
2. ```docker-compose up -d```


Porturi relevante pe localhost:
- 4200 -> aplicatie
- 9000 -> portainer
- 3000 -> grafana


### Echipa PWeb:
* Gherasie Stefania Elena 342C5
* Mandru Cosmina 342C5
### Echipa IDP:
* Badita Rares Octavian
* Alexa Robert


## Tema
Aplicatia dezvoltata se numeste WarAway si este o platforma Web unde refugiatii isi pot vedea anunțuri de curse gratuite pentru a putea pleca din zonele afectate de război. 

Refugiatii se pot conecta la platforma pentru a vedea o lista cu anunțuri. Acestea pot fi vizualizate pe harta pentru a vedea anunțuri din apropiere. Se poate realiza o filtrare pe harta pentru a obține rezultate cât mai relevante. Pentru postarea unui anunț este necesara existenta unui cont pentru conectarea la aplicația. 

Pentru autorizare si autentificare s-a folosit aplicația thirt-party Auth0. S-a implementat un serviciu de alertare prin email folosind RabbitMQ (refugiatii se pot abona sa primeasca notificari dacă apare vreun anunț  într-o locație aleasă de ei)


## Wireframes si Prototype

https://www.figma.com/file/X6XJzcQZcHT7RwOL92fJmz/WarAway?node-id=18%3A90
