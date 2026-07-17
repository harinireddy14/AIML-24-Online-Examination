import { useEffect, useState } from "react";
import "../../assets/styles/dashboard.css";
import {
  getCategories,
  addCategory,
  deleteCategory,
} from "../../services/categoryService";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await addCategory(category);

      alert("Category Added Successfully");

      setCategory({
        title: "",
        description: "",
      });

      loadCategories();
    } catch (err) {
      console.log(err);
      alert("Failed to Add Category");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);

      alert("Category Deleted Successfully");

      loadCategories();
    } catch (err) {
      console.log(err);
      alert("Failed to Delete Category");
    }
  };

  return (
    <div className="dashboard-content">

      <h1>📚 Categories</h1>

      <div className="card">

        <h2>Add Category</h2>

        <input
          type="text"
          name="title"
          placeholder="Category Title"
          value={category.title}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Category Description"
          value={category.description}
          onChange={handleChange}
        />

        <br /><br />

        <button className="login-btn" onClick={handleSubmit}>
          Add Category
        </button>

      </div>

      <br />

      {categories.length === 0 ? (

        <div className="card">
          <h3>No Categories Found</h3>
        </div>

      ) : (

        categories.map((cat) => (

          <div className="card" key={cat.catId}>

            <h2>{cat.title}</h2>

            <p>{cat.description}</p>

            <button
              className="login-btn"
              onClick={() => handleDelete(cat.catId)}
            >
              Delete
            </button>

          </div>

        ))

      )}

    </div>
  );
};

export default Categories;