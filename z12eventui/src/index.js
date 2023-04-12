import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/Login';
import { RegisterFirstPage, RegisterSecondPage } from './pages/Register';
import { CreateEventBasic, EventDetailPage } from './pages/Events';
import Home from './pages/Home';
import About from './pages/About';
// import * as React from "react";
// import * as ReactDOM from "react-dom";


// import Root, { rootLoader } from "./routes/root";
// import Team, { teamLoader } from "./routes/team";

const router = createBrowserRouter([
  // {
    // path: "/",
    // element: <></>,
    // children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/register",
        element: <RegisterFirstPage />
      },
      {
        path: "/registerMinor",
        element: <RegisterSecondPage />
      },
      {
        path: "/createEvent",
        element: <CreateEventBasic />
      },
      {
        path: "/events/:id",
        element: <EventDetailPage />
      },
      {
        path: "/about",
        element: <About />
      }
    // ],
  // },
]);

document.title = "Z12 Events Manager"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
    // <App />
    // </RouterProvider>
);
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/login",
//     element: <LoginPage />
//   }
// ]);
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
