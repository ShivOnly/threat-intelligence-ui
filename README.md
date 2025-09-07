# Threat Intelligence UI  

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-FF6384?style=for-the-badge&logo=recharts&logoColor=white)
![Framer Motion](https://img.shields.io/badge/FramerMotion-EF008F?style=for-the-badge&logo=framer&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-44318D?style=for-the-badge&logo=react&logoColor=white)

---

A modern **Threat Intelligence Dashboard** built with **Next.js, React, TailwindCSS, TypeScript, Recharts, Framer Motion, and Zustand**.  
It provides a clean and interactive interface to view and analyze **Indicators of Compromise (IOCs)** such as IPs, URLs, and Subnets with charts, summaries, and filters. (screenshots provided below)  

---

## 🚀 Features

- 📊 **Summary Dashboard** – Total IOCs & severity breakdown  
- 🔍 **IOC Filtering** – Filter by severity or type  
- 📑 **IOC List** – Interactive IOC table/list  
- 📈 **Charts & Graphs** – Visualize IOC distribution  
- 🎨 **Modern UI/UX** – TailwindCSS + Framer Motion animations  
- 🌗 **Light/Dark Mode** – Smooth theme switching  
- ⚡ **Optimized for Performance** – Next.js App Router  
- 🐻 **State Management** – Zustand for global store  
- 🔄 **Refresh & Config Menu** – Live IOC updates  
- 👤 **User Profile + Hover Menu** – Responsive across all devices  
- 🪟 **Glassmorphism UI** – Blurred panels & modern design  

---

## 🛠️ Getting Started  

### install Nodejs if not finish all its process and select valid path
https://nodejs.org

### 1. Clone the repository  
```bash
git clone https://github.com/ShivOnly/threat-intelligence-ui.git
cd threat-intelligence-ui
```
### 2. Install dependencies
``` bash 
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```
### 3. Run the development server
``` bash 
    npm run dev 
```



## Now open http://localhost:3000  in your browser 🚀

### 4. Build for production 

``` bash
    npm run build npm start 
 ```

### 📂 Project Structure
- /app              → Next.js app router pages

- /components       → Reusable UI components (Loadingskeleton, Alerts, Summary, IOCList, Charts(radial and bar), Filters, ThemeToggle)

- /lib              → Helper functions (e.g., data fetchers)

- /store            → Zustand state management (useiocstore)

- /public           → Static assets (logos, icons, etc.)

📊 Example and Screenshots are below

### 🚀 Deployment

## The easiest way to deploy is with Vercel (from the creators of Next.js):

# Push your repo to GitHub

- Go to Vercel
 → Import project
- Done 🎉
- Or deploy locally:

```bash 
    npm run build npm start 
```



## 📸 Screenshots

| Light Mode Dashboard | Dark Mode Dashboard|
|------------|-----------|
| <img src="/screenshots/dashboard.png" width="300"/> | <img src="/screenshots/2dashboard.png" width="300"/> |

| Light Mode Config| Dark Mode Config|
|------------|-----------|
| <img src="/screenshots/configlight.png" width="300"/> | <img src="/screenshots/configdark1.png" width="300"/> |

| Light Mode Loading| Dark Mode Loading|
|------------|-----------|
| <img src="/screenshots/loadli.png" width="300"/> | <img src="/screenshots/loadda.png" width="300"/> |

| Light Mode menu (hover left of screen edge to open menu)| Dark Mode menu|
|------------|-----------|
| <img src="/screenshots/hoverMenuLeftLi.png" width="300"/> | <img src="/screenshots/hoverMenuLeftD.png" width="300"/> |

| Light Mode query?Fix!| Dark Mode query?Fix!|
|------------|-----------|
| <img src="/screenshots/queryLight.png" width="300"/> | <img src="/screenshots/queryDark.png" width="300"/> |

| Light Mode glassmorphism in head | Dark Mode glassmorphism in head|
|------------|-----------|
| <img src="/screenshots/glassLig.png" width="300"/> | <img src="/screenshots/glassDark.png" width="300"/> |






Filtering & Interactive List:
### 🤝 Contribute

 Contributions are welcome! Feel free to open issues or pull requests.