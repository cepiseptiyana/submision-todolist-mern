import React from "react";
import { Space, Table, Tag, Input, Button } from "antd";
import { EyeOutlined, DeleteOutlined, FormOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router";

const { Search } = Input;

const TodoList = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined
            style={{ color: "#FCB53B", fontSize: 18, cursor: "pointer" }}
          />

          <DeleteOutlined
            style={{ color: "#DC143C", fontSize: 18, cursor: "pointer" }}
          />

          <FormOutlined
            style={{ color: "#1890ff", fontSize: 18, cursor: "pointer" }}
            onClick={() => navigate("/edit/" + record.id)}
          />
        </Space>
      ),
    },
  ];

  // data column
  const data = [
    {
      id: 1,
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

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
            loading={false}
          />

          <Button
            type="primary"
            style={{ backgroundColor: "#52c41a" }}
            onClick={() => navigate("/create")}
          >
            Create Todo
          </Button>
        </div>
        <Table columns={columns} dataSource={data} />;
      </section>
    </>
  );
};

export default TodoList;
