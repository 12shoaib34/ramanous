import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLuckyDraws } from "../listLuckyDraw/thunk";
import { Alert, Spin } from "antd";
import { Header, ListDrawCard } from "../../components";
import { Outlet, useParams } from "react-router-dom";
import HomeIcon from "../../icons/HomeIcon";
import { Select } from "antd";

const Draw = () => {
  const params = useParams();
  const id = Number(params.id);

  const dispatch = useDispatch();
  const luckyDraws = useSelector((state) => state.luckyDraws);

  useEffect(() => {
    dispatch(getLuckyDraws());
  }, [dispatch]);

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
            {luckyDraws?.loading && <Spin size="large" className="self-center mt-4" />}

            {!luckyDraws?.loading && luckyDraws?.luckyDraws?.length === 0 && (
              <Alert message="No lucky draws found." type="info" showIcon className="mt-4" />
            )}

            {!luckyDraws?.loading &&
              luckyDraws?.luckyDraws?.map((draw) => (
                <ListDrawCard
                  rounded="rounded-xl xl:rounded-3xl"
                  contentPadding="p-2 xl:p-5"
                  editIconPosition="topRight"
                  className={`cursor-pointer bg-background-secondary hover:bg-[#0000FF1A] max-xl:text-xs ${
                    id === draw.luckyDrawId ? "shadow-active-secondary" : "" // Compare with luckyDrawId
                  }`}
                  colGap="gap-2 xl:gap-x-4"
                  iconLabelProps={{ textSize: "max-xl:text-xs", iconClass: "hidden xl:block" }}
                  key={draw.luckyDrawId} // Use luckyDrawId as key
                  data={{
                    id: draw.luckyDrawId,
                    title: draw.luckyDrawName, // Use luckyDrawName
                    startDateTime: draw.startDateTime,
                    endDateTime: draw.endDateTime,
                    createdAt: draw.createdAt,
                    entrantsCount: draw.entrantsCount || 0,
                    status: draw.status,
                  }}
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
