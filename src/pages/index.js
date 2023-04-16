import { getSession } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import SearchBox from "@/components/common/searchBox";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Home({ banks }) {
  return (
    <div>
      <section className="">
        <Slideshow />
      </section>

      <section>
        BANKS LIST 
      </section>
    </div>
  );
}

function Slide() {
    return (
      <div>

      </div>
    )
}

function Slideshow() {
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <Slider {...settings}>
        <div className="relative h-0 pb-[56.25%]">
          <Image
            className="absolute inset-0 w-full h-full object-cover"
            src="/assets/images/slideshow/i1.png"
            layout="fill"
            objectFit="cover"
            alt="Image"
          />
        </div>
        <div className="relative h-0 pb-[56.25%]">
          <Image
            className="absolute inset-0 w-full h-full object-cover"
            src="/assets/images/slideshow/i1.png"
            layout="fill"
            objectFit="cover"
            alt="Image"
          />
        </div>
      
      </Slider>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  var banks = [];

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/banks"
    );

    banks = response.data.banks;
  } catch (e) {
    console.error(e.message);
  }

  return {
    props: { banks },
  };
}