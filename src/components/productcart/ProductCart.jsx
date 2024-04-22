import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import Mycontext from "../../context/Mycontext";
import Loder from "../loder/Loder";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import toast from "react-hot-toast";

const ProductCart = () => {
  const navigate = useNavigate();

  const context = useContext(Mycontext);
  const { loading, getAllProduct } = context;

  const cartItems = useSelector((state) => state.cart);
  // console.log(cartItems)
  const dispatch = useDispatch();

  //add to cart function
  const addCart = (item) => {
    // console.log(item)
    dispatch(addToCart(item));
    toast.success("Add to cart");
  };

  //delete function
  const deletecart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete to cart");
  };

  // if i add the data then it is added but i refresh the page then data is undefined
  // so the data is store in the  localstorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="mt-10">
      {/* heading */}
      <div className="">
        <h1 className=" text-center mb-5 text-2xl font-semibold">
          Best Selling Products
        </h1>
      </div>
      {/* main */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto">
          <div className="flex justify-center">{loading && <Loder />}</div>

          <div className="flex flex-wrap -m-4">
            {getAllProduct.slice(0, 8).map((item, index) => {
              const { id, title, price, productImageUrl } = item;
              return (
                <div key={index} className="p-4 w-full md:w-1/4">
                  <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                    <img
                      onClick={() => navigate(`/productinfo/${id}`)}
                      className="lg:h-70 h-80 w-full"
                      src={productImageUrl}
                      alt="image"
                    />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-grey-400 mb-1">
                        Shopping Cart
                      </h2>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {title.substring(0, 25)}
                      </h1>
                      <h1 className="title-font text-lg font-medium text-gray-600 mb-3">
                        Rs {price}
                      </h1>
                      <div className="flex justify-center ">
                        {/* if product id is equal to item.id the show delete button and not eual to id then show add button*/}
                        {/* if the product is in cart then show delete if the product is not in the cart then showw add to cart */}
                        {cartItems.some((product) => product.id === item.id) ? (
                          <button
                            onClick={() => deletecart(item)}
                            className="bg-blue-400 hover:bg-blue-600 w-full text-white py-[4px] rounded-lg font-bold"
                          >
                            Delete From Cart
                          </button>
                        ) : (
                          <button
                            onClick={() => addCart(item)}
                            className="bg-blue-400 hover:bg-blue-600 w-full text-white py-[4px] rounded-lg font-bold"
                          >
                            Add To Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
export default ProductCart;
