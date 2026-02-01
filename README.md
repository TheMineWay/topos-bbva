# Moles Game - By [Joel Campos](https://www.linkedin.com/in/joelcamposoliva/)

A PWA app made with Vite + React.

## ☕ Start development project

### 1. Clone the repository

```bash
git clone https://github.com/TheMineWay/topos-bbva.git
```

### 2. Install requirements

This project was developed using some specific tools. Here you have a list of them and their recommended versions:

- [Node.js](https://nodejs.org/en/) (v20 or higher)
- [Pnpm](https://pnpm.io/) (v10 or higher)

### 3. Install dependencies

```bash
pnpm install
```

### 4. Run the development server

```bash
pnpm dev
```

## 🧪 Run tests

As some tests are run in a browser environment, you need to install the required browsers before running them.

### 1. Install playwright dependencies

If you don't have it, you will need to install the playwright package and dependencies using the following commands:

```bash
pnpm exec playwright install
pnpm exec playwright install-deps
```

Depending on your operating system, you might need to install some additional dependencies.
Even though the CLI will tell you the command, here I provide you with the common ones for Ubuntu:

```bash
apt-get install libevent-2.1-7 libavif13
```

### 2. Install browsers

Playwright comes with some browsers by default. However, if you want to use some of the following you need to install them:

- Chrome: `pnpm exec playwright install chrome`
- Microsoft Edge: `pnpm exec playwright install msedge`
- Firefox: `pnpm exec playwright install firefox`

### 3. Run tests

| Action | Command |
|--------|---------|
| Unit tests   | `pnpm test` |
| Unit tests in dev mode | `pnpm test:dev` |
| E2E tests    | `pnpm e2e` |
| E2E tests in dev mode | `pnpm e2e:dev` |
| E2E report | `pnpm e2e:report` |

## 📖 Documentations index

You have some additional documentations about the project:

- [Technologies](./docs/TECHNOLOGIES.md)
- [Tests](./docs/TESTING.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Features](./docs/FEATURES.md)