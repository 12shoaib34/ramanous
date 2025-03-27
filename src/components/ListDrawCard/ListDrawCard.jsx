import React from "react";
import IconLabel from "../IconLabel/IconLabel";
import Button from "../Button/Button";
import PencilIcon from "../../icons/PencilIcon";
import CalenderIcon from "../../icons/CalenderIcon";
import HtmlIcon from "../../icons/HtmlIcon";
import PeoplesIcon from "../../icons/PeoplesIcon";
import ChartIcon from "../../icons/ChartIcon";
import TrophyIcon from "../../icons/TrophyIcon";
import AntModal from "../AntModal/AntModal";
import { useNavigate } from "react-router-dom";

const ListDrawCard = ({
  data,
  iconLabelProps = {},
  colGap = "gap-x-8",
  rowGap = "gap-y-2",
  contentPadding = "p-5",
  className = "",
  maskBorder = true,
  editIconPosition = "center",
  rounded = "rounded-3xl",
}) => {
  const navigate = useNavigate();

  const [giveawayModal, setGiveawayModal] = React.useState(false);

  const toggleGiveawayModal = () => {
    setGiveawayModal(!giveawayModal);
  };

  const onNavigate = (path) => {
    navigate(`${path}/${data?.id}`);
  };

  return (
    <div className={`${rounded} ${maskBorder ? "border border-black-opacity-15" : ""} ${className}`}>
      <div className={`border-b border-black-opacity-15 ${contentPadding}`}>
        <div className="flex justify-between items-center border-l-[6px] border-[#43B57B] pl-2 pb-2">
          <div>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold mb-2">{data?.title}</h3>
              {editIconPosition === "topRight" && (
                <Button theme="light" size="fit" shape="circle">
                  <PencilIcon />
                </Button>
              )}
            </div>
            <div className={`flex items-center flex-wrap  ${colGap} ${rowGap}`}>
              <span className="flex items-center">
                <CalenderIcon className="mr-2 hidden xl:block" />
                <span className="text-success-hint mr-1 xl:mr-3">Starts:</span> 1 December, 2024
              </span>
              <span>
                <span className="text-danger-hint mr-1 xl:mr-3">Ends:</span> 31 December, 2024 (12 days to go)
              </span>
              <span>Created 13 November, 2024</span>
            </div>
          </div>
          {editIconPosition === "center" && (
            <Button theme="light" size="fit" shape="circle">
              <PencilIcon />
            </Button>
          )}
        </div>
      </div>
      <div
        className={`flex items-center [&>span]:flex [&>span]:items-center [&>span]:gap-2 ${contentPadding} ${colGap} ${rowGap}`.trim()}
      >
        <IconLabel
          {...iconLabelProps}
          onClick={toggleGiveawayModal}
          role="button"
          space={10}
          icon={<HtmlIcon />}
          label="Install"
        />
        <IconLabel
          {...iconLabelProps}
          onClick={() => onNavigate("/draw/entrants")}
          role="button"
          count={data?.entrantsCount}
          space={10}
          icon={<PeoplesIcon />}
          label="Entrants"
        />
        <IconLabel
          {...iconLabelProps}
          onClick={() => onNavigate("/draw/analytics-entries")}
          role="button"
          space={10}
          icon={<ChartIcon />}
          label="Analytics"
        />
        <IconLabel
          {...iconLabelProps}
          onClick={() => onNavigate("/draw/winners")}
          role="button"
          space={10}
          icon={<TrophyIcon />}
          label="Winners"
        />
      </div>

      <AntModal padding="p-0" width={480} open={giveawayModal} onClose={toggleGiveawayModal}>
        <div className="p-6 text-center border-b border-whisper-gray">
          <h3 className="font-medium text-xl">Win a R32 GTR Giveaway</h3>
        </div>
        <div className="text-center p-6">
          <p className="text-xs mb-10 text-dark-gray">
            Click to copy the code onto your clipboard and then paste it into the Draw page
          </p>
          <Button theme="primary">Copy to clipboard</Button>
        </div>
      </AntModal>
    </div>
  );
};

export default ListDrawCard;
