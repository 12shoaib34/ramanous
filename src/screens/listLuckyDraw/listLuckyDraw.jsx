import { Input } from "antd";
import React from "react";
import SearchIcon from "../../icons/SearchIcon";
import { AntModal, Button, IconLabel, ListDrawCard } from "../../components";
import PencilIcon from "../../icons/PencilIcon";
import HtmlIcon from "../../icons/HtmlIcon";
import PeoplesIcon from "../../icons/PeoplesIcon";
import ChartIcon from "../../icons/ChartIcon";
import TrophyIcon from "../../icons/TrophyIcon";
import CalenderIcon from "../../icons/CalenderIcon";
import { fakeDraws } from "../../fakeData";

const ListLuckyDraw = () => {
  const [activeTab, setActiveTab] = React.useState("CURRENT_DRAWS");

  const tabs = [
    {
      key: "CURRENT_DRAWS",
      title: "Current draws",
    },
    {
      key: "FUTURE_DRAWS",
      title: "Future draws",
    },
    {
      key: "DRAFT_DRAWS",
      title: "Draft draws",
    },
    {
      key: "COMPLETED_DRAWS",
      title: "Completed draws",
    },
  ];

  return (
    <div className="p-4">
      <div className="bg-background-secondary p-6">
        <div>
          <Input placeholder="Search draws" prefix={<SearchIcon />} />
        </div>
        <div className="flex items-center p-1.5 pr-6 rounded-2xl border border-whisper-gray shadow-soft-border mt-4">
          <div className="flex items-center space-x-4">
            {tabs.map((tab, i) => (
              <div>
                <button
                  key={tab.key}
                  className={`px-4 py-2 cursor-pointer font-medium ${activeTab === tab.key ? "text-royal-blue" : ""}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.title}
                </button>{" "}
                {i !== tabs.length - 1 && <span className="text-black">|</span>}
              </div>
            ))}
          </div>
          <Button className="ml-auto">Create new draw</Button>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {fakeDraws.map((draw) => (
            <ListDrawCard key={draw.id} data={draw} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListLuckyDraw;
