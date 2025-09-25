import React from "react";
import { Spin, Alert } from "antd";

// FEATURES
import CreateForm from "./components/CreateForm";

// HOOKS
import { useGetCategories } from "@/hooks/useGetCategories";

const CreateTodo = () => {
  const { categories, loading, error } = useGetCategories();

  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: 100 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ paddingTop: 100 }}>
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <>
      <section style={{ paddingTop: 100 }}>
        <CreateForm title="Todo / Create" categories={categories} />
      </section>
    </>
  );
};

export default CreateTodo;
