"use client";

import { motion } from "framer-motion";
import Slider from "react-slick";
import { Star } from "lucide-react";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonials() {
  const [centerIndex, setCenterIndex] = useState(0);

  const testimonials = [
    {
      name: "Mel K",
      role: "Data Analyst",
      quote:
        "I love this platform! It’s fast, clean, and easy to use for visualizing data.",
    },
    {
      name: "Kasi",
      role: "Product Manager",
      quote:
        "The simplicity and speed are incredible — I can upload and see insights instantly.",
    },
    {
      name: "Zander",
      role: "Startup Founder",
      quote:
        "A must-have for any team that values quick, beautiful data visualization.",
    },
    {
      name: "Tara",
      role: "AI Researcher",
      quote:
        "Beautiful UI, powerful AI-driven insights. My go-to dashboard every day!",
    },
    {
      name: "Isha",
      role: "Engineer",
      quote:
        "Love how fast and elegant this tool feels. Visuals are absolutely stunning!",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: "0px",
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    afterChange: (current: number) => setCenterIndex(current),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, centerMode: false } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerMode: false } },
    ],
  };

  return (
    <section className="py-20 ">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-semibold text-gray-900 mb-12">
              What our <span className="primary">users</span> say
            </h3>

            <Slider {...settings}>
              {testimonials.map((t, idx) => {
                const isCenter = idx === centerIndex;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0.7, scale: 0.9 }}
                    animate={{
                      opacity: isCenter ? 1 : 0.7,
                      scale: isCenter ? 1.05 : 0.9,
                    }}
                    transition={{ duration: 0.6 }}
                    className=""
                  >
                    <div
                      className={` bg-white px-10 py-10  transition-all duration-500 
                        }`}
                    >
                      {/* Stars */}
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className="primary fill-[#AD49E1]"
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-gray-700 text-base leading-relaxed italic mb-6">
                        “{t.quote}”
                      </p>

                      {/* Name + Role */}
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-900">{t.name}</h4>
                        <p className="text-sm text-gray-500">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </Slider>
          </div>
        </section>
  );
}
