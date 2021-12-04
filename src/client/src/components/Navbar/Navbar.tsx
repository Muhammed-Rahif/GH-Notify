import React from "react";
import { SiGithub } from "react-icons/si";
import { MdDarkMode } from "react-icons/md";
import $ from "jquery";

function Navbar() {
  function toggleTheme(): void {
    const theme: string = $("html").attr("data-theme") as string;
    const prefersDarkMode: boolean =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (theme === "dark") $("html").attr("data-theme", "light");
    else if (theme === "light") $("html").attr("data-theme", "dark");
    else
      prefersDarkMode
        ? $("html").attr("data-theme", "light")
        : $("html").attr("data-theme", "dark");

    console.info($("html").attr("data-theme"));
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
            <MdDarkMode />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
