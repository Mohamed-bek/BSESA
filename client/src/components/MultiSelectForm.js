import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const MultiSelectForm = ({ selectedCategories, setSelectedCategories }) => {
  const [categories, setCategories] = useState(null);
  const [showInput, setShowInput] = useState(false); // Controls visibility of input
  const [newCategory, setNewCategory] = useState(""); // New category name

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/categories"
        );
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevSelectedCategories) => {
      const categoryId = category._id;
      if (prevSelectedCategories.includes(categoryId)) {
        return prevSelectedCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevSelectedCategories, categoryId];
      }
    });
  };

  const handleAddCategory = async () => {
    if (!newCategory) {
      alert("Please enter a category name.");
      return;
    }

    try {
      const response = await axios.post(
        "https://bsesa-ksem.vercel.app/categories",
        { name: newCategory },
        { withCredentials: true }
      );
      setCategories((prevCategories) => [
        ...prevCategories,
        response.data.category,
      ]);
      setNewCategory("");
      setShowInput(false);
    } catch (error) {
      console.error("Error adding category:", error);
      alert("There was an error adding the category.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    // Add any additional logic for form submission if needed
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-whiteColor rounded-lg w-full max-w-[400px] mx-auto"
    >
      <p className="block mb-2 text-center text-[1.5rem]">Choose categories</p>
      <div className="w-full max-w-[500px] h-fit max-h-[150px] overflow-y-auto px-2 py-1 flex justify-center items-center flex-wrap gap-2">
        {categories?.map((categorie) => (
          <span
            key={categorie._id}
            onClick={(e) => {
              handleCategoryClick(categorie);
            }}
            className={`bg-[#d8d6d6] text-[1.1rem] font-medium p-1 px-2 rounded-md cursor-pointer category ${
              selectedCategories.includes(categorie._id) ? "active" : ""
            }`}
          >
            {categorie.name.toLowerCase()}
          </span>
        ))}
        <button
          type="button" // Prevents form submission
          onClick={() => setShowInput((prev) => !prev)} // Toggle visibility
          className=" bg-primary text-whiteColor p-2 rounded-md w-fit "
        >
          {showInput ? "Cancel" : <FaPlus />}
        </button>
      </div>
      {showInput && (
        <div className="mt-4 mx-auto">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="w-full max-w-[300px] p-2 border-b-2 border-primary bg-transparent mb-5 focus:outline-none mx-auto block"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="mt-2 bg-primary text-whiteColor p-2 rounded-md w-fit block mx-auto px-2"
          >
            Add Category
          </button>
        </div>
      )}
    </form>
  );
};

export default MultiSelectForm;
