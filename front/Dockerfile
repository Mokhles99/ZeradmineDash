# Utiliser une image de base Node.js
FROM node:20.15.1-slim

# Créer et définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et yarn.lock
COPY package.json yarn.lock ./

# Installer les dépendances
RUN npm install --force

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application React
RUN npm run build

# Installer un serveur HTTP pour servir l'application
RUN npm install -g serve

# Exposer le port que l'application utilisera
EXPOSE 5173

# Commande pour démarrer l'application
CMD ["serve", "-s", "build"]
