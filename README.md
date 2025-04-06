# 💪 Chest.com - Application de Programmes Sportifs & Alimentaires

Chest.com est une application web moderne qui permet aux utilisateurs de découvrir, commenter, noter et ajouter en favori des programmes **sportifs** et **alimentaires**.

---

## 🧰 Stack Technique

- **Frontend** : [Angular 19.1.4](https://angular.io)
- **Backend** : [Spring Boot 3.4.2](https://spring.io/projects/spring-boot)
- **Base de données** : PostgreSQL 17.2
- **Sécurité** : Spring Security (authentification, CORS configuré)

---

## 🚀 Pré-requis

Assurez-vous d'avoir installé :

- [Node.js (v18+)](https://nodejs.org) et npm
- [Angular CLI](https://angular.io/cli)  
  ```bash
  npm install -g @angular/cli
  ```
- [Java 17+](https://adoptopenjdk.net)
- Un IDE (IntelliJ, Eclipse, etc.)
- [PostgreSQL](https://www.postgresql.org/)

---

## ⚙️ 1. Configuration de la Base de Données (PostgreSQL)

Créez une base de données et importez le fichier pr71 présent à la racine du projet :

---

## ⚙️ 2. Lancer le Backend (Spring Boot)

### 🔧 Configuration

Dans `src/main/resources/application.properties` :

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/fitplanner
spring.datasource.username=fituser
spring.datasource.password=fitpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### ▶️ Lancement

```bash
./mvnw spring-boot:run
```

Accès à l'API : [http://localhost:8080](http://localhost:8080)

---

## ⚙️ 3. Lancer le Frontend (Angular)

### 📦 Installation

```bash
cd app-front
npm install
```

### ▶️ Démarrage

```bash
ng serve --proxy-config proxy.conf.json
```

Avec un fichier `proxy.conf.json` :

```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

Interface : [http://localhost:4200](http://localhost:4200)

---

## 🔐 Authentification

Spring Security gère l’authentification et le CORS. Les routes publiques : `/api/auth/**`. Le reste est protégé.

---

## 📁 Structure

```
.
├── app-back/                  # Backend
│   ├── controllers/
│   ├── models/
│   ├── repositories/
│   ├── services/
│   └── config/
│
├── app-front/                 # Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── models/
│   │   │   └── services/
│   └── proxy.conf.json
│
└── README.md
```

---

## 🧪 Tests

- `GET /api/programs`
- `GET /api/diet-programs`
- `POST /api/programs/{id}/rating`
- `POST /api/programs/{id}/comment`
- `POST /api/programs/{id}/favorite`

---

## ✅ Améliorations

- Gestion de profils
- Recherche / filtres
- Interface admin

---

## 👨‍💻 Auteur

Développé par **[Falconnet Alexis, Gasser Stéphane, Hornsperger Ethan]**.
