import React, { useEffect, useState } from "react";
import ChartIcon from "../../icons/ChartIcon";
import { Button } from "../../components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import EyeIcon from "../../icons/EyeIcon";
import EarthIcon from "../../icons/EarthIcon";
import TvIcon from "../../icons/TvIcon";
import IphoneIcon from "../../icons/IphoneIcon";
import AndroidPhoneIcon from "./AndroidPhoneIcon";

const generateRandomData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: `Sep ${i + 1}`,
    views: Math.floor(Math.random() * 200000),
    entries: Math.floor(Math.random() * 150000),
  }));
};
const AnalyticsEntries = () => {
  const [data, setData] = useState(generateRandomData());
  const [stats, setStats] = useState({
    entrants: 7947,
    entries: 123005,
    pageViews: 50123,
    packagesSold: 1386,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRandomData());
      setStats({
        entrants: Math.floor(Math.random() * 10000),
        entries: Math.floor(Math.random() * 150000),
        pageViews: Math.floor(Math.random() * 60000),
        packagesSold: Math.floor(Math.random() * 5000),
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-black-opacity-15 bg-background-secondary py-5 rounded-3xl">
      <div className="flex gap-8 pt-0 p-5 border-b border-whisper-gray">
        <div className="w-max flex items-center gap-3">
          <ChartIcon /> <h3 className="font-medium">Analytics</h3>
        </div>
      </div>

      <div className="px-5">
        <div className="flex items-center my-5">
          <Button className="group" theme="outlined-primary" icon={<EyeIcon />}>
            Entries
          </Button>
          <Button theme="outlined-primary" icon={<EarthIcon />}>
            Location
          </Button>
          <Button theme="outlined-primary" icon={<TvIcon />}>
            Desktop
          </Button>
          <Button theme="outlined-primary" icon={<IphoneIcon />}>
            iPhone
          </Button>
          <Button theme="outlined-primary" icon={<AndroidPhoneIcon />}>
            Android
          </Button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="views" stroke="#ff4d4f" />
            <Line type="monotone" dataKey="entries" stroke="#52c41a" />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-around p-4">
          <ItemCount title="Total Entrants" stats={stats.entrants} color="#A0363A" />
          <ItemCount title="Total Entries" stats={stats.entries} color="#A4A236" />
          <ItemCount title="Total Page Views" stats={stats.pageViews} color="#311AF8" />
          <ItemCount title="Total Packages Sold" stats={stats.packagesSold} color="#00C9E4" />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsEntries;

const ItemCount = ({ title, stats, color }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center -ml-[20px] text-primary">
        <svg
          className="relative -left-2"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="9"
          viewBox="0 0 20 9"
          fill="none"
        >
          <circle cx="4.5" cy="4.5" r="4" fill={color} stroke={color} />
          <line x1="5" y1="4.5" x2="20" y2="4.5" stroke={color} />
        </svg>
        <span className="text-xl">{stats}</span>
      </div>{" "}
      <span>{title}</span>
    </div>
  );
};
