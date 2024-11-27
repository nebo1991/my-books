import githubLogo from "../assets/github-logo.svg";

import youtubeLogo from "../assets/youtube-logo.svg";
import { Facebook, Github, Instagram, Youtube } from "lucide-react";

const FooterBar = () => {
  return (
    <>
      <div className="flex justify-between py-2">
        <div className="flex gap-3">
          <a href="https://www.github.com/" target="_blank">
            <Github size={40} color="#000000" strokeWidth={0.5} />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <Instagram size={40} color="#7029db" strokeWidth={0.5} />
          </a>
          <a href="https://www.facebook.com/" target="_blank">
            <Facebook size={40} color="#3c66b9" strokeWidth={0.5} />
          </a>
          <a href="https://www.youtube.com/" target="_blank">
            <Youtube size={40} color="#c32828" strokeWidth={0.5} />
          </a>
        </div>
        <div className="flex gap-4">
          <div>
            <a
              href="https://json-server-production-ef6b.up.railway.app/books"
              target="_blank"
            >
              {" "}
              <p className="text-black">Our API</p>
            </a>
          </div>
          <div>
            <a
              href="https://github.com/nebo1991/all-about-the-books?tab=readme-ov-file#all-about-the-books"
              target="_blank"
            >
              <p className="text-black">Documentation</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterBar;
