import { createBrowserRouter } from "react-router";

// Template
import LayoutTemp from "@/template/LayoutTemp";

// Pages
// TODOS
import Todo from "@/pages/Todo";
import CreateTodo from "@/features/todo/CreateTodo";
import EditTodo from "@/features/todo/EditTodo";

// CATEGORY
import ManageCategories from "@/pages/ManageCategories";
import CreateCategory from "@/features/category/CreateCategory";
import EditCategory from "@/features/category/EditCategory";

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
