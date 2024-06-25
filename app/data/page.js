"use client";
import React, { useState, useEffect } from "react";
import Loading from "@/components/loading/loading";
import "./page.css";

export default function DataPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="data-container">
      {isLoading && <Loading />}

      <iframe
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTwqKOSMsVEHnRJ6-lCLDH_U763BcpH83n4FWFeCsOW9olqYkl6qmAoqEQLSfmj0pa2AkLut0yCr4X8/pubhtml"
        width="100%"
        height="100%"
        title="data"
        style={{
          border: "none",
          display: isLoading ? "none" : "block",
        }}
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </div>
  );
}
