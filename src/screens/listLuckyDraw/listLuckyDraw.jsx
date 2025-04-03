import { Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../common/thunk";
import { Button, Header, ListDrawCard } from "../../components";
import { fakeDraws } from "../../fakeData";
import SearchIcon from "../../icons/SearchIcon";
import { getLuckyDraws } from "./thunk";

const ListLuckyDraw = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLuckyDraws());
    dispatch(getCountries());
  }, []);

  const [activeTab, setActiveTab] = React.useState("CURRENT_DRAWS");

  const luckyDraws = useSelector((state) => state?.luckyDraws);
  const countries = useSelector((state) => state?.common?.countries);

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
    <div>
      <Header title="List" />
      <div className="p-4">
        <div className="bg-background-secondary p-6">
          <div>
            <Input placeholder="Search draws" prefix={<SearchIcon />} />
          </div>
          <div className="flex items-center p-1.5 pr-6 rounded-2xl border border-whisper-gray shadow-soft-border mt-4">
            <div className="flex items-center">
              {tabs.map((tab, i) => (
                <React.Fragment key={tab.key}>
                  <button
                    className={`px-4 py-2 cursor-pointer font-medium ${activeTab === tab.key ? "text-royal-blue" : ""}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.title}
                  </button>
                  {i !== tabs.length - 1 && <span className="text-black">|</span>}
                </React.Fragment>
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
    </div>
  );
};

export default ListLuckyDraw;
