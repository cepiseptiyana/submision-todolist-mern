import React from "react";

// FEATURES
import CreateForm from "@/features/todo/CreateForm";

const CreateTodo = () => {
  return (
    <>
      <section style={{ paddingTop: 100 }}>
        <CreateForm title="Todo / Create" />
      </section>
    </>
  );
};

export default CreateTodo;
