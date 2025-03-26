import React from "react";
import { fakeDraws } from "../../fakeData";
import { ListDrawCard } from "../../components";
import { Outlet, useParams } from "react-router-dom";

const Draw = () => {
  const params = useParams();
  const id = Number(params.id);

  return (
    <div className="flex h-full overflow-hidden">
      <div className="max-w-[500px] h-full overflow-hidden border-black-opacity-15">
        <div className="h-full flex flex-col gap-4 overflow-auto p-5 pr-2 hide-scrollbar">
          {fakeDraws.map((draw) => (
            <ListDrawCard
              editIconPosition="topRight"
              className={`cursor-pointer bg-background-secondary hover:bg-[#0000FF1A] ${
                id === draw.id ? "shadow-active-secondary" : ""
              }`}
              colGap="gap-x-4"
              // iconLabelProps={{ textSize: "text-[10px]" }}
              key={draw.id}
              data={draw}
            />
          ))}
        </div>
      </div>
      <div className="overflow-auto flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Draw;
