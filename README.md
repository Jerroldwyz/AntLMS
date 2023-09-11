# Node Version

v16 up

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start Docker Compose for local DB and S3

```
docker compose up -d
```

Set your local environment

```
export DATABASE_URL='postgresql://antlms-user:example@localhost:5432/antlms?schema=public&connection_limit=5'
```

Migrate the DB schema

```
npm run migrate
```

Start the development server on http://localhost:3000

```bash
npm run dev
```

Firebase console
Login to <a href="https://console.firebase.google.com">firebase console</a> using our domain account.

Firebase Configuration (.env)
Below is an example of a .env.example file with Firebase configuration variables.

```
# Firebase config
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=
FIREBASE_DATABASE_URL=
# Firebase admin
FIREBASE_ADMIN_CREDENTIALS=
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
