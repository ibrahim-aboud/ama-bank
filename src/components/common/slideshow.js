import Slide from "@/components/common/slide";
import Slider from "react-slick";

export default function Slideshow() {
    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  
    {
      /* add more slides here */
    }
    const idToUrl = {
      1: "https://www.example.com",
      2: "https://www.google.com",
      3: "https://www.github.com",
      4: "",
      5: "",
      6: "",
      7: "",
    };
  
    return (
      <div>
        <Slider {...settings}>
          {Object.keys(idToUrl).map((id) => (
            <div key={id}>
              <Slide
                url={idToUrl[id]}
                imgUrl={`/assets/images/slideshow/${id}.png`}
              />
            </div>
          ))}
        </Slider>
      </div>
    );
  }