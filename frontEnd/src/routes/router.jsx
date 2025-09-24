import { createBrowserRouter } from "react-router";

// Template
import LayoutTemp from "@/template/LayoutTemp";

// Pages
// TODOS
import Todo from "@/pages/Todo";
import CreateTodo from "@/pages/CreateTodo";
import EditTodo from "@/pages/EditTodo";
import ManageCategories from "@/pages/ManageCategories";

// CATEGORY
import CreateCategory from "@/pages/CreateCategory";
import EditCategory from "@/pages/EditCategory";

const router = createBrowserRouter([
  // ROUTE TODOS
  {
    path: "/",
    Component: LayoutTemp,
    children: [
      { index: true, Component: Todo },
      { path: "create", Component: CreateTodo },
      { path: "edit/:id", Component: EditTodo },
    ],
  },

  // ROUTE CATEGORY
  {
    path: "manage-category",
    Component: LayoutTemp,
    children: [
      { index: true, Component: ManageCategories },
      { path: "create", Component: CreateCategory },
      { path: "edit/:id", Component: EditCategory },
    ],
  },
]);

export default router;
