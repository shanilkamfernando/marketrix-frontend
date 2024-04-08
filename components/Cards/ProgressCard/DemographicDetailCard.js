import React, { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import WorldMap from "react-svg-worldmap";
import { Button } from "@creativehub/marketrix-ui";

function DemographicDetailCard() {
  const data = [
    { country: "cn", value: 1389618778 }, // china
    { country: "in", value: 1311559204 }, // india
    { country: "us", value: 331883986 }, // united states
    { country: "id", value: 264935824 }, // indonesia
    { country: "pk", value: 210797836 }, // pakistan
    { country: "br", value: 210301591 }, // brazil
    { country: "ng", value: 208679114 }, // nigeria
    { country: "bd", value: 161062905 }, // bangladesh
    { country: "ru", value: 141944641 }, // russia
    { country: "mx", value: 127318112 }, // mexico
  ];

  const [currentTab, setCurrentTab] = useState("1");
  const sources = [
    {
      visitorPercentage: "90",
      sourceName: "Uniited States",
      sourceImage: "/images/analytics/US.svg",
    },
    {
      visitorPercentage: "75",
      sourceName: "France",
      sourceImage: "/images/analytics/france.svg",
    },
    {
      visitorPercentage: "60",
      sourceName: "Germany",
      sourceImage: "/images/analytics/germany.svg",
    },
    {
      visitorPercentage: "51",
      sourceName: "Reddit",
      sourceImage: "/images/analytics/redditIcon.svg",
    },
  ];
  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };

  const tabs = [
    {
      id: 1,
      tabTitle: "MAP",
      content: (
        <div className=" flex w-full justify-center ">
          <WorldMap
            color="#6938EF"
            // title="Top 10 Populous Countries"
            value-suffix="people"
            size="responsive"
            data={data}
            strokeOpacity={0.3}
            Style={{ backgroundColor: "red" }}
          />
        </div>
      ),
    },
    {
      id: 2,
      tabTitle: "COUNTRIES",
      content: (
        <div className="relative overflow-x-auto" >
          <table className="w-full text-sm  text-gray-500 ">
            <thead className="text-[14px] text-[#667085] uppercase font-medium">
              <tr>
                <th scope="col" className="pr-6 py-3 text-left w-[35%]">
                  Country
                </th>
                <th scope="col" className="px-3 py-3 text-right ">
                  Visitors
                </th>
              </tr>
            </thead>
            {sources.map((source, index) => {
              return (
                <tbody key={index}>
                  <tr className=" w-[100%]">
                    <>
                      <td
                        scope="row"
                        className="pr-3  font-medium text-gray-900  text-left "
                      >
                        <div className="relative ">
                          <ProgressBar
                            completed={source.visitorPercentage}
                            bgColor="#D9D9D933"
                            height="35px"
                            borderRadius=""
                            baseBgColor="#ffffff"
                            labelColor="#ffffff"
                            isLabelVisible={false}
                          />

                          <div className="absolute top-2 left-2">
                            <div className="flex gap-2 items-center">
                              <img
                                src={source.sourceImage}
                                width={18}
                                height={18}
                              />
                              <div className="text-[#1D2939] font-normal">
                                {source.sourceName}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3  py-3 text-right">
                        {source.visitorPercentage}K
                      </td>
                    </>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      ),
    },
    {
      id: 3,
      tabTitle: "REGIONS",
      content: (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm  text-gray-500 ">
            <thead className="text-[14px] text-[#667085] uppercase font-medium">
              <tr>
                <th scope="col" className="pr-6 py-3 text-left w-[35%]">
                  Country
                </th>
                <th scope="col" className="px-3 py-3 text-right ">
                  Visitors
                </th>
              </tr>
            </thead>
            {sources.map((source, index) => {
              return (
                <tbody key={index}>
                  <tr className=" w-[100%]">
                    <>
                      <td
                        scope="row"
                        className="pr-3  font-medium text-gray-900  text-left "
                      >
                        <div className="relative">
                          <ProgressBar
                            completed={source.visitorPercentage}
                            bgColor="#D9D9D933"
                            height="35px"
                            borderRadius=""
                            baseBgColor="#ffffff"
                            labelColor="#ffffff"
                            isLabelVisible={false}
                          />

                          <div className="absolute top-2 left-2">
                            <div className="flex gap-2 items-center">
                              <img
                                src={source.sourceImage}
                                width={18}
                                height={18}
                              />
                              <div className="text-[#1D2939] font-normal">
                                {source.sourceName}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3  py-3 text-right">
                        {source.visitorPercentage}K
                      </td>
                    </>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      ),
    },
  ];
  return (
    <div className="p-5 rounded-lg border-[1px] border-[#E4E7EC]">
      <div className="text-[16px] font-medium pb-4 border-b-[1px] flex items-center justify-between">
        <div>Demographic Details</div>
        <div className="flex gap-3 items-center">
          {tabs.map((tab, i) => (
            <button
              id={tab.id}
              // disabled={currentTab === `${tab.id}`}
              onClick={handleTabClick}
              key={i}
              className={`focus:outline-none  font-medium uppercase text-[14px]  ${
                currentTab === `${tab.id}`
                  ? "underline text-[#6938EF] underline-offset-2"
                  : "text-[#667085]"
              }`}
            >
              {tab.tabTitle}
            </button>
          ))}
        </div>
      </div>

      <div className="py-3 gap-2 ">
        <div>
          {tabs.map((tab, i) => (
            <div key={i}>
              {currentTab === `${tab.id}` && <div>{tab.content}</div>}
            </div>
          ))}
        </div>

        <div className="text-[16px] font-medium pt-4 flex items-center justify-end">
          <div>
            <Button
              alignItems="center"
              background="white"
              hoverColor="#D9D9D933"
              border="1px solid"
              borderColor="#D0D5DD"
              borderRadius="8px"
              color="#344054"
              direction="row"
              display="flex"
              flexDirection="row"
              focusColor="#F2F4F7"
              fontSize="14px"
              justifyContent="center"
              label="View All"
              size="sm"
              boxShadow="rgba(16, 24, 40, 0.05)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemographicDetailCard;
