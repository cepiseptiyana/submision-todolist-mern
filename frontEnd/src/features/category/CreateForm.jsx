import React from "react";
import { Button, Form, Input, ColorPicker, Alert } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

// API
import { createCategory } from "./api/categoryApi";

const CreateForm = (props) => {
  const [successForm, setSuccessForm] = React.useState("");
  const [errorInputForm, setErrorInputForm] = React.useState("");
  const { title } = props;

  const [form] = Form.useForm();

  const navigate = useNavigate();

  // handleCreateData
  const onFinish = async (values) => {
    // values akan berisi:
    // { title: '...', description: '...', category: '...', status: 1 atau 2 }

    try {
      const todoData = {
        ...values,
      };

      // console.log(todoData);
      const response = await createCategory(todoData);

      setSuccessForm(response.message);
      setErrorInputForm("");
    } catch (err) {
      setSuccessForm("");
      setErrorInputForm(err.message);
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

          {successForm != "" ? (
            <Alert
              message={successForm}
              type="success"
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
            form={form}
            name="edit"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ marginTop: 10 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Name Category"
              name="name"
              rules={[{ required: true, message: "Please input your Title!" }]}
            >
              <Input placeholder={"Enter Create Category"} />
            </Form.Item>

            <p style={{ color: "red" }}>{errorInputForm}</p>

            <Form.Item
              label="Color"
              name="color"
              rules={[{ required: true, message: "Please pick a color!" }]}
              getValueProps={(value) => ({ value })}
              valuePropName="value"
              trigger="onChange"
            >
              <ColorPicker
                onChange={(c) => {
                  // ubah Color2 menjadi hex string sebelum dimasukkan ke form
                  form.setFieldsValue({ color: c.toHexString() });
                }}
              />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Create Category
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateForm;
