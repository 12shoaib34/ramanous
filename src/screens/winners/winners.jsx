import React from "react";
import TrophyIcon from "../../icons/TrophyIcon";
import { Button } from "../../components";
import EyeIcon from "../../icons/EyeIcon";
import { Switch } from "antd";

const Winners = () => {
  return (
    <div className="border border-black-opacity-15 py-5 rounded-xl bg-background-secondary">
      <div className="flex gap-8 pt-0 p-5 border-b border-whisper-gray">
        <div className="w-max flex items-center gap-3">
          <TrophyIcon /> <h3 className="font-medium">Winners</h3>
        </div>
      </div>
      <div className="my-5 px-5">
        <div className="grid grid-cols-2 items-center 2xl:grid-cols-3 mb-2">
          <div>
            <Button className="block 2xl:hidden" icon={<EyeIcon />}>
              START LIVE DRAW
            </Button>
          </div>
          <div className="text-center max-2xl:col-start-2">
            <h3>Win a R32 GTR Giveaway</h3>
          </div>
          <div className="hidden 2xl:block">
            <Button className="block ml-auto" icon={<EyeIcon />}>
              START LIVE DRAW
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 2xl:grid-cols-3 bg-[#D9D9D9] p-4 rounded-xl">
          <div>
            <h1 className="text-2xl mb-6">Draw 4 Winners</h1>
            <p className="mb-2">Allow same user to win more than once</p>
            <div className="flex gap-2">
              <span>Yes</span>
              <Switch />
              <span>No</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="cursor-pointer py-2 border border-royal-blue text-royal-blue text-center">
              Draw Winner 1
            </button>
            <button className="cursor-pointer py-2 border border-[#616161] text-center">Draw Winner 2</button>
            <button className="cursor-pointer py-2 border border-[#616161] text-center">Draw Winner 3</button>
            <button className="cursor-pointer py-2 border border-[#616161] text-center">Draw Winner 4</button>
          </div>
        </div>
      </div>
      <div className="mt-5 px-5 pb-[50%] relative">
        <div className="absolute top-0 left-0 w-full h-full p-5 pb-0">
          <div className="rounded-xl overflow-hidden w-full h-full">
            <iframe src="http://google.com/maps" frameborder="0" className="w-full h-full"></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Winners;
