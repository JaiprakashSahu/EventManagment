<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/Firebase-Auth-orange?style=for-the-badge&logo=firebase&logoColor=white" alt="Firebase"/>
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
</p>

<h1 align="center">🎉 Event Management Web Application</h1>

<p align="center">
  <strong>A modern, full-stack event management platform built with Next.js, Firebase & Tailwind CSS</strong>
</p>

<p align="center">
  <a href="https://event-managment-nu.vercel.app">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Visit_App-14b8a6?style=for-the-badge" alt="Live Demo"/>
  </a>
  <a href="https://github.com/JaiprakashSahu/EventManagment">
    <img src="https://img.shields.io/badge/📂_Source_Code-GitHub-181717?style=for-the-badge&logo=github" alt="GitHub"/>
  </a>
</p>

---

## 📌 Overview

> Securely create, manage, and view your personal events with a clean, modern dashboard interface.

| Feature | Description |
|---------|-------------|
| 🔐 **Google Sign-In** | Secure authentication via Firebase |
| 📅 **Event Creation** | Create events with title, date, time, location |
| 📊 **Dashboard** | View & filter your events (All, Upcoming, Completed, Draft) |
| 📈 **Real-Time Stats** | Dynamic statistics from your actual data |
| 🔒 **Private Data** | User-scoped access with Firestore rules |
| 📱 **Responsive** | Works beautifully on mobile, tablet & desktop |

---

## 🛠️ Tech Stack

<table align="center">
<tr>
<td align="center" width="120">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="48" height="48" alt="Next.js" />
<br><strong>Next.js 16</strong>
</td>
<td align="center" width="120">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="48" height="48" alt="React" />
<br><strong>React</strong>
</td>
<td align="center" width="120">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" width="48" height="48" alt="Firebase" />
<br><strong>Firebase</strong>
</td>
<td align="center" width="120">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="48" height="48" alt="Tailwind" />
<br><strong>Tailwind CSS</strong>
</td>
<td align="center" width="120">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" width="48" height="48" alt="Vercel" />
<br><strong>Vercel</strong>
</td>
</tr>
</table>

---

## ✨ Key Features

### 🔐 Authentication
- Google Sign-In using Firebase Authentication
- Persistent user sessions
- Secure authorized domain protection

### 📅 Event Management
- Create events with **title**, **description**, **date**, **time**, **location**
- Invite guests via email
- Set notification preferences & reminders

### 📋 Events Dashboard
- **Filter tabs**: All | Upcoming | Completed | Draft
- Card-based event listing with images
- Sorted by creation date (latest first)
- Clean empty-state UI

### 📈 Real-Time Statistics
| Metric | Description |
|--------|-------------|
| **Total Events** | Count of all your events |
| **This Month** | Events created in current month |
| **Latest Event** | Date of most recent event |
| **Member Since** | Your account creation date |

> ⚡ All stats calculated dynamically — **no fake numbers!**

---

## 🗂️ Firestore Data Structure

```javascript
// Users Collection
users/{userId} {
  uid: string,
  firstName: string,
  lastName: string,
  email: string,
  photoURL: string,
  createdAt: timestamp,
  lastLoginAt: timestamp
}

// Events Collection
events/{eventId} {
  title: string,
  description: string,
  date: string,
  time: string,
  location: string,
  guests: array,
  userId: string,
  createdAt: timestamp
}
```

---

## 🔒 Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId} {
      allow read, write: if request.auth != null 
                         && request.auth.uid == userId;
    }

    match /events/{eventId} {
      allow create: if request.auth != null 
                    && request.auth.uid == request.resource.data.userId;
      allow read, update, delete: if request.auth != null 
                                  && request.auth.uid == resource.data.userId;
    }
  }
}
```

---

## ⚙️ Environment Variables

Create `.env.local` in project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> ⚠️ **Never commit `.env.local` to GitHub!**

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/JaiprakashSahu/EventManagment.git

# Navigate to project
cd EventManagment/event-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 Engineering Highlights

| Aspect | Implementation |
|--------|----------------|
| **Routing** | Next.js App Router (filesystem-based) |
| **Auth** | Firebase with Google OAuth |
| **Database** | Firestore with user-scoped queries |
| **Security** | Production-grade Firestore rules |
| **Styling** | Tailwind CSS with responsive design |
| **State** | React Context API |
| **Deployment** | Vercel with auto-deploy |

---

## 📈 Future Enhancements

- [ ] Edit & delete events
- [ ] Event images & banners
- [ ] Email notifications
- [ ] Calendar view integration
- [ ] Event sharing & collaboration
- [ ] Analytics dashboard

---

## 👤 Author

<p align="center">
  <strong>Jaiprakash Sahu</strong><br>
  Full Stack Developer
</p>

<p align="center">
  <a href="https://github.com/JaiprakashSahu">
    <img src="https://img.shields.io/badge/GitHub-JaiprakashSahu-181717?style=for-the-badge&logo=github" alt="GitHub"/>
  </a>
</p>

---

<p align="center">
  Made with ❤️ using Next.js, Firebase & Tailwind CSS
</p>