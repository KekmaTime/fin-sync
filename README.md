# Financial Data Filtering App - Development Roadmap

## Phase 1: Initial Setup
- [x] Set up React + TypeScript + Vite project
- [x] Install and configure TailwindCSS
- [x] Add environment variable for API key

## Setup Instructions
1. Clone the repository
2. Install dependencies: `bun i`
3. Copy `.env.example` to `.env` and add your API key
4. Run the development server: `bun run dev`

## Phase 2: Data Fetching & Display
- [x] Create API service to fetch Apple financial data
- [x] Build simple table component with required columns:
  - Date
  - Revenue
  - Net Income 
  - Gross Profit
  - EPS
  - Operating Income
- [x] Add basic loading and error states with skeleton UI

## Phase 3: Filtering & Sorting
- [x] Implement sorting for:
  - Date
  - Revenue
  - Net Income
- [x] Add sort indicators on table headers
- [x] Add filter inputs:
  - Year range selector
  - Revenue range input
  - Net Income range input

## Phase 4: Responsive Design
- [ ] Make table mobile-friendly
- [x] Make filters responsive
- [ ] Test on different screen sizes

## Phase 5: Deploy
- [ ] Deploy to Vercel
- [ ] Add setup instructions in README

## Tech Stack
- React + TypeScript
- Vite
- TailwindCSS
- Shadcn/UI


