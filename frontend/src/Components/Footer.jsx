import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { SiFacebook, SiTwitter, SiInstagram } from "react-icons/si";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = [
    {
      title: "Our Services",
      links: [
        { title: "Book an Appointment", link: "/appointment" },
        { title: "Find a Doctor", link: "/patients" },
        { title: "Departments", link: "/departments" },
        { title: "Contact Us", link: "/contact" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { title: "Home", link: "/" },
        { title: "About Us", link: "/about" },
        { title: "Blog", link: "/blog" },
        { title: "Careers", link: "/careers" },
      ],
    },
  ];

  return (
    <div className="bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <hr className="mb-8 mt-4 border-t-2 border-gray-600" />
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-6 flex flex-wrap md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex text-[4rem] font-bold text-gray-400 ">
              <img
                src="/logo.png"
                alt="Health Management System"
                className="w-32"
              />
              PRANA
            </Link>
            <p className="mt-4 text-gray-400">
              A health management system is a computerized system used to manage
              and process healthcare data to improve the efficiency and
              effectiveness of healthcare delivery.
            </p>
            <div className="mt-4 flex">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiFacebook size="1.5em" className="mr-2 text-gray-400" />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiTwitter size="1.5em" className="mr-2 text-gray-400" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiInstagram size="1.5em" className="mr-2 text-gray-400" />
              </a>
            </div>
          </div>
          {footerLinks.map((section, index) => (
            <div key={index} className="col-span-6 md:col-span-3 lg:col-span-2">
              <h3 className="mb-4 font-bold text-gray-400">{section.title}</h3>
              <ul className="text-sm">
                {section.links.map((link, index) => (
                  <li key={index} className="mb-2">
                    <Link
                      to={link.link}
                      className="text-gray-400 transition-colors duration-300 hover:text-white"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-12 mt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaPhoneAlt size={"1.5em"} className="mr-2 text-gray-400" />
                <p className="text-sm text-gray-400">+1 123-456 -7890</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope size={"1.5em"} className="mr-2 text-gray-400" />
                <p className="text-sm text-gray-400">
                  info@healthmanagementsystem.com
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-gray-400">
                  © 2023 PRANA : Health Management System. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
