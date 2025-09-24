import React from "react";
import { useParams } from "react-router";

// FEATURES
import EditForm from "@/features/todo/EditForm";

const EditTodo = () => {
  const { id } = useParams();

  return (
    <>
      <section style={{ paddingTop: 100 }}>
        <EditForm title="Todo / Edit" params={id} />
      </section>
    </>
  );
};

export default EditTodo;
