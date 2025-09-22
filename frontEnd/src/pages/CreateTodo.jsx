import React from "react";
import { Button, Form, Input, Radio, Select, Grid } from "antd";
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

const CreateTodo = () => {
  const screens = useBreakpoint();
  const navigate = useNavigate();

  return (
    <>
      <section style={{ paddingTop: 100 }}>
        <Form
          name="basic"
          labelCol={screens.sm ? { span: 4 } : { span: 0 }}
          wrapperCol={screens.sm ? { span: 24 } : { span: 20 }}
          style={{ maxWidth: 600, margin: "auto" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
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

          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your Title!" }]}
          >
            <Input placeholder="Enter Todo Title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <TextArea placeholder="Enter Todo Desc" />
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select
              placeholder="Select a Category"
              options={[
                { value: "work", label: <span>Work</span> },
                { value: "shopping", label: <span>Shopping</span> },
                { value: "study", label: <span>Study</span> },
                { value: "travel", label: <span>Travel</span> },
                { value: "finance", label: <span>Finance</span> },
              ]}
            />
          </Form.Item>

          <Form.Item name="status" label={null}>
            <Radio.Group
              options={[
                { value: 1, label: "complete" },
                { value: 2, label: "incomplete" },
              ]}
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </section>
    </>
  );
};

export default CreateTodo;
