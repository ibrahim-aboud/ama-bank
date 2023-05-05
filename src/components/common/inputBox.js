import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

function InputBox({ items, selectedId, setSelectedId, searchField }) {
  const [showDropList, setShowDropList] = useState(false);

  function _getSelected() {
    if (!selectedId) return "";

    const item = items.find((item) => item.id === selectedId);
    if (!item) return "";

    return item[searchField];
  }

  const [searchQuery, setSearchQuery] = useState(_getSelected());
  const [error, setError] = useState("");

  const filteredList = items.filter((item) =>
    item[searchField].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="flex flex-col">
      <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-10">
        <div className="relative md:w-[90%]">
          <div className="flex items-center justify-between border bg-gray-100 border-gray-300 py-4 pl-4 pr-2 rounded-lg">
            <input
              type="text"
              placeholder="Rechercher..."
              className="border-none outline-none w-full text-md bg-gray-100"
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setShowDropList(true);
              }}
              value={searchQuery}
            />

            <button
              title="show-hide drop list"
              onClick={() => setShowDropList(!showDropList)}
            >
              {showDropList ? (
                <FaAngleDown className="rotate-180 text-lg" />
              ) : (
                <FaAngleDown className="text-lg" />
              )}
            </button>
          </div>

          <div
            className={`container absolute z-10 ${
              showDropList ? "block" : "hidden"
            }`}
          >
            <ul
              className={`flex-col px-6 py-2 mt-2 bg-gray-100 drop-shadow-md hover:drop-shadow-lg rounded-lg ${
                filteredList.length > 0 ? "flex" : "hidden"
              }`}
            >
              {filteredList.map((item) => (
                <li
                  key={item.id}
                  className="hover:bg-[#40916C] hover:text-white px-4 py-2 rounded-lg cursor-pointer"
                  onClick={() => {
                    setError("");
                    setSearchQuery(item[searchField]);
                    setShowDropList(false);
                    setSelectedId(item.id);
                  }}
                >
                  {item[searchField]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {error && (
        <span className="self-center text-rose-500 font-semibold mt-2">
          {error}
        </span>
      )}
    </section>
  );
}

export default InputBox;