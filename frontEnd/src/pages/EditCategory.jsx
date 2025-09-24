import React from "react";
import { useParams } from "react-router";

// FEATURES
import EditForm from "@/features/category/EditForm";

const EditCategory = () => {
  const { id } = useParams();

  return (
    <>
      <section style={{ paddingTop: 100 }}>
        <EditForm title="Category / Edit" params={id} />
      </section>
    </>
  );
};

export default EditCategory;
