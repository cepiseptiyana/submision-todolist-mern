import React from "react";
import {
  Button,
  Form,
  Input,
  Radio,
  Select,
  Grid,
  DatePicker,
  Alert,
} from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

import dayjs from "dayjs";

// API
import { updateTodo, getById } from "./api/todoApi";

const { useBreakpoint } = Grid;
const { TextArea } = Input;

const EditForm = (props) => {
  const [editTodo, setEditTodo] = React.useState(null);
  const [successForm, setSuccessForm] = React.useState("");
  const [errorInputForm, setErrorInputForm] = React.useState("");
  const { title, params } = props;
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (params) {
      async function editDataTodo(params) {
        try {
          const response = await getById(params);

          const data = {
            ...response.data,
            due_date: response.data.due_date
              ? dayjs(response.data.due_date)
              : null,
          };

          console.log(response);
          setEditTodo(data);
        } catch (err) {
          console.log(err.message);
        }
      }
      editDataTodo(params);
    }
  }, [params]);

  // FORM DEFAULT VALUE
  React.useEffect(() => {
    if (editTodo) {
      form.setFieldsValue({
        completed: editTodo.completed,
        due_date: editTodo.due_date,
      });
    }
  }, [editTodo]);

  const screens = useBreakpoint();
  const navigate = useNavigate();

  // handleCreateData
  const onFinish = async (values) => {
    // values akan berisi:
    // { title: '...', description: '...', category: '...', status: 1 atau 2 }

    try {
      const todoData = {
        ...values,
        due_date: values.due_date
          ? values.due_date.format("YYYY-MM-DD HH:mm:ss")
          : null, // kalau tidak diisi
      };

      // console.log(todoData);
      const response = await updateTodo(params, todoData);
      console.log("Response dari backend:", response);

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
            <SettingOutlined />
            Manage Categories
          </Button>
          <Form
            form={form}
            name="edit"
            labelCol={screens.sm ? { span: 4 } : { span: 0 }}
            wrapperCol={screens.sm ? { span: 24 } : { span: 20 }}
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
              <Input
                placeholder={
                  editTodo != null ? editTodo.title : "Enter Todo Title"
                }
              />
            </Form.Item>

            <p style={{ color: "red" }}>{errorInputForm}</p>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <TextArea
                placeholder={
                  editTodo != null ? editTodo.description : "Enter Todo Desc"
                }
              />
            </Form.Item>

            <Form.Item label="Priority" name="priority">
              <Select
                placeholder={
                  editTodo != null ? editTodo.priority : "Select a Priority"
                }
                options={[
                  { value: "high", label: <span>High</span> },
                  { value: "medium", label: <span>Medium</span> },
                  { value: "low", label: <span>Low</span> },
                ]}
              />
            </Form.Item>

            <Form.Item label="Category" name="category_id">
              <Select
                placeholder={
                  editTodo != null
                    ? editTodo.category.name
                    : "Select a Category"
                }
                options={[
                  { value: 1, label: <span>Work</span> },
                  { value: 2, label: <span>Personal</span> },
                  { value: 3, label: <span>Shopping</span> },
                  { value: 4, label: <span>Belajar</span> },
                  { value: 5, label: <span>bermain</span> },
                ]}
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
                Edit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EditForm;
