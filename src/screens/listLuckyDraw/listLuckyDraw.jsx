import { Input } from "antd";
import React from "react";
import SearchIcon from "../../icons/SearchIcon";
import { Button, IconLabel } from "../../components";
import PencilIcon from "../../icons/PencilIcon";
import HtmlIcon from "../../icons/HtmlIcon";
import PeoplesIcon from "../../icons/PeoplesIcon";
import ChartIcon from "../../icons/ChartIcon";
import TrophyIcon from "../../icons/TrophyIcon";
import CalenderIcon from "../../icons/CalenderIcon";

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
          <Input prefix={<SearchIcon />} />
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
          <ListDrawCard />
          <ListDrawCard />
        </div>
      </div>
    </div>
  );
};

export default ListLuckyDraw;

const ListDrawCard = ({ data }) => {
  return (
    <div className="border border-[#00000026] rounded-3xl">
      <div className="border-b border-[#00000026] p-5">
        <div className="flex justify-between items-center border-l-4 border-[#43B57B] pl-2 pb-2">
          <div>
            <h3 className="font-semibold mb-2">Super Giveaway 3000</h3>
            <div className="flex items-center gap-8 text-sm">
              <span className="flex items-center">
                <CalenderIcon className="mr-2" />
                <span className="text-success-hint mr-3">Starts:</span> 1 December, 2024
              </span>
              <span>
                <span className="text-danger-hint mr-3">Ends:</span> 31 December, 2024 (12 days to go)
              </span>
              <span>Created 13 November, 2024</span>
            </div>
          </div>
          <Button theme="light" size="fit" shape="circle">
            <PencilIcon />
          </Button>
        </div>
      </div>
      <div className="p-4 flex items-center gap-8 [&>span]:flex [&>span]:items-center [&>span]:gap-2">
        <IconLabel space={10} icon={<HtmlIcon />} label="Install" />
        <IconLabel count={0} space={10} icon={<PeoplesIcon />} label="Entrants" />
        <IconLabel space={10} icon={<ChartIcon />} label="Analytics" />
        <IconLabel space={10} icon={<TrophyIcon />} label="Winners" />
      </div>
    </div>
  );
};
