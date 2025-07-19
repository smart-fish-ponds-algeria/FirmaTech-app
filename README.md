# 📱 Expo React Native App

A mobile application built with **Expo**, **React Native**, and **TypeScript**.  
Includes user authentication, reusable UI components, and Firebase push notification support.

---

## 🚀 Features

- 🔐 Authentication with login screen
- 💅 Custom UI components and improved UX
- ⚛️ React Native with TypeScript
- 🔔 Push Notifications via Firebase
- 🧪 ESLint for consistent code quality

---

## 📁 Project Structure

```
.
├── app/                  # App entry and screens
├── assets/               # Images, fonts, etc.
├── services/             # API and auth services
├── utils/                # Utility functions
├── .vscode/              # Editor settings
├── app.json              # Expo app configuration
├── eas.json              # EAS build configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project metadata and scripts
└── README.md             # Project documentation
```

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/smart-fish-ponds-algeria/FirmaTech-app.git
cd FirmaTech-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the project

```bash
npx expo start
```

> Use Expo Go to scan the QR code and launch the app.

---

## 🔐 Authentication

Authentication service located in `services/`.  
Handles login via email/password (extendable to OAuth or Firebase).

---

## 🔔 Notifications

Uses Firebase Cloud Messaging (FCM).  
Make sure to configure the `expo-notification-*` JSON key in `app.json`.

---

## 🧪 Scripts

```bash
npm run lint         # Lint code with ESLint
npm run start        # Start expo server
npm run build        # Build for production
```

---


<div align="center">
  <img src="https://github.com/user-attachments/assets/58a0dc14-e76f-4bdc-94a6-fef7716c5583" width="300" />
  <img src="https://github.com/user-attachments/assets/65b03a3b-9761-45aa-862b-4f401ccd4fff" width="300" />
  <img src="https://github.com/user-attachments/assets/a155c05b-29db-4fbf-847c-ab9a850abe81" width="300" />
  <img width="389" height="843" alt="image" src="https://github.com/user-attachments/assets/b865fe72-c9d5-4ad5-8fdd-081e40ee08d6" />
<img width="389" height="843" alt="image" src="https://github.com/user-attachments/assets/78c81e45-135c-41f3-b479-f3b54de429f5" />

</div>


## 🛠 Built With

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase Notifications](https://firebase.google.com/docs/cloud-messaging)

---

## 📄 License

MIT © 2025 Your Name
