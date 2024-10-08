import Image from "next/image";
import "./footer.css";

const FacebookIcon = () => (
  <Image
    src="/icons/facebook.svg"
    alt="Facebook"
    width={24}
    height={24}
    className="icon social-icon"
  />
);

const YoutubeIcon = () => (
  <Image
    src="/icons/youtube.svg"
    alt="YouTube"
    width={24}
    height={24}
    className="icon social-icon"
  />
);

const LinkedinIcon = () => (
  <Image
    src="/icons/linkedin.svg"
    alt="LinkedIn"
    width={24}
    height={24}
    className="icon social-icon"
  />
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <ul className="footer-menu">
          <li>© classify 2024</li>
          <li>
            <a className="accessibility" href="/accessibility">
              הצהרת נגישות
            </a>
          </li>
        </ul>
        <div className="social-icons">
          <a href="" title="Facebook" className="social-icon facebook">
            <FacebookIcon />
          </a>
          <a href="" title="YouTube" className="social-icon youtube">
            <YoutubeIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/yossi-weinberger-364ab615a/"
            title="LinkedIn"
            className="social-icon linkedin"
          >
            <LinkedinIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
