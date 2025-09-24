import { createBrowserRouter } from "react-router";

// Template
import LayoutTemp from "@/template/LayoutTemp";

// Pages
import Todo from "@/pages/Todo";
import CreateTodo from "@/pages/CreateTodo";
import EditTodo from "@/pages/EditTodo";
import ManageCategories from "@/pages/ManageCategories";

const router = createBrowserRouter([
  {
    path: "/",
    Component: LayoutTemp,
    children: [
      { index: true, Component: Todo },
      { path: "create", Component: CreateTodo },
      { path: "edit/:id", Component: EditTodo },
      { path: "manage-category", Component: ManageCategories },
    ],
  },
]);

export default router;
