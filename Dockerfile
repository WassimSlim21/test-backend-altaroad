# Utiliser une version de Node.js plus récente
FROM node:18

# Créer et définir le répertoire de travail de l'application
WORKDIR /usr/src/app

# Installer les dépendances nécessaires pour msnodesqlv8
RUN apt-get update && apt-get install -y \
    unixodbc \
    unixodbc-dev

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install -g nodemon
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Définir les variables d'environnement
ENV DB_SERVER="192.168.175.252"
ENV DB_DATABASE="AdventureWorks2022"
ENV DB_USER="sa"
ENV DB_PASSWORD="123456"
ENV DB_PORT="1433"



# Exposer le port de l'application
EXPOSE 3000

# Lancer l'application
CMD ["npm", "start"]
