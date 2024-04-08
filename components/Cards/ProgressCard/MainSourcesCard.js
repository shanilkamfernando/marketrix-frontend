import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { Button } from "@creativehub/marketrix-ui";

function MainSourcesCard() {
  const sources = [
    {
      visitorPercentage: "90",
      sourceName: "Direct / None",
      visitors: "426k",
      duration: "3m 54s",
      sourceImage: "/images/analytics/directIcon.svg",
    },
    {
      visitorPercentage: "75",
      sourceName: "Facebook",
      visitors: "426k",
      duration: "3m 54s",
      sourceImage: "/images/analytics/fbIcon.svg",
    },
    {
      visitorPercentage: "60",
      sourceName: "Google",
      visitors: "426k",
      duration: "3m 54s",
      sourceImage: "/images/analytics/googleIcon.svg",
    },
    {
      visitorPercentage: "51",
      sourceName: "Reddit",
      visitors: "426k",
      duration: "3m 54s",
      sourceImage: "/images/analytics/redditIcon.svg",
    },
  ];
  return (
    <div className="p-5 rounded-lg border-[1px] border-[#E4E7EC] h-[400px] relative overflow-auto">
      <div className="text-[16px] font-medium pb-4 border-b-[1px] flex items-center justify-between">
        <div>Main Sources</div>
        {/* <div>shanilka</div> */}
      </div>

      <div className="py-3 gap-2 ">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm  text-gray-500 ">
            <thead className="text-[14px] text-[#667085] uppercase font-medium">
              <tr>
                <th scope="col" className="pr-6 py-3 text-left w-[35%]">
                  Source Name
                </th>
                <th scope="col" className="px-3 py-3 text-right ">
                  Num of visitors
                </th>
                <th scope="col" className="px-3 py-3 text-right">
                  BOUNCE RATE
                </th>
                <th scope="col" className="pl-3 py-3 text-right">
                  DURATION
                </th>
              </tr>
            </thead>
            {sources.map((source, index) => {
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
                        {source.visitors}
                      </td>
                      <td className="px-3  py-3  text-right">
                        {source.visitorPercentage}%
                      </td>
                      <td className="pl-3  py-3 text-right">
                        {source.duration}
                      </td>
                    </>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>

        {/* <table className="table-auto w-full">
          <thead>
            <tr className="uppercase text-[#667085] font-medium text-[14px]  ">
              <th className="w-[25%] text-left">Song</th>
              <th className="w-[25%] text-left">Artist</th>
              <th className="w-[25%]">Year</th>
              <th className="w-[25%]">Year</th>
            </tr>
          </thead>
          <tbody>
            <tr className="pb-3">
              <td>The Sliding </td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table> */}
        {/* <div>
          <div className="uppercase text-[#667085] font-medium text-[14px]">
            Source Name
          </div>
          <div className="">
            <div className="">
            <ProgressBar
              completed={80}
              bgColor="#cdcdcd"
              height="35px"
              borderRadius=""
              baseBgColor="#ffffff"
              labelColor="#ffffff"
              customLabel={"jkhihgioguigtuiui"}
              className="pl-10"
            />
             <img src="/images/analytics/directIcon.svg" alt="Descriptive Alt Text" className="absolute top-2 left-2 w-[20px] h-[20px]" />
      
            </div>
        
          </div>
        </div> */}
        {/* <div>
          <div className="uppercase text-[#667085] font-medium text-[14px] text-right ">
            Num of visitors
          </div>
        </div>
        <div>
          <div className="uppercase text-[#667085] font-medium text-[14px] text-right ">
            BOUNCE RATE
          </div>
        </div>
        <div>
          <div className="uppercase text-[#667085] font-medium text-[14px] text-right ">
            DURATION
          </div>
        </div> */}
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

export default MainSourcesCard;
