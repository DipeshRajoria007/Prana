import { Avatar } from "@mantine/core";
import React from "react";
import { FiUser } from "react-icons/fi";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Testimonials from "../components/Testimonials";
import { clients } from "../constants/index";
import styles from "../styles";
const Clients = () => {
  return (
    <div className="w-full overflow-hidden text-darkBg">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <h1 className="mb-4 text-center text-3xl font-bold text-gray-600">
        Our Clients
      </h1>

      <div className="grid grid-cols-3  gap-4 p-24 ">
        {clients.map((client) => {
          const initials = client.name
            .split(" ")
            .map((n) => n[0])
            .join("");
          return (
            <div
              key={client.id}
              className="
              drop-shadow-c
              flex 
              w-full
              transform 
              items-center 
              space-x-4 
              rounded-lg 
              bg-white 
              p-4 
                opacity-60
              grayscale 
              filter 
              transition-all 
              duration-200 
              ease-in-out 
              hover:scale-105 
              hover:opacity-100 
              hover:drop-shadow-2xl
              hover:grayscale-0
            "
            >
              <Avatar size="md" color="blue" radius="md">
                {initials}
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold text-blue-800">
                  {client.name}
                </h2>
                <p className="text-gray-500">{client.location}</p>
              </div>
            </div>
          );
        })}
      </div>
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Clients;
