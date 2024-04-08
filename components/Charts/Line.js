import React, { useEffect, useState } from "react";
//import ReactApexChart from "react-apexcharts";
// Import ApexCharts dynamically
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

// const generateDayWiseTimeSeries = (startTime, count, range) => {
//   // Implement generateDayWiseTimeSeries function logic here
//   // I'm assuming you have this function implemented somewhere
// };

function Line() {
  // const data = generateDayWiseTimeSeries(
  //   new Date("22 Apr 2024").getTime(),
  //   115,
  //   {
  //     min: 30,
  //     max: 90,
  //   }
  // );
  const [series] = useState([
    {
      name: "Current Visitors",
      data: [
        [1327359600000, 230],
        [1327446000000, 200],
        [1327532400000, 218],
        [1327618800000, 200],
        [1327878000000, 201],
        [1327964400000, 150],
        [1328050800000, 500],
        [1328137200000, 315],
        [1328223600000, 600],
        [1328482800000, 800],
        [1328569200000, 420],
        [1328655600000, 300],
        [1328742000000, 750],
        [1328828400000, 840],
        [1329087600000, 1000],
        [1329174000000, 900],
        [1329260400000, 650],
        [1329346800000, 400],
        [1329433200000, 390],
        [1329778800000, 870],
        [1329865200000, 690],
        [1329951600000, 612],
        [1330038000000, 623],
        [1330297200000, 620],
        [1330383600000, 640],
        [1330470000000, 645],
        [1330556400000, 650],
        [1330642800000, 642],
        [1330902000000, 300],
        [1330988400000, 700],
        [1331074800000, 750],
        [1331161200000, 756],
        [1331247600000, 815],
        [1331506800000, 823],
        [1331593200000, 630],
        [1331679600000, 635],
        [1331766000000, 638],
        [1331852400000, 870],
        [1332111600000, 649],
        [1332198000000, 655],
        [1332284400000, 662],
        [1332370800000, 750],
        [1332457200000, 672],
        [1332712800000, 660],
        [1332799200000, 655],
        [1332885600000, 675],
        [1332972000000, 679],
        [1333058400000, 682],
        [1333317600000, 695],
        [1333404000000, 687],
        [1333490400000, 689],
        [1333576800000, 695],
        [1333922400000, 690],
        [1334008800000, 699],
        [1334095200000, 780],
        [1334181600000, 785],
        [1334268000000, 790],
        [1334527200000, 770],
        [1334613600000, 777],
        [1334700000000, 780],
        [1340661600000, 600],
        [1342389600000, 800],
        [1342476000000, 815],
        [1342562400000, 819],
        [1342648800000, 601],
        [1342735200000, 512],
        [1342994400000, 580],
        [1343080800000, 590],
        [1343167200000, 740],
        [1343253600000, 750],
        [1343340000000, 630],
        [1343599200000, 652],
        [1343685600000, 680],
        [1346191200000, 690],
        [1346277600000, 780],
        [1346364000000, 600],
        [1346709600000, 523],
        [1346796000000, 550],
        [1346882400000, 500],
        [1346968800000, 580],
        [1347228000000, 597],
        [1347314400000, 450],
        [1347400800000, 477],
        [1347487200000, 460],
        [1347573600000, 490],
        [1347832800000, 560],
        [1347919200000, 630],
        [1348005600000, 666],
        [1348092000000, 688],
        [1348178400000, 698],
        [1348437600000, 750],
        [1348524000000, 555],
        [1348610400000, 540],
        [1353366000000, 522],
        [1353452400000, 600],
        [1353625200000, 658],
        [1353884400000, 687],
        [1353970800000, 660],
        [1354057200000, 750],
        [1354143600000, 765],
        [1354230000000, 788],
        [1354489200000, 798],
        [1354575600000, 720],
        [1357599600000, 560],
        [1357686000000, 300],
      ],
    },
  ]);
  const [options] = useState({
    chart: {
      height: 350,
      type: "area",
      stacked: false,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#7F56D9"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    markers: {
      size: 0,
    },
    // title: {
    //   text: "Stock Price Movement",
    //   align: "left",
    // },

    xaxis: {
      type: "datetime",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  });
  return (
    <div className="border-[1px] border-gray-200 rounded-lg p-5">
      <div id="chart">
        <div className="px-5 pb-5 grid grid-cols-5 gap-3  text-left">
          <div className=" px-2  ">
            <div className="uppercase text-[#667085] font-medium text-[14px]">
              Unique Visitors
            </div>
            <div className="flex items-center gap-2 pt-2">
              <div className="text-[#1D2939] font-bold text-[24px]">124K</div>
              <div className="bg-[#ECFDF3] rounded-2xl text-[#027A48] px-3 flex justify-center items-center gap-1">
                <span>
                  <FaArrowUp color="#12B76A" />
                </span>
                12%
              </div>
            </div>
          </div>

          <div className=" px-2 ">
            <div className="uppercase text-[#667085] font-medium text-[14px]">
              Total visits
            </div>
            <div className="flex items-center gap-2 pt-2">
              <div className="text-[#1D2939] font-bold text-[24px]">258K</div>
              <div className="bg-[#ECFDF3] rounded-2xl text-[#027A48] px-3 flex justify-center items-center gap-1">
                <span>
                  <FaArrowUp color="#12B76A" />
                </span>
                8%
              </div>
            </div>
          </div>

          <div className=" px-2 ">
            <div className="uppercase text-[#667085] font-medium text-[14px]">
              Bounce rate
            </div>
            <div className="flex items-center gap-2 pt-2">
              <div className="text-[#1D2939] font-bold text-[24px]">258K</div>
              <div className="bg-[#FEF3F2] rounded-2xl text-[#B42318] px-3 flex justify-center items-center gap-1">
                <span>
                  <FaArrowDown color="#F04438" />
                </span>
                5%
              </div>
            </div>
          </div>

          <div className="px-2 ">
            <div className="uppercase text-[#667085] font-medium text-[14px]">
              Views per visit
            </div>
            <div className="flex items-center gap-2 pt-2">
              <div className="text-[#1D2939] font-bold text-[24px]">124K</div>
              <div className="bg-[#F2F4F7] rounded-2xl text-[#344054] px-3 flex justify-center items-center gap-1">
                {/* <span>
                  <FaArrowUp color="#12B76A" />
                </span> */}
                0%
              </div>
            </div>
          </div>

          <div className=" px-2 ">
            <div className="uppercase text-[#667085] font-medium text-[14px]">
              Total pageviews
            </div>
            <div className="flex items-center gap-2 pt-2">
              <div className="text-[#1D2939] font-bold text-[24px]">124K</div>
              <div className="bg-[#F2F4F7] rounded-2xl text-[#344054] px-3 flex justify-center items-center gap-1">
                {/* <span>
                  <FaArrowUp color="#12B76A" />
                </span> */}
                0%
              </div>
            </div>
          </div>
        </div>
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
}

export default Line;
