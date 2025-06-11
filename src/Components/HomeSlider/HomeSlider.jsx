import Slider from "react-slick";
import img3 from "../../assets/images/—Pngtree—light color simple gourmet food_995771.jpg";
import img2 from "../../assets/images/—Pngtree—e-commerce taobao summer food summer_1057087.webp";
import img1 from "../../assets/images/—Pngtree—e-commerce minimalist dark green food_1107732.webp";
import banner1 from "../../assets/images/blog-img-1.webp";
import banner2 from "../../assets/images/blog-img-2.webp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function HomeSlider() {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="flex p-4 my-4">
      <div className="w-3/4  cursor-grab">
        <Slider {...settings}>
          <div>
            <img
              src={img1}
              loading="eager"
              className="w-full md:h-72 h-40 "
              alt=""
            />
          </div>
          <div>
            <img src={img2} className="w-full md:h-72 h-40 " alt="" />
          </div>
          <div>
            <img src={img3} className="w-full md:h-72 h-40 " alt="" />
          </div>
        </Slider>
      </div>
      <div className="w-1/4">
        <div>
          <img
            src={banner2}
            loading="lazy"
            className="w-full md:h-36 h-20"
            alt=""
          />
        </div>
        <div>
          <img
            src={banner1}
            loading="lazy"
            className="w-full md:h-36 h-20"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
