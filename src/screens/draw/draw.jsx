import React from "react";
import { fakeDraws } from "../../fakeData";
import { Header, ListDrawCard } from "../../components";
import { Outlet, useParams } from "react-router-dom";
import HomeIcon from "../../icons/HomeIcon";
import { Select } from "antd";

const Draw = () => {
  const params = useParams();
  const id = Number(params.id);

  const filterOptions = [
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
    <div className="h-full flex flex-col overflow-hidden">
      <Header title="Lucky Draw" />
      <div className="flex flex-grow overflow-hidden">
        <div className="max-w-[300px] xl:max-w-[500px] h-full overflow-hidden border-black-opacity-15">
          <div className="flex items-center gap-4 pt-5 px-2 xl:px-5 pr-2">
            <HomeIcon />
            <Select defaultValue={"CURRENT_DRAWS"} className="flex-1">
              {filterOptions.map((item) => (
                <Select.Option key={item?.key} value={item?.key}>
                  {item?.title}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="h-full flex flex-col gap-4 overflow-auto p-2 xl:p-5 pr-2 hide-scrollbar">
            {fakeDraws.map((draw) => (
              <ListDrawCard
                rounded="rounded-xl xl:rounded-3xl"
                contentPadding="p-2 xl:p-5"
                editIconPosition="topRight"
                className={`cursor-pointer bg-background-secondary hover:bg-[#0000FF1A] max-xl:text-xs ${
                  id === draw.id ? "shadow-active-secondary" : ""
                }`}
                colGap="gap-2 xl:gap-x-4"
                iconLabelProps={{ textSize: "max-xl:text-xs", iconClass: "hidden xl:block" }}
                key={draw.id}
                data={draw}
              />
            ))}
          </div>
        </div>
        <div className="overflow-auto flex-1 p-2 xl:py-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Draw;
