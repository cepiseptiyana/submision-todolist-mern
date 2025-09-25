import React from "react";
import { Space, Table, Tag, Popconfirm, Grid } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

// API
import { deleteCategory } from "@/api/categoryApi";

const { useBreakpoint } = Grid;

const TableCategory = (props) => {
  const { page, setPage, categories, total } = props;
  const navigate = useNavigate();
  console.log(categories);

  // responsive
  const screens = useBreakpoint();

  const columns = [
    {
      title: "Name Category",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        return <Tag color={record.color}>{record.name}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this todo?"
            onConfirm={async () => {
              await deleteCategory(record.id);
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
            onClick={() => navigate("/manage-category/edit/" + record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        style={{ overflowX: screens.sm ? "visible" : "scroll" }}
        columns={columns}
        rowKey="id" // penting biar Table gak warning
        dataSource={categories}
        pagination={{
          current: page,
          pageSize: 10,
          total: total,
          onChange: (p) => setPage(p),
        }}
      />
    </div>
  );
};

export default TableCategory;
