import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { Button } from "@creativehub/marketrix-ui";

function TopPageCard() {
  const pages = [
    {
      bounceRate: "90",
      pageurl: "/dashboard",
      visitors: "426k",
      pageViews: "5k",
      time: "3m 54s",
    },
    {
      bounceRate: "75",
      pageurl: "/share/dashboard",
      visitors: "426k",
      pageViews: "5k",
      time: "3m 54s",
    },
    {
      bounceRate: "60",
      pageurl: "/changelog",
      visitors: "426k",
      pageViews: "5k",
      time: "3m 54s",
    },
    {
      bounceRate: "51",
      pageurl: "Reddit",
      visitors: "426k",
      pageViews: "5k",
      time: "3m 54s",
    },
  ];
  return (
    <div className="p-5 rounded-lg border-[1px] border-[#E4E7EC]">
      <div className="text-[16px] font-medium pb-4 border-b-[1px]">
        <div>Top Pages</div>
      </div>
      <div className="py-3 gap-2 ">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm  text-gray-500 ">
            <thead className="text-[14px] text-[#667085] uppercase font-medium">
              <tr>
                <th scope="col" className="pr-6 py-3 text-left w-[35%]">
                  Page URL
                </th>
                <th scope="col" className="px-3 py-3 text-right ">
                  visitors
                </th>
                <th scope="col" className="px-3 py-3 text-right">
                  Page Views
                </th>
                <th scope="col" className="pl-3 py-3 text-right">
                  Bounce rate
                </th>
                <th scope="col" className="pl-3 py-3 text-right">
                  time
                </th>
              </tr>
            </thead>
            {pages.map((page, index) => {
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
                            completed={page.bounceRate}
                            bgColor="#D9D9D933"
                            height="35px"
                            borderRadius=""
                            baseBgColor="#ffffff"
                            labelColor="#ffffff"
                            isLabelVisible={false}
                          />

                          <div className="absolute top-2 left-2">
                            <div className="text-[#1D2939] font-normal">
                              {page.pageurl}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3  py-3 text-right">{page.visitors}</td>
                      <td className="px-3  py-3 text-right">
                        {page.pageViews}
                      </td>
                      <td className="px-3  py-3  text-right">
                        {page.bounceRate}%
                      </td>
                      <td className="pl-3  py-3 text-right">{page.time}</td>
                    </>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>

      <div className="text-[16px] font-medium pt-4 border-t-[1px] flex items-center justify-end">
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
  );
}

export default TopPageCard;
