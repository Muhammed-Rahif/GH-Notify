import React, { useState, MouseEvent } from "react";
import { SiGithub } from "react-icons/si";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import $ from "jquery";

function Navbar() {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  function toggleTheme(event: MouseEvent<HTMLAnchorElement>): void {
    event.preventDefault();

    const theme: string = $("html").attr("data-theme") as string;
    const prefersDarkMode: boolean =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (theme === "dark") {
      $("html").attr("data-theme", "light");
      setDarkMode(false);
    } else if (theme === "light") {
      $("html").attr("data-theme", "dark");
      setDarkMode(true);
    } else {
      if (prefersDarkMode) {
        $("html").attr("data-theme", "light");
        setDarkMode(false);
      } else {
        $("html").attr("data-theme", "dark");
        setDarkMode(true);
      }
    }
  }

  return (
    <nav>
      <ul>
        <li>
          <strong>GitHub Notify</strong>
        </li>
      </ul>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://github.com/Muhammed-Rahif/GH-Notify"
            rel="noreferrer"
          >
            <SiGithub />
          </a>
        </li>
        <li>
          <a href="#dark-mode" onClick={toggleTheme}>
            {darkMode ? <MdLightMode /> : <MdDarkMode />}
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
