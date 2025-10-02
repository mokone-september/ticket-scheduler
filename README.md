# Ticket Scheduler

Ticket Scheduler is a simple and modern web application for scheduling and tracking tasks or tickets. Built with React, Vite, and Material UI (MUI), it provides an intuitive interface for adding tasks with a date picker, and displays scheduled tickets in a clean, responsive layout.

## Features

- Add new tickets with a task name and date
- Modern Material UI design
- Date selection using MUI Date Picker
- Instant feedback with notifications (success/error)
- Responsive and centered layout
- Global state management with Zustand
- Local background image for improved performance

## Technologies Used

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Material UI (MUI)](https://mui.com/)
- [@mui/x-date-pickers](https://mui.com/x/react-date-pickers/)
- [dayjs](https://day.js.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/mokone-september/ticket-scheduler.git
    cd ticket-scheduler
    ```
2. Install dependencies:
    ```sh
    npm install
    ```

### Running the App

Start the development server:

```sh
npm run dev
```

Open your browser and navigate to the local server address (usually http://localhost:5173).

## Usage

1. Enter a task name in the input field.
2. Select a date using the date picker.
3. Click "Add Ticket" to schedule the ticket.
4. View all scheduled tickets in the list below.
5. Notifications will appear for successful or invalid actions.

## State Management

This project uses [Zustand](https://zustand-demo.pmnd.rs/) for global state management. All tickets and notification states are managed centrally, making the app scalable and easy to maintain.

## Background Image

A local background image (`public/bg.jpg`) is used for better performance and reliability. You can replace this image with your own by placing a new file at `public/bg.jpg`.

## Project Structure

- `src/components/TicketForm.jsx` — Ticket creation form
- `src/components/TicketList.jsx` — List of scheduled tickets
- `src/store/useTicketStore.js` — Zustand store for global state
- `src/App.jsx` — App entry point and layout
- `public/` — Static assets (including background image)

## License

This project is licensed under the MIT License.
