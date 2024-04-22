import Layout from "../../components/layout/Layout";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Mycontext from "../../context/Mycontext";
import Loder from "../../components/loder/Loder";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import toast from "react-hot-toast";

function CategoryPage() {
  const { categoryname } = useParams();
  const context = useContext(Mycontext);
  const { loading, getAllProduct } = context;

  //filter product
  const filterproduct = getAllProduct.filter((itm) =>
    itm.category.includes(categoryname)
  );
  console.log(filterproduct);

  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addcart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added To Cart");
  };

  const deletecart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete From Cart");
  };

  return (
    <Layout>
      <div className="mt-10">
        {/* heading */}

        <div className="">
          <h1
            className="text-center mb-5 text-2xl font-semibold
   first-letter:uppercase"
          >
            {categoryname}
          </h1>
        </div>
        {loading ? (
          <div className="flex justify-center">
            <Loder />
          </div>
        ) : (
          <section className="text-gray-600 body-font">
            <div className="container px-5 mx-auto">
              <div className="flex justify-center">{loading && <Loder />}</div>

              <div className="flex flex-wrap -m-4 justify-center">
                {filterproduct.length > 0 ? (
                  <>
                    {filterproduct.map((item, index) => {
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
                                {cartItems.some((p) => p.id === item.id) ? (
                                  <button
                                    onClick={() => deletecart(item)}
                                    className="bg-blue-400 hover:bg-blue-600 w-full text-white py-[4px] rounded-lg font-bold"
                                  >
                                    Add To Cart
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => addcart(item)}
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
                  </>
                ) : (
                  <div>
                    <div className="flex justify-center">
                      <img
                        className=" mb-2"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAACuCAMAAAClZfCTAAAAflBMVEX39/dBQUP4+PhAQEL09PT9/f05OTstLTDq6ur///+UlJU8PD8xMTQ1NTdUVFbt7e1NTU6fn6AoKCukpKWzs7RGRkeqqquQkJEYGB3Kysqnp6giIiWOjo8pKSy/v7/X19cbGx8QDxW3t7hvb3ABAQvb293Q0NB3d3hkZGUAAACDCKLNAAAHjElEQVR4nO2d63qjKhRAEUFFMdbm1jZtp+2c6cy8/wselZsGCpq0xmb2+nE+swuI64hsEnUQAgAAAAAAAAAAAAAAAAAAAK4TTCX46DPVReyILoWtMhhdG/Q5F+zvu4PDJFcgJW0vA4/6+Om9jBEVUZX26Ooc0TyNO8pdd5Lgihfd5yLKxPFjfBCRmFfSCCbrsisTqzIoSWQzGbk2R7ROWX+ENIp2IoAOD0IaPsgIu1uLCLqtZRley0giI+yQ0w939j1pFWFB97lVJI6apDulSLqiagOV0gxJjCJZJq2vTxEnVYsaMh8rQiMUoatUVD7dtqhBpAYawy9HA42x1/XHitZyoL1c4UDjb5uOH/IsSn7KyWknIziVkb0q41AU/1G13q//cl3EUUuSqKsT5iJSHJiMOBRFsswturaTyDmj0ebaTesnLA62uxa1kfV/TEbUjMZw2rsWtWV2r/gKFfFh6lilnSL8Y/N4L60JRU1ElkFoUw+HVXdetWV+bR6fr80RrSOBTh0LNZHx4w32JKc2xHZlWyeOVS6JtvJKzvjVzWgjmHT5vbZrdQfuZ46od5CeDV0L+coAAAAAAAAAAAAAAAAAAHCFYAfTa/iZt3+z4O3DCR0845gurwNnh9TiiflqkDu7hh9+jqLoyWrvNZtTHM7KODoiLryKELdq+ImjcxSt7L2ly1c0zRAoAkV2DVAEio57AIqCPQBFH+5ZkZWxwq/IpLY8nkg0PS82NVbFcf9mUkSI3MgS3YPYq0jWIIhMVrSVNc1eQ+CmpCy7svo3i6Imp+YS83+4UkPOpQijO1WDT1+j6ap3IxcUOEpljdtMNUL1kJtHkdZxM1ZRqv4aT1ekBkmcjlV0o2qUS1CkYiFFkVE0cW9aUXSSIhkDRcMqoChYBRQFq4CiYBVQFKxyMUV6FtY5dXGWIjOtO/bRKzVWkal7o3JqPrMiImlyanXA5yjCRGPvg+hnF0cr6rWnzqIomVURzm4TQXnjOJDJijDhsr2kIDpWqBjXsbGKaKTrZrb8eRTp1dXKMRxOUGTWd0ZRpGLJdEVbVdfk1Kb8TIrUYa7sfZymSMYGimTsJEXWRbr3V1AEikARKAJF6B9XZHLq1Mqpe6UuNunr/g0mfavYVyrSWVhWfvJZVMhYtDWKtipWjFRkcmp0o+omsyrC2VMhSFbIyql75U5Yo9k5umtRElDEEtm/onTk1IavVKSH14o6lp263KWWsUz/ClRWnv59rSI9vHxPNl/syxBW6It05b2YgyJQBIp8LYOiYA9AUbAHS1XUy6mNIs+PygNF9sQdmPRd+BXpYgNFHgaKPMnBeExObVZmvVzPJtMrrtjkf/pr20Dq6MKrqLcL/Yt/knlaI0grcn1tOx2zZI3MTSexXhw4cZTTQy6wAHHhX4Aws3gx+/V2z1WOnzHkmmWHvr2nJ8GLo1zpV5R4WgssY5l969cJ/Xs6S1EanU+chBT56voV+eqO5pwLNygCRbI9UBQCFAUBRUHOVOSfQcdNqkFFp0/63rpj+3eeokMykcKkZjrG/Yq4p7nAbQ/MW9eJ6Z++teJw1mrNvzjwL0DouAUI9rRGAjfPBOq6mustQMxtQOfgX2IuaBk7ls9fxk5lUTfyuZj3XkcXoCgIKAoCioKAoiCgKMiiHrZysXxFsz6y52Lpis568JMTUXP8g58ulq/IJLTTFfUqn87yFelykx9Cj/invGIHFAUBRUFAURBQFAQUBflWiiZ+MR9fj6KXr3rd3N2n/OOMdKtePDfv6+Z6YOemt9wJTZ/OhbQMwCNz4OlrtHn7BwAAAAAAAAAAAAAAAADApcHWhvVPdAe+8bP/dhyw9+HYWPCXilZvZ+ikvYslmhHQfEW73tFavbKHyp/Kyjf5Uwit2/dAbrftM6H2rxl0J3+9KR/kI9xs073jJo7kcWO0XYs/4bgWGyxZi8bpVkbwSjxvGieV70nwC0DzePMLdxuROMfx+y4XrDeis/S5/ZT8bP/raGHNRfH9vdS3WcsGdu+iRZQoD1wp4r83nUCa5F0E4+2fYa3FQPPyZdOeR1oRzVNGW1j9ok6j5gNKN23Y0cI6ZaKCPGfwYd19ZjgVQjAqLEVJ8kqGiqJc1GLFflmnEc23ZH/THF1PUSJPnjo1PzriKt25e94oonSgiIthhUnysaI0R2XNhorU6ZQvThF93jdj7XRFD3wj+CGG1ThFNdvXzVj7Hoowrf5uKDtdUZnettxJISMVUbb5S76LIoyqx+3pitZpJSCTziKKSdWMteKbKGrG2tvvrVEk04CxigZJn0uR2qB9Rc3HvH77LmcRotVdeaMUcTWjHUYr6n3GSM5oFKkZjfBaNnmb9xS1GdRreTSjURovbUbbx+L4yGMh8yIi3/pc7npvy8HV4eEjRYfhogGTdfe6i6LIZKKpIu2bU0SEHTpFmBCuFcnHZZNfn3KzzefRpIV4uNH0+1Gkgu89J03w3t1zfP949Ad6vxdJoD5WFdmrCN0/y6GXP8vLVC0zx733NUaXQGeDJi3EgzxHF/yo59g6u1QDdkS3Ye+WUuduAQAAAAAAAAAAAAAAAAAAgO/D/913mfFj7NJqAAAAAElFTkSuQmCC"
                        alt="Not Found"
                      />
                    </div>
                    <h1 className=" text-black text-xl text-center">
                      No {categoryname} product found
                    </h1>
                  </div>
                )}
                {/* https://cdn-icons-png.flaticon.com/128/2748/2748614.png */}
                {/* {getAllProduct.slice(0,8).map((item,index)=>{
                  const{id, title, price, productImageUrl}= item
                  return(
                      <div key={index} className="p-4 w-full md:w-1/4">
                        <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                          <img onClick={()=>navigate(`/productinfo/${id}`)} className="lg:h-70 h-80 w-full"
                          src={productImageUrl}
                          alt="image"
                          />
                          <div className="p-6">
                             <h2 className="tracking-widest text-xs title-font font-medium text-grey-400 mb-1">
                              Shopping Cart
                             </h2>
                             <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                              {title.substring(0,25)}
                             </h1 >
                             <h1 className="title-font text-lg font-medium text-gray-600 mb-3">
                              Rs {price}
                             </h1>
                             <div className="flex justify-center ">
                              <button className="bg-blue-400 hover:bg-blue-600 w-full text-white py-[4px] rounded-lg font-bold">
                                  Add To Cart
                              </button>
                             </div>
                              </div>
                          </div>  
                   </div>
                  )
              })} */}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}

export default CategoryPage;
