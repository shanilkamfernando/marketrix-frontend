// import { Badge, Button, Progress } from "@creativehub/marketrix-ui";
// import Link from "next/link";
// import React from "react";

// function ProgressSection() {
//   return (
//     <div>
//       <div className="flex items-start text flex-col w-full h-50% p-2 bg-[#E4E7EC] border border-purple-100 rounded-lg shadow dark:bg-[#F2F4F7] dark:border-[#F2F4F7]">
//         <div>
//           <div className="flex gap-2 items-start text-[#344054] mtx-label !font-normal mb-4">
//             <div>You are currently on</div>

//             <div className=" ml-auto">
//               <Badge
//                 backgroundColor="#FFF6ED"
//                 borderRadius={15}
//                 color="#C4320A"
//                 hoverColor="#00FF00"
//                 text={capitalizeWords(packageName) + " Plan"}
//                 width={65}
//                 height={20}
//                 fontSize="10px"
//                 type={"status"}
//               />
//             </div>
//           </div>
          
//           <div className="flex items-center justify-between text-[#344054] mtx-label !font-normal mb-2">
//             Participant Minutes
//             <div className="text-[#344054] mtx-label !font-normal pl-4">
//               0/200
//             </div>
//           </div>

//           <Progress value={0} maxValue={0} />

//           <div className="!font-semibold w-full mt-2">
//             <Link href="/Dashboard/SettingsPage/Billing" target="_self">
//               <Button
//                 alignItems="start"
//                 background="#FCFCFD"
//                 color="#000000"
//                 border="1px solid"
//                 direction="row"
//                 display="flex"
//                 flexDirection="row"
//                 fontSize="0.875rem"
//                 gap="13px"
//                 hoverColor="#F9F5FF"
//                 icon="rocket"
//                 iconMargin={12}
//                 iconPosition="leading"
//                 justifyContent="start"
//                 label="Upgrade to Pro"
//                 lineHeight="normal"
//                 paddingBottom={6}
//                 paddingTop={6}
//                 paddingLeft={5}
//                 paddingRight={5}
//                 width="100%"
//               />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProgressSection;
