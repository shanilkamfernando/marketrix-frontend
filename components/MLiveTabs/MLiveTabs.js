import React, { useState } from "react";
// import { SubHeadingProps } from "@/interfaces/SubHeadingTabs";

// interface MLiveTabProps extends SubHeadingProps {

//   activeTab: string;
//   handleTabChange: (tab: string) => void;
//   incomingAmount:number;
//    misseddAmount:number;
// }

function MLiveTabs({
  Tab1,
  Tab2,
  Tab3,
  activeTab,
  handleTabChange,
  incomingAmount,
  misseddAmount,
}) {
  return (
    <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      <ul className="flex flex-wrap -mb-px">
        <li className="mr-1">
          <a
            href={`# ${Tab1}`}
            className={`inline-block p-2 ${
              activeTab === Tab1
                ? "text-gray-700 border-b-2 border-gray-700 rounded-tl-lg active dark:text-gray-500 dark:border-gray-500 bg-[#F9FAFB] "
                : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 dark:hover:text-gray-700 "
            }`}
            onClick={() => handleTabChange(Tab1)}
            aria-current={activeTab === Tab1 ? "page" : undefined}
          >
            {Tab1}
            <span className="inline-flex items-center justify-center w-5 h-5 ml-2 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full">
              {incomingAmount}
            </span>
          </a>
        </li>
        <li className="mr-1">
          <a
            href={`# ${Tab2}`}
            className={`inline-block p-2 ${
              activeTab === Tab2
                ? "text-gray-700 border-b-2 border-gray-700  active dark:text-gray-500 dark:border-gray-500 bg-[#F9FAFB]"
                : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 dark:hover:text-gray-700"
            }`}
            onClick={() => handleTabChange(Tab2)}
            aria-current={activeTab === Tab2 ? "page" : undefined}
          >
            {Tab2}
            <span className="inline-flex items-center justify-center w-5 h-5 ml-2 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full">
              {misseddAmount}
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default MLiveTabs;
