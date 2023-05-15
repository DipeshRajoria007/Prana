import React from "react";
import { testimonials } from "../constants/index";
import { Avatar } from "@mantine/core";
import Slider from "react-slick";

const Testimonials = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    centerMode: true,
    // variableWidth: true,
    centerPadding: "50px",
  };

  return (
    <div className="mb-12 p-4">
      <h1 className="mb-4 text-center text-3xl font-bold text-gray-600">
        Testimonials
      </h1>

      <Slider {...settings}>
        {testimonials.map((testimonial) => {
          const initials = testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("");
          return (
            <div
              key={testimonial.id}
              className=" flex  items-center justify-center rounded-lg bg-white p-4  "
            >
              <div className="flex items-center justify-center gap-4">
                <Avatar size="md" color="blue" radius="md">
                  {initials}
                </Avatar>
                <h2 className="text-xl font-semibold text-blue-800">
                  {testimonial.name}
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center gap-4">
                <h2 className="text-[0.65rem] font-light text-blue-800">
                  ({testimonial.position})
                </h2>
                <p className="text-gray-500">{testimonial.testimonial}</p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Testimonials;
