import React from "react";

// ANT DESIGN
import { Button, Input } from "antd";
const { Search } = Input;

// REACT ROUTER
import { useNavigate } from "react-router";

// FEATURES
import TableCategory from "@/features/category/components/TableCategory";

// HOOKS
import { useCategoriesPagination } from "@/hooks/useCategoriesPagination";

const ManageCategories = () => {
  const [page, setPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const { categories, loading, error, total } = useCategoriesPagination(
    page,
    10,
    searchTerm
  );
  const navigate = useNavigate();

  return (
    <>
      <section style={{ paddingTop: 100 }}>
        <div
          style={{
            padding: 15,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Search
            placeholder="Search Category"
            enterButton="Search"
            style={{ width: 300 }}
            loading={loading}
            onSearch={(value) => {
              setPage(1); // reset page saat search
              setSearchTerm(value);
            }}
          />

          <Button
            type="primary"
            style={{ backgroundColor: "#52c41a" }}
            onClick={() => navigate("/manage-category/create")}
          >
            Create Category
          </Button>
        </div>

        <TableCategory
          page={page}
          setPage={setPage}
          categories={categories}
          total={total}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
      </section>
    </>
  );
};

export default ManageCategories;
