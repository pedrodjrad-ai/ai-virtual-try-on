# AI Virtual Try-On

This application allows users to virtually try on clothes. Users upload a photo of themselves and a photo of the clothing, and the AI combines the two to create a new image showing the person wearing the item.

This project was bootstrapped with [Vite](https://vitejs.dev/).

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd ai-virtual-try-on
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Create a file named `.env.local` in the root of the project.
    -   Add your Google Gemini API key to this file:
        ```
        VITE_API_KEY=your_gemini_api_key_here
        ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Builds the app for production to the `dist` folder.
-   `npm run preview`: Serves the production build locally to preview it.
-   `npm start`: An alias for `npm run preview`.

## Deployment to Vercel

This project is configured for easy deployment to [Vercel](https://vercel.com/).

### Step 1: Push to GitHub

1.  **Create a new repository on GitHub.**
2.  **Initialize a git repository locally** if you haven't already:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
3.  **Link your local repository to the GitHub repository** and push your code:
    ```bash
    git remote add origin https://github.com/your-username/your-repository-name.git
    git branch -M main
    git push -u origin main
    ```

### Step 2: Deploy on Vercel

1.  **Sign up or log in** to your [Vercel account](https://vercel.com/signup).

2.  **Import your project:**
    -   From your Vercel dashboard, click on **"Add New..."** -> **"Project"**.
    -   Choose **"Continue with Git"** and select the GitHub repository you just created. Vercel will ask for permission to access your GitHub repositories if it's your first time.

3.  **Configure the project:**
    -   Vercel will automatically detect that you are using **Vite** and configure the build settings correctly. You shouldn't need to change anything here.
        -   **Framework Preset:** Vite
        -   **Build Command:** `npm run build` (or `vite build`)
        -   **Output Directory:** `dist`
    -   The most important step is to add your **environment variable**.
        -   Go to the **"Environment Variables"** section.
        -   Add a new variable with the name `VITE_API_KEY`.
        -   Paste your Google Gemini API key into the value field.
        -   Click **"Add"**.

4.  **Deploy:**
    -   Click the **"Deploy"** button.
    -   Vercel will start building and deploying your application. You can watch the progress in the build logs.
    -   Once deployed, you will be given a public URL where your AI Virtual Try-On application is live!
