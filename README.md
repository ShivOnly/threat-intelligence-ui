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
It provides a clean and interactive interface to view and analyze **Indicators of Compromise (IOCs)** such as IPs, URLs, and Subnets with charts, summaries, and filters.  

---

## 🚀 Features
- 📊 **Summary Dashboard** – Total IOCs & severity breakdown  
- 🔍 **IOC Filtering** – Filter by severity or type  
- 📑 **IOC List** – Interactive IOC table/list  
- 📈 **Charts & Graphs** – Visualize IOC distribution  
- 🎨 **Modern UI/UX** – TailwindCSS + Framer Motion animations  
- ⚡ **Optimized for Performance** – Next.js App Router  
- 🐻 **State Management** – Zustand  

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

- /components       → Reusable UI components (Summary, IOCList, Chart, Filters)

- /lib              → Helper functions (e.g., data fetchers)

- /store            → Zustand state management

- /public           → Static assets (logos, icons, etc.)

📊 Example IOC Summary

-Total IOCs: 24
-Critical: 7
-High: 6
-Medium: 6
-Low: 5
(Charts update dynamically based on filters.)

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



**Dashboard Overview:**  
## 📸 Screenshots

| Light Mode Dashboard | Dark Mode Dashboard|
|------------|-----------|
| ![Dashboard Light](/screenshots/dashboard.png) | ![Dashboard Dark](/screenshots/2dashboard.png) |

| Light Mode Config| Dark Mode Config|
|------------|-----------|
| ![Light](/screenshots/configlight.png) | ![Dark](/screenshots/configdark1.png) |

| Light Mode Loading| Dark Mode Loading|
|------------|-----------|
| ![Light](/screenshots/loadli.png) | ![Dark](/screenshots/loadda.png) |



Filtering & Interactive List:
### 🤝 Contribute

 Contributions are welcome! Feel free to open issues or pull requests.