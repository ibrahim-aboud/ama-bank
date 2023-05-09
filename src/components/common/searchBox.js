import React, { useState } from "react";
import Scrollbar from "./scrollbar";
import { FaAngleDown } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

function SearchBox({
  items,
  selectedId,
  setSelectedId,
  searchField,
  autoSelect,
}) {
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
        <div className={`relative ${autoSelect ? "w-full" : "md:w-[80%]"}`}>
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
            className={`container absolute z-10 py-2 mt-2 ${
              filteredList.length < 9 ? "min-h-96" : "h-96"
            } bg-gray-100 drop-shadow-md hover:drop-shadow-lg rounded-lg ${
              showDropList ? "block" : "hidden"
            }`}
          >
            <Scrollbar wheelPropagation={false}>
              <ul
                className={`flex-col px-6 ${
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

                      autoSelect && setSelectedId(item.id);
                    }}
                  >
                    {item[searchField]}
                  </li>
                ))}
              </ul>
            </Scrollbar>
          </div>
        </div>

        {!autoSelect && (
          <button
            className="flex items-center justify-center gap-4 py-2.5 pl-4 pr-6 rounded-lg bg-[#40916C] text-white hover:bg-[#419f75] hover:ease-in-out duration-300"
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
            <span className="text-xl font-medium">Rechercher</span>
          </button>
        )}
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
