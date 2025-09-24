import React from "react";
import { Button, Input } from "antd";
import { useNavigate } from "react-router";

// Features
import TodoTable from "@/features/todo/TodoTable";

// HOOKS
import { useTodos } from "@/features/todo/hooks/useTodos";

const { Search } = Input;

const Todo = () => {
  const [page, setPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const { todos, loading, error, total } = useTodos(page, 10, searchTerm);
  const navigate = useNavigate();

  return (
    <>
      <section style={{ paddingTop: 100, paddingLeft: 15, paddingRight: 15 }}>
        <div
          style={{
            padding: 15,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Search
            placeholder="Search Title"
            enterButton="Search"
            style={{ width: 300 }}
            loading={loading}
            onSearch={(value) => {
              setPage(1); // reset page saat search
              setSearchTerm(value);
            }}
          />

          <Button
            type="primary"
            style={{ backgroundColor: "#52c41a" }}
            onClick={() => navigate("/create")}
          >
            Create Todo
          </Button>
        </div>

        <TodoTable page={page} setPage={setPage} todos={todos} total={total} />

        {error && <p style={{ color: "red" }}>{error}</p>}
      </section>
    </>
  );
};

export default Todo;
