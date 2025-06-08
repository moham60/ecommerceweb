import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";

import { DNA } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
export default function CategoriesSlider() {
  // const [AllCategories, setAllCategories] = useState(null);
  // const [isLoading, setisLoading] = useState(true)
  // function getAllCategories() {
  //     axios.get("https://ecommerce.routemisr.com/api/v1/categories").then(
  //         (x)=>{
  //             setAllCategories(x.data.data);
  //             setisLoading(false);
  //         }
  //     ).catch(
  //         (x)=>{
  //             console.log('error',x)
  //         }
  //     )
  // }

  // useEffect(() => {
  //     getAllCategories();
  // },[])
  async function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { isLoading, data } = useQuery({
    queryKey: ["Categories"],
    queryFn: getAllCategories,
  });
  const allCategories = data?.data.data;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
  };
  return (
    <>
      <h2 className=" font-bold m-3 md:text-3xl dark:text-white text-black">
        Shop Categories
      </h2>
      {isLoading && (
        <div className="flex justify-center h-52 items-center">
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}
      <div className="p-4 my-2">
        <Slider {...settings}>
          {allCategories &&
            allCategories.map((category) => (
              <div key={category._id} className=" cursor-grab">
                <div>
                  <img
                    src={category.image}
                    loading="lazy"
                    className="w-full md:h-48 h-28 block  "
                    alt={category.name}
                  />
                  <h4 className="dark:text-white">{category.name}</h4>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
}
