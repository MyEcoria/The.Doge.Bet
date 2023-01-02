# The Doge Bet 🎲
Ce projet en Node.js vérifie les dépôts effectués à une adresse Dogenano. Si un dépôt est détecté, un nombre aléatoire compris entre 1 et 2 est généré. Si le nombre généré est égal à 2, le déposant recevra le double de la somme déposée.

# Installation avec Docker

Modifier le fichier `.env`

1) `sudo docker build --no-cache -t bet:latest .`
2) `sudo docker run --restart=unless-stopped --env-file .env -d -p 3003:3003 --name dogebet bet:latest`

# Contribution

Si vous souhaitez contribuer à ce projet, n'hésitez pas à créer une pull request ou à ouvrir une issue pour signaler un bug ou suggérer une amélioration.
