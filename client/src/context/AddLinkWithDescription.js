import React, { useState } from "react";
import { BiTrash } from "react-icons/bi";

const AddLinkWithDescription = ({ links, setLinks }) => {
  const [linkInput, setLinkInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const handleAddLink = () => {
    if (linkInput.trim() && descriptionInput.trim()) {
      setLinks([
        ...links,
        { link: linkInput.trim(), description: descriptionInput.trim() },
      ]);
      setLinkInput("");
      setDescriptionInput("");
    }
  };

  const handleRemoveLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4 w-full  mx-auto ">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            placeholder="Enter a link"
            className="flex-1 px-2 py-1 border-b-2 border-solid border-primary shadow-sm focus:outline-none"
          />
          <input
            type="text"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            placeholder="Enter a description"
            className="flex-1 px-2 py-1 border-b-2 border-solid border-primary shadow-sm focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddLink}
            className="px-3 py-1 text-white rounded-md hover:bg-primary bg-primary focus:outline-none"
          >
            Add
          </button>
        </div>
        {links.length > 0 && (
          <ul className="mt-2 space-y-2 max-h-[100px] overflow-y-auto">
            {links.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
              >
                <div className="tex">
                  <p className="font-medium w-full text-left">
                    {item.description}
                  </p>
                  <p className="font-medium pl-1 w-fit cursor-pointer text-left text-blue-800 border-b border-solid border-blue-800">
                    {item.link}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveLink(index)}
                  className="text-red-500 text-[1.4rem] hover:underline"
                >
                  <BiTrash />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddLinkWithDescription;
