import React from "react";
import Mycontext from "../../context/Mycontext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import Loder from "../../components/loder/Loder";
const categoryList = [
  {
    name: "fashion",
  },
  {
    name: "shirt",
  },
  {
    name: "jacket",
  },
  {
    name: "mobile",
  },
  {
    name: "laptop",
  },
  {
    name: "shoes",
  },
  {
    name: "home",
  },
  {
    name: "books",
  },
];

function UpdateProduct() {
  const context = useContext(Mycontext);
  const { loading, setLoading, getAllProductFunction } = context;

  //navigate
  const navigate = useNavigate();
  // id used to update the product
  const { id } = useParams();

  // product state
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // Get Single Product Function
  const getSingleProductFunction = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      //   console.log(product.data())
      const product = productTemp.data();
      setProduct({
        title: product?.title,
        price: product?.price,
        productImageUrl: product?.productImageUrl,
        category: product?.category,
        description: product?.description,
        quantity: product?.quantity,
        time: product?.time,
        date: product?.date,
        // quantity: product?.quantity,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", id), product);
      toast.success("Product Updated successfully");
      getAllProductFunction();
      setLoading(false);
      navigate("/admin ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProductFunction();
  }, []);
  return (
    <div className="updatepage bg-blue-50">
      <div className="flex justify-center items-center h-screen">
        {loading && <Loder />}
        {/* Login Form */}
        <div className="login_form bg-blue-50 px-8 py-6 border border-blue-100 rounded-xl shadow-md">
          {/* top heading */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-blue-500">
              Update Product
            </h2>
          </div>

          {/* input one */}
          <div className="mb-3">
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={(e) => {
                setProduct({
                  ...product,
                  title: e.target.value,
                });
              }}
              placeholder="Product Title"
              className="bg-blue-50 border text-blue-200 border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-300"
            />
          </div>
          {/* Input Two  */}
          <div className="mb-3">
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={(e) => {
                setProduct({
                  ...product,
                  price: e.target.value,
                });
              }}
              placeholder="Product Price"
              className="bg-blue-50 border text-blue-300 border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-300"
            />
          </div>
          {/* Input Three  */}
          <div className="mb-3">
            <input
              type="text"
              name="productImageUrl"
              value={product.productImageUrl}
              onChange={(e) => {
                setProduct({
                  ...product,
                  productImageUrl: e.target.value,
                });
              }}
              placeholder="Product Image URL"
              className="bg-blue-50 border text-blue-300 border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-300"
            />
          </div>

          {/* input four */}
          <div className="mb-3">
            <select
              value={product.category}
              onChange={(e) => {
                setProduct({
                  ...product,
                  category: e.target.value,
                });
              }}
              className="w-full px-1 py-2 text-blue-300 bg-blue-50 border border-blue-200 rounded-md outline-none"
            >
              <option disabled>Select Product Category</option>
              {categoryList.map((value, index) => {
                const { name } = value;
                return (
                  <option
                    className="first-letter:uppercase"
                    key={index}
                    value={name}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* input five */}
          <div className="mb-3">
            <textarea
              name="description"
              value={product.description}
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: e.target.value,
                });
              }}
              placeholder="Product Description"
              rows="5"
              className="w-full px-2 py-1 text-blue-300 bg-blue-50 border border-blue-200 rounded-md outline-none placeholder-blue-300"
            ></textarea>
          </div>
          {/* update product button */}
          <div className="mb-3">
            <button
              type="button"
              onClick={updateProduct}
              className="bg-blue-500 hover:bg-blue-700 w-full teext-white text-center pu-2 font-bold rounded-md"
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
