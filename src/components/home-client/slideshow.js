import Slide from "@/components/common/slide";
import Slider from "react-slick";

export default function Slideshow({slides}) {
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
  
    var idToUrl = {}

    slides.forEach(element => {
      idToUrl[element.id] = element.link ;
    });
  
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