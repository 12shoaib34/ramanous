import { Alert, Input, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../common/thunk";
import { Button, Header, ListDrawCard } from "../../components";
import SearchIcon from "../../icons/SearchIcon";
import { getLuckyDraws } from "./thunk";
import { useNavigate } from "react-router-dom";

const ListLuckyDraw = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLuckyDraws());
    dispatch(getCountries());
  }, []);

  const [activeTab, setActiveTab] = React.useState("CURRENT_DRAWS");

  const luckyDraws = useSelector((state) => state.luckyDraws); // Destructure state
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

  const onNavigateToCreate = () => {
    navigate("/create-lucky-draw");
  };

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
            <Button onClick={onNavigateToCreate} className="ml-auto">
              Create new draw
            </Button>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            {luckyDraws?.loading && <Spin size="large" className="self-center" />}

            {!luckyDraws?.loading && luckyDraws?.luckyDraws.length === 0 && (
              <Alert message="No lucky draws found." type="info" showIcon />
            )}
            {!luckyDraws?.loading &&
              luckyDraws?.luckyDraws?.map((draw) => (
                <ListDrawCard
                  key={draw.luckyDrawId}
                  data={{
                    id: draw.luckyDrawId, // Pass luckyDrawId as id
                    title: draw.luckyDrawName, // Use luckyDrawName for title
                    startDateTime: draw.startDateTime,
                    endDateTime: draw.endDateTime,
                    createdAt: draw.createdAt,
                    // Add other relevant fields if ListDrawCard uses them, e.g., entrantsCount (defaulting if not present)
                    entrantsCount: draw.entrantsCount || 0, // Example default
                    status: draw.status, // Pass status if needed by ListDrawCard
                    // Map other fields from 'draw' to 'data' as required by ListDrawCard
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListLuckyDraw;
