# CinemaDirectory - Top 250 Movies

A modern, responsive movie directory built with **Next.js 14**, **Tailwind CSS**, and **TMDB API**.  
Submitted for the RaftLabs Software Developer Intern Assessment.

## 🚀 Live Demo
[Cinema Directory](https://raft-labs-intership-assignment.vercel.app/)

## 🛠 Tech Stack
* **Framework:** Next.js 14 (App Router)
* **Styling:** Tailwind CSS + Lucide Icons
* **Data Fetching:** Server Components with `fetch` (ISR)
* **Language:** TypeScript

## 📚 Dataset
* **Source:** [The Movie Database (TMDB) API](https://www.themoviedb.org/)
* **Scope:** Top 250 Rated Movies (Fetched via Pagination)
* **Data Handling:** I used server-side fetching with `revalidate: 3600` (ISR) to cache the data for performance while keeping it fresh, avoiding the need for a server database.

## 🤖 AI Usage & Prompts
I leveraged AI (Gemini/ChatGPT) to accelerate development. Here are the key prompts used:

**Prompt 1 (Data Fetching Logic):**
> "Write a TypeScript function to fetch movies from TMDB API using Next.js 14 fetch. Ensure it handles pagination and includes a revalidate tag for ISR. The return type should match the Movie interface."

**Prompt 2 (UI Component):**
> "Create a 'Movie Card' component using Tailwind CSS. It should display the poster, title, and star rating. On hover, the poster should zoom in slightly and show an overlay. Ensure it is fully responsive."

**Prompt 3 (Search Logic):**
> "How do I implement a search bar in Next.js 14 App Router that updates the URL query parameters without reloading the page? Provide the client component code."

## 🔮 Improvements (If I had 2 more days)
1.  **Infinite Scroll:** Replace pagination with infinite scrolling for a smoother mobile experience.
2.  **Favorites List:** Add `localStorage` functionality to let users save their favorite movies.
3.  **Trailers:** Fetch and embed YouTube trailers on the detail page.

## 📦 How to Run Locally
1.  Clone the repo
2.  `npm install`
3.  Create `.env.local` with `NEXT_PUBLIC_TMDB_API_KEY=your_key`
4.  `npm run dev`