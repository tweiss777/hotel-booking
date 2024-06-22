import  React,{ createRef } from "react";
import App from "../App";
import { createBrowserRouter } from "react-router-dom";
export const routes = [
  {
    path: "/",
    element: <h1>test element</h1>,
    name: "About",
    nodeRef: createRef(),
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routes.map((route) => ({
      index: route.path === "/",
      path: route.path === "/" ? undefined : route.path,
      element: route.element,
    })),
  },
]);
