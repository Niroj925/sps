"use client";

import React, { useState, useEffect } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import { useRouter } from "next/navigation";

const links = [
  {
    title: "Homepage",
    path: "/",
  },
  {
    title: "CheckNow",
    path: "/check",
  },
];

const Links = () => {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(null); // Use state to store login status

  useEffect(() => {
    // Access localStorage only when the component is mounted (on the client)
    const loggedInStatus = localStorage.getItem("isLogged");
    setIsLogged(loggedInStatus === "true"); // Convert to boolean
  }, []); // Empty dependency array means it runs once after mount

  const handleLogout = () => {
    localStorage.clear();
    setIsLogged(false); // Update the state
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/doctor/login");
  };

  if (isLogged === null) {
    // Prevent rendering until we know if the user is logged in or not
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {isLogged ? (
          <>
            {/* Display only the logout button if logged in */}
            <button className={styles.logout} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            {links.map((link) => (
              <NavLink item={link} key={link.title} />
            ))}
            <button className={styles.logout} onClick={handleLogin}>
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Links;
