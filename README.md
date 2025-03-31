# 🚀 My Toaster

A **lightweight**, **fully type-safe** React toast notification library built with **TailwindCSS** & **Framer Motion**.

## ✨ Features
- 🟢 **Fully TypeSafe** (Written in TypeScript)
- 🎨 **Customizable** (Supports styles, icons, and themes)
- ⚡ **Fast & Lightweight** (Uses Framer Motion for smooth animations)
- 🔥 **Flexible API** (Toast types, durations, positions, etc.)

---

## 📦 Installation

Using **npm**:
```sh
npm install my-toaster
```

Using **pnpm**:
```sh
pnpm add my-toaster
```

Using **yarn**:
```sh
yarn add my-toaster
```

---

## 🚀 Getting Started

### 1️⃣ Add the `<Toaster />` Provider
Place the `Toaster` component **once** in your app (usually inside `_app.tsx` or `App.tsx`):

```tsx
import { Toaster } from 'my-toaster';

function App() {
  return (
    <>
      <Toaster />
      <YourApp />
    </>
  );
}
```

### 2️⃣ Trigger a Toast
To create a toast notification, call the `toast` function:

```tsx
import { toast } from 'my-toaster';

toast({
  type: "success",
  title: "User Updated",
  message: "Your user was successfully updated!"
});
```

---

## 🎨 Customization

### 🏗 Available Options

The `toast` function accepts the following **options**:

```ts
interface ToastOptions {
  id?: string;
  type?: "success" | "error" | "info" | "warning";
  title?: string;
  text?: string;
  content?: React.ReactNode;
  closeButton?: boolean;
  duration?: number;
  progress?: "auto" | number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  style?: React.CSSProperties;
}
```

### 🛠 Example Customization
```tsx
toast({
  type: "error",
  title: "Oops!",
  message: "Something went wrong!",
  duration: 5000,
  closeButton: true,
  position: "top-right"
});
```

---

## 📜 License
This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing
Pull requests are welcome! If you'd like to improve the library, please open an issue or submit a PR.

---

## ⭐ Show Your Support
If you like this library, please give it a **star** ⭐ on [GitHub](https://github.com/RobinYze/my-toaster)! 🚀