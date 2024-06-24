"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./StudentDetails.module.css";

export default function ProgressChart({ progressData }) {
  return (
    <div className={styles.progressChart}>
      <h3>התקדמות לאורך זמן</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={progressData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="score" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
