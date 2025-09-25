import React from "react";
import { Space, Table, Tag, Popconfirm, Grid } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

// API
import { deleteTodo } from "@/api/todoApi";

const { useBreakpoint } = Grid;

const TodoTable = (props) => {
  const { page, setPage, todos, total } = props;
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log(todos);
  }, [todos]);

  // responsive
  const screens = useBreakpoint();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (completed) =>
        completed ? (
          <Tag color="green">Completed</Tag>
        ) : (
          <Tag color="volcano">Incomplete</Tag>
        ),
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => {
        return <Tag color={category.color}>{category.name}</Tag>;
      },
    },

    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => {
        if (priority === "high") return <Tag color="red">{priority}</Tag>;
        if (priority === "medium") return <Tag color="yellow">{priority}</Tag>;
        if (priority === "low") return <Tag color="green">{priority}</Tag>;
      },
    },

    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
      render: (date) => new Date(date).toLocaleDateString(), // "23/9/2025"
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this todo?"
            onConfirm={async () => {
              await deleteTodo(record.id);
              window.location.reload(); // full refresh
            }}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined
              style={{ color: "#DC143C", fontSize: 18, cursor: "pointer" }}
            />
          </Popconfirm>

          <FormOutlined
            style={{ color: "#1890ff", fontSize: 18, cursor: "pointer" }}
            onClick={() => navigate("/edit/" + record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      style={{ overflowX: screens.sm ? "visible" : "scroll" }}
      columns={columns}
      rowKey="id" // penting biar Table gak warning
      dataSource={todos}
      pagination={{
        current: page,
        pageSize: 10,
        total: total,
        onChange: (p) => setPage(p),
      }}
    />
  );
};

export default TodoTable;
