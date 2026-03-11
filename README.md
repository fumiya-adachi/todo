# Todo App

## Tech Stack

- Next.js
- TypeScript
- Docker
- PostgreSQL
- Prisma

## Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd todo
```

---

### 2. Create environment file

プロジェクトルートに `.env` を作成します。

```
DATABASE_URL="postgresql://postgres:password@db:5432/todo"
```

---

## Run the App

### 1. Start Docker containers

```bash
docker compose up -d
```

---

### 2. Install dependencies inside the container

```bash
docker compose run --rm next npm install
```

---

### 3. Generate Prisma Client

```bash
docker compose run --rm next npx prisma generate
```

---

### 4. Run database migration

```bash
docker compose run --rm next npx prisma migrate dev --name init
```

---

### 5. Open the application

```
http://localhost:3000
```

---

## Useful Commands

### Start containers

```bash
docker compose up -d
```

### Stop containers

```bash
docker compose down
```

### View logs

```bash
docker compose logs -f
```

### Enter container shell

```bash
docker compose run --rm next sh
```

### Install a package

```bash
docker compose run --rm next npm install <package-name>
```

### Install a dev dependency

```bash
docker compose run --rm next npm install -D <package-name>
```

### Prisma Generate

```bash
docker compose run --rm next npx prisma generate
```

### Prisma Migration

```bash
docker compose run --rm next npx prisma migrate dev
```

### Prisma Studio (GUI for database)

```bash
docker compose run --rm next npx prisma studio
```

---

## API

### Get Todos

```
GET /api/todos
```

Endpoint:

```
http://localhost:3000/api/todos
```