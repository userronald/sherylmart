import { FaGithub, FaLinkedin } from "react-icons/fa"; 

export const Footer = () => {
  return (
    <footer className="bg-gray-500 text-white p-4">
      <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm sm:text-base">
          © {new Date().getFullYear()} SherylMart | Developed by Sahaya Ronaldo.
        </p>

        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a
            href="https://github.com/userronald"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white hover:text-gray-400"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/sahaya-ronaldo-024b2a239/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white hover:text-gray-400"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
