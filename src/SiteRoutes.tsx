import { lazy } from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";

const Home = lazy(() => import("./pages/Home"));
const Stats = lazy(() => import("./pages/Stats"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
      </Route>
      <Route path="*" element={<Navigate to="/home" />} />
    </>,
  ),
);
