import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

function SearchBox({ items, selectedId, setSelectedId, searchField }) {
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
      <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-3 md:gap-0">
        <div className="relative md:w-[80%]">
          <div className="flex items-center justify-between border border-gray-300 py-2 pl-4 pr-2 rounded-lg">
            <input
              type="text"
              className="border-none outline-none w-full"
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setShowDropList(true);
              }}
              value={searchQuery}
            />

            <button onClick={() => setShowDropList(!showDropList)}>
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
              className={`flex-col px-6 py-2 mt-2 bg-white drop-shadow-md hover:drop-shadow-lg rounded-lg ${
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
                  }}
                >
                  {item[searchField]}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          className="md:w-[15%] flex items-center justify-center gap-4 py-2.5 pl-4 pr-6 rounded-lg bg-[#40916C] text-white hover:bg-[#419f75]"
          onClick={() => {
            const item = items.find(
              (item) => item[searchField] === searchQuery
            );

            setShowDropList(false);

            if (!item) {
              setError("L'élément recherché n'existe pas dans la liste");
              return;
            }

            setError("");
            setSelectedId(item.id);
          }}
        >
          <AiOutlineSearch className="text-xl" />
          <span>Rechercher</span>
        </button>
      </div>

      {error && (
        <span className="self-center text-rose-500 font-semibold mt-2">
          {error}
        </span>
      )}
    </section>
  );
}

export default SearchBox;
