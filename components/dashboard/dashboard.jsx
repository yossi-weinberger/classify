"use client";
import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import Loading from "@/components/loading/loading"; // ודא שהנתיב נכון
import "./dashboard.css";

export default function Dashboard() {
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const scaleX = window.innerWidth / 1366;
      const scaleY = window.innerHeight / 768;
      const scale = Math.min(scaleX, scaleY);
      setScale(scale);
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
            src="https://lookerstudio.google.com/embed/reporting/9c2b76f3-eac9-46b6-a2e2-8017778ea6b4/page/p_kf9sel82hd"
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
