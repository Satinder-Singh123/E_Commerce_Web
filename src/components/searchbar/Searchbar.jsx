import React, { useContext } from "react";
import { useState } from "react";
import Mycontext from "../../context/Mycontext";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  const context = useContext(Mycontext);
  const { getAllProduct } = context;

  //Search State
  const [search, setsearch] = useState("");
  //Filter Search Date

  const filterSearchData = getAllProduct
    .filter((obj) => obj.title.toLowerCase().includes(search))
    .slice(0, 5);

  const navigate = useNavigate();
  return (
    <div className="">
      {/* search input */}
      <div className="input flex justify-center">
        <input
          text="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          className=".shadow-2xl bg-gray-100 placeholder-blue-600 rounded-lg px-2 py-2 lg:w-80 outline-none text-black"
        />
      </div>
      {/* search drop-down */}
      <div className="">
        {/* If user will seacrh then dropdown show */}
        {search && (
          <div className="block absolute bg-gray-200 md:w-96 lg:w-96 z-50 my-1 rounded-lg px-2 py-2">
            {filterSearchData.length > 0 ? (
              <>
                {filterSearchData.map((item, index) => {
                  return (
                    <div
                      onClick={() => navigate(`/productinfo/${item.id}`)}
                      key={index}
                      className="py-2 px-2"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          className="w-7"
                          src={item.productImageUrl}
                          alt=""
                        />
                        {item.title}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <img
                    className="w-10"
                    src="https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527130.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1712534400&semt=ais"
                    alt="img"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
