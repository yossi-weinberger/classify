"use client";
import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import Loading from "@/components/loading/loading";
import "./dashboard.css";

export default function Dashboard() {
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const scaleX = window.innerWidth / 1366;
      const scaleY = window.innerHeight / 768;
      const scale = Math.min(scaleX, scaleY);
      setScale(scale);
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const desktopUrl =
    "https://lookerstudio.google.com/embed/reporting/a6238fd0-fc93-49fe-b22b-024a2b00ba39/page/p_kf9sel82hd";
  const mobileUrl =
    "https://lookerstudio.google.com/embed/reporting/cd45d932-2880-45d3-a1e1-daf793cc4f37/page/p_kf9sel82hd";

  return (
    <div className="dashboard-page">
      <Container className="dashboard-container">
        {isLoading && <Loading />}
        <div
          className="dashboard-wrapper"
          style={{ transform: `scale(${scale})` }}
        >
          <iframe
            className="dashboard"
            src={isMobile ? mobileUrl : desktopUrl}
            frameBorder="0"
            allowFullScreen
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            onLoad={handleIframeLoad}
          ></iframe>
        </div>
      </Container>
    </div>
  );
}
