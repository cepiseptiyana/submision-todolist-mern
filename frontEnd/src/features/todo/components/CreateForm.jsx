import React from "react";
import { Button, Form, Input, Radio, Select, DatePicker, Alert } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

// API
import { createTodo } from "@/api/todoApi";

const { TextArea } = Input;

const CreateForm = (props) => {
  const { title, categories } = props;
  const [messageResponse, setResponse] = React.useState(null);

  const navigate = useNavigate();

  // handleCreateData
  const onFinish = async (values) => {
    try {
      const todoData = {
        ...values,
        due_date: values.due_date
          ? values.due_date.format("YYYY-MM-DD HH:mm:ss")
          : null, // kalau tidak diisi
      };

      const response = await createTodo(todoData);

      setResponse(response);
    } catch (err) {
      setResponse(err);
    }
  };

  // handle error form
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "600px" }}>
          <div style={{ fontFamily: "sans-serif" }}>
            <h1>{title}</h1>
          </div>

          {messageResponse != null ? (
            <Alert
              message={messageResponse.message}
              type={messageResponse.status ? "success" : "error"}
              style={{ marginBottom: 15 }}
            />
          ) : (
            ""
          )}

          <Button
            type="primary"
            style={{
              display: "block",
              marginInlineEnd: 0,
              marginLeft: "auto",
            }}
            onClick={() => navigate("/manage-category")}
          >
            <SettingOutlined /> Manage Categories
          </Button>

          <Form
            name="create"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            style={{ marginTop: 10 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input your Title!" }]}
            >
              <Input placeholder={"Enter Todo Title"} />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <TextArea placeholder={"Enter Todo Desc"} />
            </Form.Item>

            <Form.Item label="Priority" name="priority">
              <Select
                placeholder={"Select a Priority"}
                options={[
                  { value: "high", label: <span>High</span> },
                  { value: "medium", label: <span>Medium</span> },
                  { value: "low", label: <span>Low</span> },
                ]}
              />
            </Form.Item>

            <Form.Item label="Category" name="category_id">
              <Select
                placeholder={"Select a Category"}
                options={categories.map((category) => ({
                  value: category.id,
                  label: <span>{category.name}</span>,
                }))}
              />
            </Form.Item>

            <Form.Item name="completed" label="Completed">
              <Radio.Group
                options={[
                  { value: true, label: "complete" },
                  { value: false, label: "incomplete" },
                ]}
              />
            </Form.Item>

            <Form.Item name="due_date" label={null}>
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateForm;
