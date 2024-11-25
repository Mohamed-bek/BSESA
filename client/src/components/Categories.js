import React, { useState, useEffect } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/categories");
        setCategories(response.data.categorys);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle adding a new category
  const handleAddCategory = async () => {
    if (!newCategory) return;
    try {
      const response = await axios.post("http://localhost:8000/categories", {
        name: newCategory,
      });
      setCategories([...categories, response.data]); // Update categories state
      setNewCategory(""); // Clear the input field
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:8000/categories/${categoryId}`);
      setCategories(
        categories.filter((category) => category._id !== categoryId)
      ); // Remove the deleted category from state
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId) // Deselect the category if already selected
          : [...prev, categoryId] // Select the category
    );
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-[600px] mx-auto">
      <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>

      {/* Displaying all categories */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Categories</h3>
        <ul className="list-disc pl-6 space-y-2">
          {categories.map((category) => (
            <li
              key={category._id}
              className="flex justify-between items-center"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category._id)}
                  onChange={() => handleCategorySelect(category._id)}
                  className="mr-2"
                />
                <span>{category.name}</span>
              </div>
              <button
                onClick={() => handleDeleteCategory(category._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Add new category */}
      <div className="mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category"
          className="p-2 w-full mb-2 border rounded-md"
        />
        <button
          onClick={handleAddCategory}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Add Category
        </button>
      </div>

      {/* Display selected categories */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Selected Categories</h3>
        <ul className="list-disc pl-6">
          {selectedCategories.map((categoryId) => {
            const category = categories.find((cat) => cat._id === categoryId);
            return category ? <li key={categoryId}>{category.name}</li> : null;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
