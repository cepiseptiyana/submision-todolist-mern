import { createBrowserRouter } from "react-router";

// Template
import LayoutTemp from "@/template/LayoutTemp";

// Pages
import Todolist from "@/pages/TodoList";
import CreateTodo from "@/pages/CreateTodo";
import EditTodo from "@/pages/EditTodo";
import ManageCategories from "@/pages/ManageCategories";

const router = createBrowserRouter([
  {
    path: "/",
    Component: LayoutTemp,
    children: [
      { index: true, Component: Todolist },
      { path: "create", Component: CreateTodo },
      { path: "edit", Component: EditTodo },
      { path: "manage-category", Component: ManageCategories },
    ],
  },
]);

export default router;
