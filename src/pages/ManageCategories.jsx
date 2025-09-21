import React from "react";
import { Button, Form, Input, Grid } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const { TextArea } = Input;
const { useBreakpoint } = Grid;

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ManageCategories = () => {
  const screens = useBreakpoint();
  const navigate = useNavigate();

  return (
    <>
      <section style={{ paddingTop: 100, paddingLeft: 15, paddingRight: 15 }}>
        <div style={{ maxWidth: 600, margin: "auto" }}>
          <div>
            <h1>Create New Category</h1>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              paddingTop: 15,
              paddingBottom: 15,
            }}
          >
            <Button type="primary" onClick={() => navigate("/manage-category")}>
              <SettingOutlined />
              Manage Categories
            </Button>
          </div>

          <Form
            name="basic"
            labelCol={screens.sm ? { span: 5 } : { span: 0 }}
            wrapperCol={screens.sm ? { span: 24 } : { span: 19 }}
            style={{ maxWidth: 600, margin: "auto" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Create Category"
              name="title"
              rules={[{ required: true, message: "Please input your Title!" }]}
            >
              <Input placeholder="Enter Todo Title" />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Create Category
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </>
  );
};

export default ManageCategories;
