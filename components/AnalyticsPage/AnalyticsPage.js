import React from "react";
import { Dropdown } from "@creativehub/marketrix-ui";
import Line from "../Charts/Line";
import MainSourcesCard from "../Cards/ProgressCard/MainSourcesCard";
import DevicesCard from "../Cards/ProgressCard/DevicesCard";
import TopPageCard from "../Cards/ProgressCard/TopPageCard";
import DemographicDetailCard from "../Cards/ProgressCard/DemographicDetailCard";

function AnalyticsPage({ currentVisitors }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="font-medium text-[16px]">
          {currentVisitors} Current Visitors
        </div>
        <div>
          <Dropdown
            outline="none"
            border="1px solid #D0D5DD"
            borderRadius="8px"
            color="black"
            height="40px"
            labelKey="name"
            onSelect={() => {}}
            optionStyles={{
              borderRadius: "10px",
              color: "black",
              width: "30px",
            }}
            options={[
              {
                id: 1,
                label1: "Option 1",
                name: " Last 30 Days",
                opt: "op1",
              },
              {
                id: 2,
                label1: "Option 2",
                name: "Realtime Data",
                opt: "op2",
              },
              {
                id: 3,
                label1: "Option 3",
                name: "Today",
                opt: "op3",
              },
              {
                id: 4,
                label1: "Option 4",
                name: "Last 7 Days",
                opt: "op4",
              },
              {
                id: 5,
                label1: "Option 5",
                name: "Month to Date",
                opt: "op5",
              },
              {
                id: 6,
                label1: "Option 6",
                name: "Last month",
                opt: "op6",
              },
              {
                id: 7,
                label1: "Option 7",
                name: "Year to Date",
                opt: "op7",
              },
              {
                id: 8,
                label1: "Option 8",
                name: "Last 12 months",
                opt: "op8",
              },
              {
                id: 9,
                label1: "Option 9",
                name: "All time",
                opt: "op9",
              },
              {
                id: 10,
                label1: "Option 10",
                name: "Custom",
                opt: "op10",
              },
            ]}
            placeholder="select an option"
            selectedValue="Admin"
            valueKey="id"
            width="100%"
          />
        </div>
      </div>
      <div>
        <Line />
      </div>

      <div className="w-full flex items-start gap-4">
        <div className="w-[60%] animate-fade-up" >
          <MainSourcesCard />
        </div>
        <div className="w-[40%] ">
          <DevicesCard />
        </div>
      </div>
      <div>
        <TopPageCard />
      </div>
      <div data-aos="animate-jump-in animate-delay-300 animate-once" >
        <DemographicDetailCard />
      </div>
    </div>
  );
}

export default AnalyticsPage;
