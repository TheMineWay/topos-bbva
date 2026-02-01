# 🧪 Testing

## Unit testing

I use Vitest. Tests are stored alongside the code they test, with a `.spec.ts` suffix. Each test sets up a controlled environment to ensure reliable and repeatable results.

## Component testing

I use Vitest with Playwright. Tests are stored alongside the code they test, with a `.spec.dom.tsx` suffix. Each test mounts the component in isolation to verify its behavior and appearance.

## E2E testing

I use Playwright to test common app flows. Flows are stored in the `e2e/` directory.