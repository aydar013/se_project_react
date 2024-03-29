import "../blocks/Footer.css";
import { currentYear } from "../utils/constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__copyright">Developed by Aidar Shaidullin</div>
      <div className="footer__year">{currentYear}</div>
    </footer>
  );
};

export default Footer;
