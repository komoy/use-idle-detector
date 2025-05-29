# use-idle-detector

A tiny React hook to detect user inactivity (idle) based on mouse, keyboard, scroll, and click events.

## 🚀 Installation

```bash
npm install use-idle-detector
```

or

```bash
yarn add use-idle-detector
```

---

## 📦 Usage

```tsx
import { useIdleDetector } from 'use-idle-detector';

function App() {
  const { isIdle, resetIdleTimer } = useIdleDetector(300_000); // 5 minutes

  return (
    <div>
      {isIdle ? <p>User is idle</p> : <p>User is active</p>}
      <button onClick={resetIdleTimer}>Reset Timer</button>
    </div>
  );
}
```

---

## ⚙️ API

### `useIdleDetector(timeout: number)`

#### Parameters:
- `timeout` (`number`, optional): Time in milliseconds before considering the user idle. Default is `60000` (1 minute).

#### Returns:
- `isIdle` (`boolean`): Whether the user is idle.
- `resetIdleTimer` (`() => void`): Manually reset the idle timer.

---

## 📚 How It Works

- Listens to user activity: `mousemove`, `keydown`, `scroll`, `click`.
- Resets a timer on each activity.
- If no activity is detected within the `timeout`, `isIdle` becomes `true`.

---

## 🪶 Lightweight
- Zero dependencies
- <2KB gzipped

---

## 🛠️ Build & Publish

```bash
npm run build
npm publish --access public
```

---

## 📄 License

MIT © 2025 Komoy Haye
