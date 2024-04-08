import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import MLiveIncomingNavBar from "@/components/SideNavBar/MLiveIncomingNavBar/MLiveIncomingNavBar";
//import { Inquiry } from "@/interfaces/inquiry";
import TwoButtonIconWithTitle from "@/components/Buttons/TwoButtonIconWithTitle/TwoButtonIconWithTitle";
import { useEffect, useState } from "react";
import {
  getTimeAgo,
  getFormattedTimeHM,
  removeObjectFromArray,
  getUserName,
  getUserImage,
  getCountryLogo,
  getBrowserLogo,
} from "../../../helpers/helpers";
import { Button, Card } from "@creativehub/marketrix-ui";
import MissingCard from "@/components/Cards/MissingCard/MissingCard";
import {
  deleteInquiryCall,
  getMissedInquiriesCall,
  updateInquiry,
} from "@/components/Cards/IncomingCard/apiCalls";
import UsersApi from "@/pages/api/admin/users";
import NoDataCardTable from "@/components/Cards/NoDataCard/NoDataCardTable";
import LiveInquiriesRightNav from "@/components/RightNavBar/LiveInquiriesRightNav";
import DeleteInquiry from "@/components/Popouts/DeleteInquiry";
import { useDispatch } from "react-redux";
import { loadingTriggered,  } from "@/store/actionSlice";
function LiveMissed() {
  const [inquiry, setInquiry] = useState({});
  const [selectedIcon, setSelectedIcon] = useState("incoming");
  const [selectedButton, setSelectedButton] = useState(
    "Missing"
  );
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [users, setUsers] = useState([]);
  const [gridView, setGridView] = useState(false);
  const [isDeleteInquiryOpen, setIsDeleteInquiryOpen] = useState(false);
  const handleGridViewChange = (value) => {
    if (value === true) {
      setGridView(true);
    } else {
      setGridView(false);
    }
  };

  const handleViewInquiry = async (data) => {
    console.log("inquiry", data);
    data.checked = true;
    setInquiry(data);
    
    await updateInquiry(data, data?.inquiry_id);
  
  };

  const scheduleSession = () => {
    alert(`SCHEDULE MEET SESSION`);
  };

  const getMissedInquiries = async () => {
    dispatch(loadingTriggered(true));
    let inquiries = await getMissedInquiriesCall();
    dispatch(loadingTriggered(false));
    setTableData(inquiries);

  };
  const deleteInquiry = async () => {
    console.log("Inquiry", inquiry);
    dispatch(loadingTriggered(true));
    let delResp = await deleteInquiryCall(inquiry?.id); // delete inquiry from database
    if (delResp) {
      let updatedTable = await removeObjectFromArray(tableData, inquiry); 
      dispatch(loadingTriggered(false));// remove the inquiry from the table data
      setTableData(updatedTable);
      setInquiry({}); // reset inquiry object
      // getCounts();
      setIsDeleteInquiryOpen(false);
    }
  };

  const deleteConfirm = () => {
    setIsDeleteInquiryOpen(true);
  };

  const getAllUsers = async () => {
    dispatch(loadingTriggered(true));
    const response = await UsersApi.get_user();
    if (response?.data) {
      dispatch(loadingTriggered(false));
      setUsers(response?.data);
    } else {
      dispatch(loadingTriggered(false));
      return [];
    }
  };

  useEffect(() => {
    getMissedInquiries();
    getAllUsers();
  }, []);

  return (
    <div className="flex w-full h-screen">
      <div className="w-[5%]">
        <IconSideNavBar
          selectedIcon={"completed"}
          setSelectedIcon={setSelectedIcon}
        />
      </div>
      <div className="w-[15%]">
        <MLiveIncomingNavBar
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
      </div>
      <div className="w-[80%] overflow-auto scrollbar-hide ">
        <div>
          <div>
            <TwoButtonIconWithTitle
              headerTitle={"Missing Inquiries"}
              headerParagraph={
                "Missed live inquiries from website visitors"
              }
              gridViewChange={handleGridViewChange}
            />
          </div>
          {tableData.length > 0 ? (
            <>
              <div className="grid grid-cols-12 relative pb-5 h-[90vh]">
                <div
                  className={` 2xl:col-span-9 col-span-8 pl-[1rem] pr-[0.2rem] overflow-y-auto`}
                >
                  {/* <div className={`${gridView === true ? "2xl:col-span-12" : "2xl:col-span-9"} col-span-8 px-[1rem]`}> */}
                  <div className="w-[100%] ">
                    <div className="  ">
                      <div className=" scroll-smooth  grid gap-y-[0.5rem] ">
                        <MissingCard
                          users={users}
                          tableData={tableData}
                          getMissedInquiries={getMissedInquiries}
                          gridView={gridView}
                          handleViewInquiryCallParent={handleViewInquiry}
                          deleteInquiryCallParent={deleteConfirm}
                          inquiryButtonHandle={scheduleSession}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {isDeleteInquiryOpen && (
                  <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="p-5 ">
                      <DeleteInquiry
                        onClose={() => setIsDeleteInquiryOpen(false)}
                        deleteFunction={deleteInquiry}
                      />
                    </div>
                  </div>
                )}
                {/* {!gridView && ( */}
                <div className="2xl:col-span-3 col-span-4 px-[1rem] overflow-auto scrollbar-hide">
                  <div className="overflow-y-scroll-hidden">
                    {Object.keys(inquiry).length != 0 ? (
                      <LiveInquiriesRightNav
                        personsName={inquiry?.name}
                        message={inquiry?.message}
                        inquiryType={inquiry?.inquiry_type}
                        incomingTime={getTimeAgo(inquiry?.createdAt)}
                        startTime={inquiry?.start_time}
                        endTime={inquiry?.end_time}
                        timewithNumber={getFormattedTimeHM(inquiry?.createdAt)}
                        userEmail={inquiry?.email}
                        workEmail={inquiry?.email}
                        companyLogo="/images/profileImage.png"
                        companyName={inquiry?.company}
                        countryLogo={getCountryLogo(inquiry?.country)}
                        countryName={inquiry?.country}
                        phoneNo={inquiry?.phone_no}
                        browserLogo={getBrowserLogo(
                          inquiry?.visitor_info?.browser
                        )}
                        browserName={inquiry?.visitor_info?.browser}
                        deviceName={inquiry?.visitor_info?.platform}
                        requestedEmail={inquiry?.website_domain}
                        networkStrength={
                          inquiry?.visitor_info?.networkEffectiveType +
                          " - " +
                          inquiry?.visitor_info?.networkDownlink +
                          " Mbps"
                        }
                        screenResolution={
                          inquiry?.visitor_info?.screenResolution
                        }
                        inquiryButtonHandle={scheduleSession}
                        deleteInquiry={deleteInquiry}
                        userImage={getUserImage(inquiry?.user_id, users)}
                        agentName={getUserName(inquiry?.user_id, users)}
                        checked={inquiry?.checked} //for now i have implement the startsession function asin here they shows an error if i didnt implement the function as i have pass the prop as a fucntion
                        type={"missed"}
                      />
                    ) : (
                      <div>
                        {/* <Card
                          alignItems="flex-start"
                          background="#F9FAFB"
                          border="1px solid #E4E7EC"
                          borderRadius="8px"
                          display=""
                          flexDirection="column"
                          gap="24px"
                          height="85vh"
                          hoverColor=" #F2F4F7"
                          justifyContent=""
                          left=""
                          paddingBottom={15}
                          paddingLeft={15}
                          paddingRight={15}
                          paddingTop={15}
                          top=""
                          width="100%"
                        >
                          <div className=" h-full flex justify-center items-center text-[#101828]  !font-regular">
                            Tap an inquiry to unveil its details!
                          </div>
                        </Card> */}
                      </div>
                    )}
                  </div>
                </div>
                {/* )} */}
              </div>
            </>
          ) : (
            <>
              <NoDataCardTable cardHeight={"h-[80vh]"} message="No Missed Inquiries" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LiveMissed;