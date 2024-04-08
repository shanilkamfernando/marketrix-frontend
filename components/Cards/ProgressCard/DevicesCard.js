import React, { useState } from "react";
import { Tabs } from "flowbite-react";
import ProgressBar from "@ramonak/react-progress-bar";
function DevicesCard() {
  const [currentTab, setCurrentTab] = useState("1");

  const devices = [
    {
      visitorPercentage: "90",
      deviceName: "Direct / None",
      visitors: "426k",
      deviceImage: "/images/analytics/directIcon.svg",
    },
    {
      visitorPercentage: "75",
      deviceName: "Facebook",
      visitors: "426k",
      deviceImage: "/images/analytics/fbIcon.svg",
    },
    {
      visitorPercentage: "60",
      deviceName: "Google",
      visitors: "426k",
      deviceImage: "/images/analytics/googleIcon.svg",
    },
    {
      visitorPercentage: "51",
      deviceName: "Reddit",
      visitors: "426k",
      deviceImage: "/images/analytics/redditIcon.svg",
    },
    {
      visitorPercentage: "51",
      deviceName: "Reddit",
      visitors: "426k",
      deviceImage: "/images/analytics/redditIcon.svg",
    },
  ];

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };

  const tabs = [
    {
      id: 1,
      tabTitle: "Browser",
      content: (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm  text-gray-500 ">
            <thead className="text-[14px] text-[#667085] uppercase font-medium">
              <tr>
                <th scope="col" className="pr-6 py-3 text-left w-[50%] ">
                  browser name
                </th>
                <th scope="col" className="px-3 py-3 text-right ">
                  visitors
                </th>
                <th scope="col" className="px-3 py-3 text-right">
                  %
                </th>
              </tr>
            </thead>
            {devices.map((device, index) => {
              return (
                <tbody key={index}>
                  <tr className=" w-[100%]" >
                    <>
                      <td
                        scope="row"
                        className="pr-3  font-medium text-gray-900  text-left "
                      >
                        <div className="relative ">
                          <ProgressBar
                            completed={device.visitorPercentage}
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
                                src={device.deviceImage}
                                width={18}
                                height={18}
                              />
                              <div className="text-[#1D2939] font-normal">
                                {device.deviceName}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3  py-3 text-right">
                        {device.visitors}
                      </td>
                      <td className="px-3  py-3  text-right">
                        {device.visitorPercentage}%
                      </td>
                      {/* <td className="pl-3  py-3 text-right">
                    {device.duration}
                  </td> */}
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
      id: 2,
      tabTitle: "Screen Size",
      content: (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm  text-gray-500 ">
            <thead className="text-[14px] text-[#667085] uppercase font-medium">
              <tr>
                <th scope="col" className="pr-6 py-3 text-left w-[50%]">
                  screen size
                </th>
                <th scope="col" className="px-3 py-3 text-right ">
                  visitors
                </th>
                <th scope="col" className="px-3 py-3 text-right">
                  %
                </th>
              </tr>
            </thead>
            {devices.map((device, index) => {
              return (
                <tbody key={index}>
                  <tr className=" w-[100%]" >
                    <>
                      <td
                        scope="row"
                        className="pr-3  font-medium text-gray-900  text-left "
                      >
                        <div className="relative z-50">
                          <ProgressBar
                            completed={device.visitorPercentage}
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
                                src={device.deviceImage}
                                width={18}
                                height={18}
                              />
                              <div className="text-[#1D2939] font-normal">
                                {device.deviceName}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3  py-3 text-right">
                        {device.visitors}
                      </td>
                      <td className="px-3  py-3  text-right">
                        {device.visitorPercentage}%
                      </td>
                      {/* <td className="pl-3  py-3 text-right">
                    {device.duration}
                  </td> */}
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
      tabTitle: "os",
      content: (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm  text-gray-500 ">
            <thead className="text-[14px] text-[#667085] uppercase font-medium">
              <tr>
                <th scope="col" className="pr-6 py-3 text-left w-[50%] ">
                  operating sysytem
                </th>
                <th scope="col" className="px-3 py-3 text-right ">
                  visitors
                </th>
                <th scope="col" className="px-3 py-3 text-right">
                  %
                </th>
              </tr>
            </thead>
            {devices.map((device, index) => {
              return (
                <tbody key={index}>
                  <tr className=" w-[100%]" >
                    <>
                      <td
                        scope="row"
                        className="pr-3  font-medium text-gray-900  text-left "
                      >
                        <div className="relative z-50">
                          <ProgressBar
                            completed={device.visitorPercentage}
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
                                src={device.deviceImage}
                                width={18}
                                height={18}
                              />
                              <div className="text-[#1D2939] font-normal">
                                {device.deviceName}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3  py-3 text-right">
                        {device.visitors}
                      </td>
                      <td className="px-3  py-3  text-right">
                        {device.visitorPercentage}%
                      </td>
                      {/* <td className="pl-3  py-3 text-right">
                        {device.duration}
                      </td> */}
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
    <div className="p-5 rounded-lg border-[1px] border-[#E4E7EC] h-[400px] relative overflow-auto">
      <div className="text-[16px] font-medium pb-4 border-b-[1px] flex items-center justify-between">
        <div>Devices</div>
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
      </div>
    </div>
  );
}

export default DevicesCard;
