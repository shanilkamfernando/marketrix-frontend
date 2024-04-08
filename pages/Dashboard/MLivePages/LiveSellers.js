import React, { useEffect, useState, useRef, use, useContext } from "react";
import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import { AuthContext } from "@/auth/authContext";
import PageHeader from "@/components/Headers/PageHeader/PageHeader";
import { MultiSelect } from "react-multi-select-component";
import {
  Avatar,
  Button,
  Checkbox,
  CustomDatePicker,
  Dropdown,
  TextArea,
  TimeInput,
  Input,
  InputPlain,
  Badge,
} from "@creativehub/marketrix-ui";
import Doughnut from "@/components/Charts/doughnut";
import TimezoneSelect from "react-timezone-select";
import NotAvailble from "@/components/NotAvailableOverlay/NotAvailable";
import AgentApi from "@/pages/api/admin/agent";
import Link from "next/link";
import Image from "next/image";
import VideoModalAgent from "@/components/Modals/LiveSettingsModals/VideoModalAgent";
import NoDataCardTable from "@/components/Cards/NoDataCard/NoDataCardTable";
import { useDispatch } from "react-redux";
import { loadingTriggered } from "@/store/actionSlice";
import { loadState } from "@/store/localStorage";
import { getCountryLogo } from "@/helpers/helpers";

function LiveSellers() {
  // card Json data  for sellers

  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const cardData = [
    {
      video: "../../images/live/video1.png",
      name: "Jane Cooper",
      amount: "750",
      para:
        "Over the course of 2 years in Product Sales, I&apos;ve generated approximately $5 million in revenue.",
      rating: "4.1 (200)",
      sessions: "234",
    },
    {
      video: "../../images/live/video2.png",
      name: "Leslie Alexander",
      amount: "850",
      para:
        "In my two-year tenure as a Product Sales Specialist, I&apos;ve achieved nearly $5 million in sales conversions.",
      rating: "4.3 (45)",
      sessions: "122",
    },
    {
      video: "../../images/live/video3.png",
      name: "Wade Warren",
      amount: "900",
      para:
        "In my two-year tenure as a Product Sales Specialist, I&apos;ve achieved nearly $5 million in sales conversions.",
      rating: "4.4 (300)",
      sessions: "453",
    },
    {
      video: "../../images/live/video4.png",
      name: "Guy Hawkins",
      amount: "850",
      para:
        "As a Product Sales Professional for over two years, I've been responsible for close to $5 million in sales.",
      rating: "4.2 (100)",
      sessions: "125",
    },
    {
      video: "../../images/live/video5.png",
      name: "Jenny Wilson",
      amount: "780",
      para:
        "With my 2-year background in Product Sales, I've contributed to nearly $5 million in revenue conversions.",
      rating: "4.8 (452)",
      sessions: "543",
    },
    {
      video: "../../images/live/video6.png",
      name: "Esther Howard",
      amount: "1000",
      para:
        "In just over two years as a Product Sales Expert, I've seen conversions amounting to around $5 million.",
      rating: "4.5 (450)",
      sessions: "485",
    },
    {
      video: "../../images/live/video7.png",
      name: "Robert Fox",
      amount: "852",
      para:
        "With my 3-year background in Product Sales, I've contributed to nearly $5 million in revenue conversions.",
      rating: "4.2 (253)",
      sessions: "311",
    },
    {
      video: "../../images/live/video8.png",
      name: "Savannah Nguyen",
      amount: "750",
      para:
        "In my two-year tenure as a Product Sales Specialist, I&apos;ve achieved nearly $5 million in sales conversions.",
      rating: "4.3 (45)",
      sessions: "122",
    },
  ];

  const [gridView, setGridView] = useState(true);

  const [agents, setAgents] = useState([]);
  const [agentsBefore, setAgentsBefore] = useState([]);

  const [agent, setAgent] = useState({});
  const [selectedIcon, setSelectedIcon] = useState("Agent");
  // const [selectedButton, setSelectedButton] = useState("MLivePage");
  const handleGridViewChange = (value) => {
    if (value === true) {
      setGridView(true);
    } else {
      setGridView(false);
    }
  };

  const authContext = useContext(AuthContext);

  const [showModal, setshowModal] = useState(false);
  const [showForm, setshowForm] = useState(false);
  const [showFormHire, setshowFormHire] = useState(false);
  const [iconColor, seticonColor] = useState(false);
  const [industrySelector, setindustrySelector] = useState(false);
  const [countrySelector, setcountrySelector] = useState(false);
  const [agentSelector, setagentSelector] = useState(false);

  const [profileData, setProfileData] = useState({});
  const [screenStatus, setScreenStatus] = useState(true);

  const [inquiryUserName, setInquiryUserName] = useState("");
  const [inquirUserEmail, setInquiryUserEmail] = useState("");
  const [inquiryUserPhone, setInquiryUserPhone] = useState("");
  const [inquiryDate, setInquiryDate] = useState("");
  const [inquiryDuration, setInquiryDuration] = useState("15 mins");
  const [inquiryTime, setInquiryTime] = useState("");
  // const [inquiryTimeZone, setInquiryTimeZone] = useState("");
  const [message, setMessage] = useState("");

  const [industriesList, setIndustriesList] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  const [sellerExpList, setSellerExpList] = useState([]);
  const [sellerLangList, setSellerLangList] = useState([]);

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedExps, setSelectedExps] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [sortedBy, setSortedBy] = useState([]);

  const dispatch = useDispatch();

  const getUserData = async () => {
    const profileData = loadState("profile_data") || {};
    setInquiryUserName(
      fullName(profileData?.first_name, profileData?.last_name)
    );
    setInquiryUserEmail(profileData?.email);
    setInquiryUserPhone(profileData?.phone);
  };

  const getAllFilters = async () => {
    try {
      dispatch(loadingTriggered(true));
      const response = await AgentApi.get_agent_filter();

      if (response.data) {
        // Filter out agents with available set to false
        console.log("FILTERS__", response.data);
        setIndustriesList(response?.data?.industries);
        setCountriesList(response?.data?.countries);
        setSellerExpList(response?.data?.seller_experience);
        setSellerLangList(response?.data?.seller_languages);
        dispatch(loadingTriggered(false));
      } else {
        dispatch(loadingTriggered(false));
      }
    } catch (error) {
      // Handle errors here
      console.error("Error fetching filters:", error);
      dispatch(loadingTriggered(false));
    }
  };

  const checkLanguages = async (event, lang) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add the selected language to the array
      setSelectedLanguages((prevSelectedLanguages) => [
        ...prevSelectedLanguages,
        lang,
      ]);
    } else {
      // Remove the deselected language from the array
      setSelectedLanguages((prevSelectedLanguages) =>
        prevSelectedLanguages.filter((selectedLang) => selectedLang !== lang)
      );
    }
  };

  const checkExp = async (event, exp) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add the selected exp to the array
      setSelectedExps((prevselectedExps) => [...prevselectedExps, exp]);
    } else {
      // Remove the deselected exp from the array
      setSelectedExps((prevselectedExps) =>
        prevselectedExps.filter((selectedExps) => selectedExps !== exp)
      );
    }
  };

  const checkCountries = async (event, country) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add the selected country to the array
      setSelectedCountries((prevselectedCountries) => [
        ...prevselectedCountries,
        country,
      ]);
    } else {
      // Remove the deselected country from the array
      setSelectedCountries((prevselectedCountries) =>
        prevselectedCountries.filter((selectedExps) => selectedExps !== country)
      );
    }
  };

  const checkIndustries = async (event, industry) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add the selected industry to the array
      setSelectedIndustries((prevSelectedIndustries) => [
        ...prevSelectedIndustries,
        industry,
      ]);
    } else {
      // Remove the deselected industry from the array
      setSelectedIndustries((prevSelectedIndustries) =>
        prevSelectedIndustries.filter(
          (selectedLang) => selectedLang !== industry
        )
      );
    }
  };
  useEffect(() => {
    const currentDate = new Date();

    // Format date
    const formattedDate = currentDate.toString();

    // Format time
    const formattedTime = currentDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Format timezone
    const timezoneOffsetMinutes = currentDate.getTimezoneOffset();
    const timezoneOffsetHours = Math.abs(timezoneOffsetMinutes) / 60;
    const timezoneSign = timezoneOffsetMinutes > 0 ? "-" : "+";
    const timezone = `(GMT${timezoneSign}${String(timezoneOffsetHours).padStart(
      2,
      "0"
    )}:${String(Math.abs(timezoneOffsetMinutes) % 60).padStart(2, "0")})`;

    // Output
    console.log("TimeZones: ", timezone);
    setInquiryDate(formattedDate);
    setInquiryTime(formattedTime);

    // console.log({
    //   date: formattedDate,
    //   message: "",
    //   time: formattedTime,
    //   time_zone: timezone
    // });
  }, []);
  const handleModal = async (id) => {
    if (id) {
      const response = await AgentApi.get_by_id(id);
      if (response.data) {
        console.log("AGENT_", response.data);
        setAgent(response.data);
        setshowModal(true);
      }
    } else {
      setshowModal(false);
      setshowForm(false);
    }
  };

  const handleDateSelect = (date) => {
    console.log("Selected date:", date);
    date = date.toString();
    console.log("date", date);
    setInquiryDate(date);
  };

  const handleTimeSelect = (time) => {
    console.log("Selected time:", time);
    setInquiryTime(time);
  };

  // const handleTimeZoneSelect = (timezone) => {
  //   // Intl.DateTimeFormat().resolvedOptions().timeZone;

  //   console.log("Selected timezone:", timezone.label);
  //   setInquiryTimeZone(timezone.label);
  // };

  const sendMessage = async (agentId) => {
    const data = {
      agent_id: agentId,
      message,
      user_name: inquiryUserName,
      user_email: inquirUserEmail,
      user_phone: inquiryUserPhone,
      inquiry_date: inquiryDate,
      duration: inquiryDuration,
      start_time: inquiryTime,
      time_zone: selectedTimezone?.label,
    };
    console.log("data__________", data);
    const response = await AgentApi.create_inquiry(data);
    if (response?.status) {
      alert(response.message);
      setshowFormHire(false);
      // setshowModal(false)
      setshowForm(false);
    } else {
      alert(response?.message);
    }
  };

  const viewResume = () => {
    window.open(agent?.resume_url, "_blank");
  };
  const changeIconColor = () => {
    {
      iconColor == true ? seticonColor(false) : seticonColor(true);
    }
  };

  const handleForm = () => {
    {
      showForm == true ? setshowForm(false) : setshowForm(true);
      getUserData();
    }
  };

  const [openVideo, setIsOpenVideo] = useState(false);
  const [openedVideo, setOpenedVideo] = useState("");
  const triggerOpenVideo = (agent) => {
    console.log("openVideo", agent.video_url);
    if (agent.video_url) {
      setIsOpenVideo(true);
      setOpenedVideo(agent.video_url);
    } else {
      alert("No video available");
    }
  };
  const onClose = () => {
    setIsOpenVideo(false);
  };
  const handleFormHire = async (e) => {
    //   console.log("ID_____________", e);

    // if (e.id) {
    //   const response = await AgentApi.get_by_id(e.id);
    //   if (response.data) {
    //     console.log("AGENT_", response.data);
    //     setAgent(response.data);
    //   }
    // } else {
    // }
    //  console.log("AGENT_________________", agent);
    !showFormHire ? setshowFormHire(true) : setshowFormHire(false);
    getUserData();
  };

  const hideFormHire = () => {
    setshowFormHire(false);
  };

  const openIndustrySlector = () => {
    {
      industrySelector == true
        ? setindustrySelector(false)
        : setindustrySelector(true);
      countrySelector == true ? setcountrySelector(false) : null;
      agentSelector == true ? setagentSelector(false) : null;
    }
  };

  const openCountrySelector = () => {
    {
      countrySelector == true
        ? setcountrySelector(false)
        : setcountrySelector(true);
      industrySelector == true ? setindustrySelector(false) : null;

      agentSelector == true ? setagentSelector(false) : null;
    }
  };

  const filterByAgentDetails = () => {
    filterData();
    setagentSelector(false);
  };

  const filterByIndustry = () => {
    filterData();
    setindustrySelector(false);
  };

  const filterByCountry = () => {
    filterData();
    setcountrySelector(false);
  };

  const filterData = () => {
    var languageMatchData = [];
    var countryMatchData = [];
    var industryMatchData = [];
    var expMatchData = [];

    agentsBefore.filter((agent) => {
      selectedCountries.forEach((country) => {
        if (agent.country) {
          let match = agent.country === country;
          if (match) {
            countryMatchData.push(agent);
          }
        }
      });

      selectedExps.forEach((exp) => {
        if (agent.exp_level) {
          let match = agent.exp_level === exp;
          if (match) {
            expMatchData.push(agent);
          }
        }
      });

      selectedLanguages.forEach((lang) => {
        if (agent.languages) {
          let match = agent.languages.some(
            (agentLang) => agentLang.language === lang
          );
          if (match) {
            languageMatchData.push(agent);
          }
        }
      });

      selectedIndustries.forEach((industry) => {
        if (agent.industy_expertise) {
          let match = agent.industy_expertise.some(
            (agentIndustry) => agentIndustry.industry === industry
          );

          if (match) {
            industryMatchData.push(agent);
          }
        }
      });
    });

    setSortedBy(
      selectedIndustries.concat(
        selectedCountries,
        selectedExps,
        selectedLanguages
      )
    );
    const countryChecker = () =>
      selectedCountries.length > 0 && countryMatchData.length === 0;
    const industryChecker = () =>
      selectedIndustries.length > 0 && industryMatchData.length === 0;
    const languageChecker = () =>
      selectedLanguages.length > 0 && languageMatchData.length === 0;
    const expChecker = () =>
      selectedExps.length > 0 && expMatchData.length === 0;

    console.log("industryChecker", industryChecker());
    console.log("countryChecker", countryChecker());
    console.log("expChecker", expChecker());
    console.log("languageChecker", languageChecker());

    console.log("industryMatchData", industryMatchData);
    console.log("countryMatchData", countryMatchData);
    console.log("expMatchData", expMatchData);
    console.log("languageMatchData", languageMatchData);

    if (
      countryChecker() ||
      industryChecker() ||
      languageChecker() ||
      expChecker()
    ) {
      setAgents([]);
    } else {
      const allArrays = [
        languageMatchData,
        industryMatchData,
        countryMatchData,
        expMatchData,
      ];

      // Filter arrays that have at least one object
      const arraysWithObjects = allArrays.filter((arr) =>
        arr.some((obj) => Object.keys(obj).length > 0)
      );

      console.log("arraysWithObjects______________", arraysWithObjects);
      // Find the common objects in the selected arrays

      // Find the common objects in the selected arrays
      const resultArray = arraysWithObjects.reduce(
        (commonObjects, currentArray) => {
          return commonObjects.filter((commonObj) =>
            currentArray.some((obj) => obj.id === commonObj.id)
          );
        },
        arraysWithObjects[0]
      ); // Initialize with the first array

      // Note: Make sure arraysWithObjects is not an empty array to prevent errors

      // const resultArray = arraysWithObjects.reduce(
      //   (commonObjects, currentArray) => {
      //     if (commonObjects.length === 0) {
      //       return currentArray;
      //     }

      //     return commonObjects.filter((commonObj) =>
      //       currentArray.some((obj) => obj.id === commonObj.id)
      //     );
      //   },
      //   []
      // );
      console.log("resultArray", resultArray);
      const uniqueArray = [...new Set(resultArray)];
      console.log("uniqueArray", uniqueArray);

      if (
        selectedCountries.length == 0 &&
        selectedExps.length == 0 &&
        selectedLanguages.length == 0 &&
        selectedIndustries.length == 0
      ) {
        setAgents(agentsBefore);
        //alert("Please select atleast one filter");
      } else {
        setAgents(uniqueArray);

        // if (resultArray.length > 0) {
        //   setAgents(resultArray);
        // } else {
        //   setAgents(agentsBefore);
        // }
      }
    }
  };

  const openAgentSelector = () => {
    {
      agentSelector == true ? setagentSelector(false) : setagentSelector(true);
      countrySelector == true ? setcountrySelector(false) : null;
      industrySelector == true ? setindustrySelector(false) : null;
    }
  };

  const getAllAgents = async () => {
    try {
      dispatch(loadingTriggered(true));
      const response = await AgentApi.get_all_agents();

      if (response.data) {
        // Filter out agents with available set to false
        const filteredAgents = response.data.filter(
          (agent) => agent?.available
        );
        filteredAgents.reverse();
        // Set the state with the filtered agents
        setAgents(filteredAgents);
        setAgentsBefore(filteredAgents);
        dispatch(loadingTriggered(false));
      } else {
        dispatch(loadingTriggered(false));
      }
    } catch (error) {
      // Handle errors here
      console.error("Error fetching agents:", error);
      dispatch(loadingTriggered(false));
    }
  };

  const fullName = (firstName, lastName) => firstName + " " + lastName;

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check if the key pressed is the "Enter" key (key code 13)
      if (event.keyCode === 88) {
        setScreenStatus(false);
      }
    };
    getAllFilters();
    getAllAgents();

    window.addEventListener("keydown", handleKeyPress);
  }, []);
  if (!authContext) {
    return null; // Or show some loading/error message when the context is not available yet.
  }
  const { isLoggedIn, packageName, checkUserLoggedIn } = authContext;

  return (
    <div>
      {isLoggedIn && (
        <>
          <div className="flex w-full  h-screen">
            {/* {packageName === "free" && (
              <>
                <NotAvailble
                  loading={screenStatus}
                  messageOveraly="Coming soon.."
                  position="left-[0%] w-[100%] bg-gray-100"
                />
              </>
            )} */}
            <div className="w-[5%] absolute z-50 ">
              <IconSideNavBar
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
              />
            </div>

            <div className="w-full overflow-auto scrollbar-hide ">
              <div className="">
                <div className=" flex  items-center justify-start w-full 2xl:pl-[8rem] pl-[6rem] border-b-[1px]">
                  <PageHeader BoldText="Marketix" RegularText="Agents" />
                  <div className="flex gap-5  py-[1rem]  2xl:pl-[8rem] pl-[6rem] w-[70%] justify-center ">
                    <div className="w-auto  z-30">
                      <div
                        className=" gap-4 flex justify-between items-center z-30  top-[5rem] left-60 border-[.1rem] border-gray-300 rounded-md py-2 px-3"
                        onClick={openIndustrySlector}
                      >
                        <div className="2xl:text-base text-sm"> Industry</div>

                        <div>
                          <Image
                            src={"/images/live/drop.png"}
                            className="my-1"
                            alt="drop"
                            width={12}
                            height={12}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-auto z-30">
                      <div
                        className="gap-4 flex justify-between items-center z-30 top-[5rem] left-60 border-[.1rem] border-gray-300 rounded-md py-2 px-3"
                        onClick={openCountrySelector}
                      >
                        <div className="2xl:text-base text-sm"> Country</div>

                        <div>
                          <Image
                            src={"/images/live/drop.png"}
                            className="my-1"
                            alt="drop"
                            width={12}
                            height={12}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-auto z-30">
                      <div
                        className="gap-4 flex justify-between items-center z-30 bg-slate-00   top-[5rem] left-60 border-[.1rem] border-gray-300 rounded-md py-2 px-3"
                        onClick={openAgentSelector}
                      >
                        <div className="2xl:text-base text-sm">
                          Seller Details
                        </div>

                        <div>
                          <Image
                            src={"/images/live/drop.png"}
                            className="my-1"
                            alt="drop"
                            width={12}
                            height={12}
                          />
                        </div>
                      </div>
                    </div>

                    {industrySelector == true ? (
                      <div className="absolute top-20 2xl:left-[45rem] left-[30rem]  bg-white shadow-md rounded-md p-2 z-30border-[.1rem] border-gray-100 z-30">
                        <div className="w-60 px-2 ">
                          <p className=" pb-4 font-bold text-lg pt-3">
                            Industry
                          </p>

                          {industriesList ? (
                            industriesList.map((industry, index) => (
                              <div
                                key={index}
                                className="flex pr-3 justify-start py-2"
                              >
                                <div className="w-8">
                                  <Checkbox
                                    onChange={(event) =>
                                      checkIndustries(event, industry)
                                    }
                                    checked={selectedIndustries.includes(
                                      industry
                                    )}
                                  />
                                </div>
                                <p>{industry}</p>
                              </div>
                            ))
                          ) : (
                            <p>No industries available</p>
                          )}

                          <div className="flex justify-end items-end gap-3 border-t-[.1rem] mt-3 pt-3 pb-2">
                            <Button
                              alignItems="center"
                              background="#ffffff"
                              border="1px solid"
                              borderColor="#D0D5DD"
                              borderRadius="8px"
                              color="#000000"
                              direction="row"
                              disabledColor="#D0D5DD"
                              display="flex"
                              flexDirection="row"
                              focusColor="#D0D5DD"
                              fontSize="14px"
                              fontWeight="500"
                              gap="8px"
                              hoverColor="#D0D5DD30"
                              justifyContent="center"
                              label="Cancel"
                              size="md"
                              onClick={openIndustrySlector}
                            />
                            <Button
                              alignItems="center"
                              background="#7F56D9"
                              border="1px solid"
                              borderColor="#6941C6"
                              borderRadius="8px"
                              color="white"
                              direction="row"
                              disabledColor="#E9D7FE"
                              display="flex"
                              flexDirection="row"
                              focusColor="#F4EBFF"
                              fontSize="14px"
                              fontWeight="500"
                              gap="8px"
                              hoverColor="#5C3DA7"
                              justifyContent="center"
                              label="Apply"
                              size="md"
                              onClick={filterByIndustry}
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {countrySelector == true ? (
                      <div className="absolute  top-20 2xl:left-[55rem] left-[40rem] bg-white shadow-md rounded-md p-2 z-30border-[.1rem] border-gray-100 z-30">
                        <div className="w-60 px-2 ">
                          <p className="pb-4 font-bold text-lg pt-3">
                            Select Countries
                          </p>
                          <div className="border-2 gap-3 px-2 py-2 rounded-md border-gray-200 w-full flex mb-4">
                            <div>
                              <Image
                                src={"/images/live/search.png"}
                                className="my-1"
                                alt="drop"
                                width={13}
                                height={13}
                              />
                            </div>
                            <input
                              className=" outline-0 w-full"
                              placeholder="Search"
                            />
                          </div>

                          {countriesList ? (
                            countriesList.map((country, index) => (
                              <div
                                key={index}
                                className="flex pr-3 justify-start gap-2  items-center h-10 py-2"
                              >
                                <div className="w-8 h-5 relative">
                                  <Checkbox
                                    onChange={(event) =>
                                      checkCountries(event, country)
                                    }
                                    checked={selectedCountries.includes(
                                      country
                                    )}
                                  />
                                </div>

                                <Avatar
                                  border="1px"
                                  borderRadius="50%"
                                  height="24px"
                                  image={getCountryLogo(country)}
                                  width="24px"
                                />
                                <p className="">{country}</p>
                              </div>
                            ))
                          ) : (
                            <p>No countries available</p>
                          )}

                          <div className="flex justify-end items-end gap-3 border-t-[.1rem] mt-3 pt-3 pb-2">
                            <Button
                              alignItems="center"
                              background="#ffffff"
                              border="1px solid"
                              borderColor="#D0D5DD"
                              borderRadius="8px"
                              color="#000000"
                              direction="row"
                              disabledColor="#D0D5DD"
                              display="flex"
                              flexDirection="row"
                              focusColor="#D0D5DD"
                              fontSize="14px"
                              fontWeight="500"
                              gap="8px"
                              hoverColor="#D0D5DD30"
                              justifyContent="center"
                              label="Cancel"
                              size="md"
                              onClick={openCountrySelector}
                            />
                            <Button
                              alignItems="center"
                              background="#7F56D9"
                              border="1px solid"
                              borderColor="#6941C6"
                              borderRadius="8px"
                              color="white"
                              direction="row"
                              disabledColor="#E9D7FE"
                              display="flex"
                              flexDirection="row"
                              focusColor="#F4EBFF"
                              fontSize="14px"
                              fontWeight="500"
                              gap="8px"
                              hoverColor="#5C3DA7"
                              justifyContent="center"
                              label="Apply"
                              size="md"
                              onClick={filterByCountry}
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {agentSelector == true ? (
                      <div className="absolute  top-20 2xl:left-[65rem] left-[50rem]  bg-white shadow-md rounded-md p-2 z-30border-[.1rem] border-gray-100 z-30">
                        <div className="w-auto px-2 ">
                          <p className="pb-4 font-bold text-lg pt-3">
                            Seller Experience
                          </p>
                          <div className="grid grid-cols-3 ">
                            {sellerExpList ? (
                              sellerExpList.map((exp, index) => (
                                <div
                                  key={index}
                                  className="flex pr-3 justify-start py-2"
                                >
                                  <div className="w-8">
                                    <Checkbox
                                      onChange={(event) => checkExp(event, exp)}
                                      checked={selectedExps.includes(exp)}
                                    />
                                  </div>
                                  <p>{exp}</p>
                                </div>
                              ))
                            ) : (
                              <p>No languages available</p>
                            )}
                          </div>
                          <p className="pb-4 font-bold text-lg pt-3">
                            Seller Speaks
                          </p>
                          <div className="grid grid-cols-3 ">
                            {sellerLangList ? (
                              sellerLangList.map((lang, index) => (
                                <div
                                  key={index}
                                  className="flex pr-3 justify-start py-2"
                                >
                                  <div className="w-8">
                                    <Checkbox
                                      onChange={(event) =>
                                        checkLanguages(event, lang)
                                      }
                                      checked={selectedLanguages.includes(lang)}
                                    />
                                  </div>
                                  <p>{lang}</p>
                                </div>
                              ))
                            ) : (
                              <p>No languages available</p>
                            )}
                          </div>
                          <div className="flex justify-end items-end gap-3 border-t-[.1rem] mt-3 pt-3 pb-2">
                            <Button
                              alignItems="center"
                              background="#ffffff"
                              border="1px solid"
                              borderColor="#D0D5DD"
                              borderRadius="8px"
                              color="#000000"
                              direction="row"
                              disabledColor="#D0D5DD"
                              display="flex"
                              flexDirection="row"
                              focusColor="#D0D5DD"
                              fontSize="14px"
                              fontWeight="500"
                              gap="8px"
                              hoverColor="#D0D5DD30"
                              justifyContent="center"
                              label="Cancel"
                              size="md"
                              onClick={openAgentSelector}
                            />
                            <Button
                              alignItems="center"
                              background="#7F56D9"
                              border="1px solid"
                              borderColor="#6941C6"
                              borderRadius="8px"
                              color="white"
                              direction="row"
                              disabledColor="#E9D7FE"
                              display="flex"
                              flexDirection="row"
                              focusColor="#F4EBFF"
                              fontSize="14px"
                              fontWeight="500"
                              gap="8px"
                              hoverColor="#5C3DA7"
                              justifyContent="center"
                              label="Apply"
                              size="md"
                              onClick={filterByAgentDetails}
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  {/* <div className=" border-2  px-2 py-2 rounded-md border-gray-300 ml-8 w-full flex">
                    <input
                      className=" outline-0  w-full"
                      placeholder="What do you want to sell?"
                    />
                    <div>
                      <img
                        src="../../images/live/search.png"
                        className="my-1"
                      />
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="  relative">
                {/* <div className="  bg-purple-100 py-5 z-10 2xl:pl-[8rem] pl-[6rem] 2xl:pr-[2rem] pr-[1rem] relative ">
                  <PageHeader BoldText="Recommended sellers" RegularText="" />
                  <div className="flex relative w-full justify-between">
                    <div className="border-2 2xl:gap-6 gap-3 border-gray-200 h-auto bg-white rounded-xl mt-4 2xl:p-4 p-2 flex justify-between">
                      <div className="flex">
                        <div className=" flex justify-center items-center">
                          <img
                            src="../../images/live/Avatar1.png"
                            className="2xl:w-auto  w-10"
                          />
                        </div>

                        <div className="px-4 items-start">
                          <p className="font-bold 2xl:text-base text-xs">
                            Bessie Cooper
                          </p>
                          <img
                            src="../../images/live/Avatargroup.png"
                            className="my-1"
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex justify-center items-center 2xl:gap-2 gap-1">
                          <img src="../../images/live/star.png" />
                          <p className="  2xl:text-lg  text-xs">4.7 (125)</p>
                        </div>

                        <div className="2xl:pl-4  pl-2">
                          <p className="font-bold text-xs 2xl:text-xl w-min text-right">
                            $1050 month
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border-2 2xl:gap-6 gap-3 border-gray-200 h-auto bg-white rounded-xl mt-4 2xl:p-4 p-2 flex justify-between">
                      <div className="flex">
                        <div className=" flex justify-center items-center">
                          <img
                            src="../../images/live/Avatar2.png"
                            className="2xl:w-auto  w-10"
                          />
                        </div>

                        <div className="px-4 items-start">
                          <p className="font-bold 2xl:text-base text-xs">
                            Albert Flores
                          </p>
                          <img
                            src="../../images/live/Avatargroup.png"
                            className="my-1"
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex justify-center items-center 2xl:gap-2 gap-1">
                          <img src="../../images/live/star.png" />
                          <p className="  2xl:text-lg  text-xs">4.8 (312)</p>
                        </div>

                        <div className="2xl:pl-4  pl-2">
                          <p className="font-bold text-sm 2xl:text-xl w-min text-right">
                            $950 month
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border-2 2xl:gap-6 gap-3 border-gray-200 h-auto bg-white rounded-xl mt-4 2xl:p-4 p-2 flex justify-between">
                      <div className="flex">
                        <div className=" flex justify-center items-center">
                          <img
                            src="../../images/live/Avatar3.png"
                            className="2xl:w-auto  w-10"
                          />
                        </div>

                        <div className="px-4 items-start">
                          <p className="font-bold 2xl:text-base text-xs">
                            Floyd Miles
                          </p>
                          <img
                            src="../../images/live/Avatargroup.png"
                            className="my-1"
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex justify-center items-center 2xl:gap-2 gap-1">
                          <img src="../../images/live/star.png" />
                          <p className="  2xl:text-lg  text-xs">4.6 (268)</p>
                        </div>

                        <div className="2xl:pl-4  pl-2">
                          <p className="font-bold text-xs 2xl:text-xl w-min text-right">
                            $830 month
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border-2 2xl:gap-6 gap-3 border-gray-200 h-auto bg-white rounded-xl mt-4 2xl:p-4 p-2 flex justify-between">
                      <div className="flex">
                        <div className=" flex justify-center items-center">
                          <img
                            src="../../images/live/Avatar4.png"
                            className="2xl:w-auto  w-10"
                          />
                        </div>

                        <div className="px-4 items-start">
                          <p className="font-bold 2xl:text-base text-xs">
                            Marvin McKinney
                          </p>
                          <img
                            src="../../images/live/Avatargroup.png"
                            className="my-1"
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex justify-center items-center 2xl:gap-2 gap-1">
                          <img src="../../images/live/star.png" />
                          <p className="  2xl:text-lg  text-xs">4.8 (98)</p>
                        </div>

                        <div className="2xl:pl-4  pl-2">
                          <p className="font-bold text-xs 2xl:text-xl w-min text-right">
                            $890 month
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>

              {showModal ? (
                <div className="bg-black/30 w-screen h-screen absolute z-50 top-0  justify-end flex items-center ">
                  <div className="w-3/4 h-screen  rounded-tl-3xl rounded-bl-3xl  duration-1500 bg-white ">
                    <div className="2xl:py-2 pt-2 pb-2">
                      <div
                        className=" hover:bg-gray-400/20 rounded-full 2xl:p-3 px-1 py-1 2xl:w-10 w-8 2xl:m-4 ml-4"
                        onClick={() => handleModal(false)}
                      >
                        <img
                          src="../../images/live/closeIcon.png"
                          className=""
                        />
                      </div>

                      <div className="">
                        <div className="  border-2 border-gray-200 h-auto rounded-2xl m-4 ">
                          <div className="flex justify-between items-end 2xl:p-4  p-2">
                            <div className="flex justify-start items-center h-auto gap-4 ">
                              <div className=" 2xl:h-[150px] 2xl:w-[150px] h-[100px] w-[100px]">
                                <img
                                  src={
                                    agent?.image_url ||
                                    "../../images/live/Avatarprofilephoto.png"
                                  }
                                />
                              </div>
                              <div className="flex flex-col 2xl:gap-1">
                                {}
                                <p className="2xl:text-xl  text-lg font-bold ">
                                  {fullName(agent?.firstname, agent?.lastname)}
                                </p>

                                <p className=" 2xl:text-lg text-sm text-gray-500">
                                  {agent?.city},{agent?.country}
                                </p>
                                <p className="2xl:text-lg text-sm text-gray-500">
                                  12:25 Local Time •
                                  <span className="text-green-600">
                                    {" "}
                                    Online
                                  </span>
                                </p>
                                <div className=" flex gap-4 py-2">
                                  <Link
                                    href={agent?.linkedin_url}
                                    target="_blank"
                                  >
                                    <div className="2xl:w-[24px] w-[20px] ">
                                      <img src="../../../images/team/linkedinLogo.svg" />
                                    </div>
                                  </Link>

                                  <div className="2xl:w-[24px] w-[20px] ">
                                    {" "}
                                    <img src="../../../images/team/instaLogo.svg" />
                                  </div>
                                  <Link
                                    href={agent?.twitter_url}
                                    target="_blank"
                                  >
                                    <div className="2xl:w-[24px] w-[20px] ">
                                      <img src="../../../images/team/twitterLogo.svg" />
                                    </div>
                                  </Link>
                                </div>
                                {/* <img
                              src="../../images/live/titleDetails.png"
                              className="py-3"
                            /> */}
                              </div>
                            </div>
                            <div className=" ">
                              {/* <div
                            className="   items-end gap-3 w-full justify-end flex pb-4"
                            onClick={changeIconColor}
                          >
                            {iconColor == true ? (
                              <img
                                src="../../images/live/redheart.png"
                                className="w-12 border-2  rounded-full"
                              />
                            ) : (
                              <img
                                src="../../images/live/heart.png"
                                className="w-12 border-2  rounded-full"
                              />
                            )}
                          </div> */}
                              <div className="flex justify-center items-end  gap-3 ">
                                <Button
                                  alignItems="center"
                                  background="#ffffff"
                                  border="1px solid"
                                  borderColor="#D0D5DD"
                                  borderRadius="8px"
                                  color="#344054"
                                  direction="row"
                                  disabledColor="#E9D7FE"
                                  display="flex"
                                  flexDirection="row"
                                  focusColor="#F4EBFF"
                                  fontSize="14px"
                                  fontWeight="500"
                                  gap="8px"
                                  hoverColor="#D0D5DD30"
                                  icon="documentIcon"
                                  iconColor="#344054"
                                  iconPosition="leading"
                                  justifyContent="center"
                                  label="View resume"
                                  onClick={viewResume}
                                  size="sm"
                                />
                                <Button
                                  alignItems="center"
                                  background="#7F56D9"
                                  border="1px solid"
                                  borderColor="#D0D5DD"
                                  borderRadius="8px"
                                  color="white"
                                  direction="row"
                                  disabledColor="#D0D5DD"
                                  display="flex"
                                  flexDirection="row"
                                  focusColor="#D0D5DD"
                                  fontSize="14px"
                                  fontWeight="500"
                                  gap="8px"
                                  hoverColor="#6941C6"
                                  icon="suitcase"
                                  iconColor="white"
                                  iconPosition="leading"
                                  justifyContent="center"
                                  label="Hire Agent"
                                  size="sm"
                                  onClick={handleForm}
                                  disabled={!agent?.available}
                                />
                              </div>

                              {showForm ? (
                                <>
                                  <div className="w-screen h-screen bg-black/50  shadow-xl top-0 right-0   absolute  justify-center items-center flex ">
                                    <div className="w-auto h-auto bg-white rounded-2xl shadow-xl z-50">
                                      <div className=" p-3">
                                        <p className="font-regular text-gray-700  2xl:text-lg text-base  ">
                                          Contact [circle seller name here]
                                        </p>
                                      </div>

                                      <div className="border-b-2"></div>
                                      <div className="2xl:p-3 p-2">
                                        <p className="text-sm text-[#344054] font-normal">
                                          Your name
                                        </p>
                                        <div className="pt-2">
                                          <InputPlain
                                            alignItems="center"
                                            alignment="left"
                                            background="#FFFFFF"
                                            border="1px solid #EBECF0"
                                            borderRadius="8px"
                                            boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                                            color="#667085"
                                            disabledBackgroundColor="#EBECF0"
                                            display="flex"
                                            flexDirection="row"
                                            height="44px"
                                            padding="10px 8px"
                                            placeholder="Enter your name"
                                            type="text"
                                            width="500px"
                                            value={inquiryUserName}
                                            onChange={(e) =>
                                              setInquiryUserName(e)
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="2xl:p-3 p-2  flex gap-4">
                                        <div>
                                          <p className="text-sm text-[#344054] font-normal">
                                            Contact Number
                                          </p>
                                          <div className="pt-2">
                                            <InputPlain
                                              alignItems="center"
                                              alignment="left"
                                              background="#FFFFFF"
                                              border="1px solid #EBECF0"
                                              borderRadius="8px"
                                              boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                                              color="#667085"
                                              disabledBackgroundColor="#EBECF0"
                                              display="flex"
                                              flexDirection="row"
                                              height="44px"
                                              padding="10px 8px"
                                              placeholder="098765432"
                                              type="text"
                                              value={inquiryUserPhone}
                                              onChange={(e) =>
                                                setInquiryUserPhone(e)
                                              }
                                              // width="500px"
                                            />
                                          </div>
                                        </div>
                                        <div>
                                          <p className="text-sm text-[#344054] font-normal">
                                            Email
                                          </p>
                                          <div className="pt-2">
                                            <InputPlain
                                              alignItems="center"
                                              alignment="left"
                                              background="#FFFFFF"
                                              border="1px solid #EBECF0"
                                              borderRadius="8px"
                                              boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                                              color="#667085"
                                              disabledBackgroundColor="#EBECF0"
                                              display="flex"
                                              flexDirection="row"
                                              fontSize="12px"
                                              height="44px"
                                              padding="10px 8px"
                                              placeholder="hello@youremailhere.com"
                                              type="text"
                                              value={inquirUserEmail}
                                              onChange={(e) =>
                                                setInquiryUserEmail(e)
                                              }
                                              // width="500px"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className=" 2xl:m-3 m-2 border-[1px] border-[#D0D5DD] rounded-lg bg-[#F9FAFB]">
                                        <div className="2xl:p-3 p-2 flex gap-3 ">
                                          <div>
                                            <p className="text-sm text-[#344054] font-normal">
                                              Day
                                            </p>
                                            <div className="pt-2">
                                              <CustomDatePicker
                                                onSelectDate={handleDateSelect}
                                              />
                                            </div>
                                          </div>
                                          <div>
                                            <p className="text-sm text-[#344054] font-normal">
                                              Duration
                                            </p>

                                            <div className="pt-2">
                                              <Dropdown
                                                background="#ffffff"
                                                border="1px solid #D0D5DD"
                                                borderRadius="8px"
                                                color="rgba(0, 0, 0, 1)"
                                                height="44px"
                                                // onSelect={function noRefCheck() {}}
                                                optionStyles={{
                                                  borderRadius: "10px",
                                                  color: "black",
                                                  width: "350px",
                                                }}
                                                options={[
                                                  {
                                                    label: "15 mins",
                                                    name: "15 mins",
                                                  },
                                                  {
                                                    label: "30 mins",
                                                    name: "30 mins",
                                                  },
                                                  {
                                                    label: "45 mins",
                                                    name: "45 mins",
                                                  },
                                                  {
                                                    label: "60 mins",
                                                    name: "60 mins",
                                                  },
                                                ]}
                                                // selectedValue="10 mins"
                                                onSelect={(e) => {
                                                  setInquiryDuration(
                                                    e.target.value
                                                  );
                                                }}
                                                selectedValue={inquiryDuration}
                                                labelKey="label"
                                                valueKey="name"
                                                width="100%"
                                                outline="0"
                                              />
                                            </div>
                                          </div>
                                          <div>
                                            <p className="text-sm text-[#344054] font-normal">
                                              From
                                            </p>
                                            <div className="pt-2">
                                              <TimeInput
                                                onSelectTime={handleTimeSelect}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="p-3">
                                          <p className="text-sm text-[#344054] font-normal">
                                            Timezone
                                          </p>
                                          <TimezoneSelect
                                            value={selectedTimezone}
                                            className="pt-2 "
                                            onChange={setSelectedTimezone}
                                          />
                                        </div>
                                        <div className="p-3">
                                          <p className="text-sm text-[#344054] font-normal">
                                            Message
                                          </p>
                                          <textarea
                                            className="w-full bg-white outline-none border-2 border-gray-200 px-2  rounded-md mt-2"
                                            rows={4}
                                            placeholder="Write your message for seller"
                                            onChange={(e) =>
                                              setMessage(e.target.value)
                                            }
                                          />
                                        </div>
                                      </div>

                                      <div className=" items-end flex gap-4 justify-end 2xl:p-3 p-2">
                                        <Button
                                          alignItems="center"
                                          background="#ffffff"
                                          border="1px solid"
                                          borderColor="#D0D5DD"
                                          borderRadius="8px"
                                          color="#000000"
                                          direction="row"
                                          disabledColor="#D0D5DD"
                                          display="flex"
                                          flexDirection="row"
                                          focusColor="#D0D5DD"
                                          fontSize="14px"
                                          fontWeight="500"
                                          gap="8px"
                                          hoverColor="#D0D5DD30"
                                          justifyContent="center"
                                          label="Cancel"
                                          size="md"
                                          onClick={handleForm}
                                        />

                                        <Button
                                          alignItems="center"
                                          background="#7F56D9"
                                          border="1px solid"
                                          borderColor="#7F56D9"
                                          borderRadius="8px"
                                          color="white"
                                          direction="row"
                                          disabledColor="#E9D7FE"
                                          display="flex"
                                          flexDirection="row"
                                          focusColor="#F4EBFF"
                                          fontSize="14px"
                                          fontWeight="500"
                                          gap="8px"
                                          hoverColor="#5C3DA7"
                                          justifyContent="center"
                                          label="Send Message"
                                          size="md"
                                          onClick={() =>
                                            sendMessage(agent?.agent_id)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : null}
                            </div>
                          </div>
                          <div className=" w-full border-t-2 border-gray-200 flex ">
                            <div className=" 2xl:w-1/3 w-1/4  border-r-2 ">
                              <div className="border-gray-200 border-b-2 2xl:px-4 px-2 2xl:py-5 py-2">
                                <p className="text-gray-400 2xl:text-base text-sm">
                                  Completed Sessions
                                </p>
                                <p className="font-semibold 2xl:text-xl text-md 2xl:pt-2 pt-0 text-[#1D2939]">
                                  {agent?.completed_sessions}
                                </p>
                              </div>
                              <div className="border-gray-200 border-b-2 2xl:px-4 px-2 2xl:py-5 py-2">
                                <p className=" text-gray-400  2xl:text-base text-sm ">
                                  Work Experience
                                </p>
                                <p className="font-semibold 2xl:text-xl text-md 2xl:pt-2 pt-0 text-[#1D2939]">
                                  {agent?.work_exp}
                                </p>
                              </div>
                              <div className=" 2xl:px-4 px-2 2xl:py-5 py-2">
                                <p className="font-semibold  2xl:text-xl text-md  2xl:pt-2 ">
                                  Languages
                                </p>

                                {agent?.languages && (
                                  <>
                                    {agent?.languages.map((work, index) => (
                                      <p
                                        key={index}
                                        className="font-semibold  text-sm 2xl:pt-4 pt-2 w-3/4 text-[#1D2939]"
                                      >
                                        <span>
                                          {work.language} : {""}
                                          <span className="text-gray-500">
                                            {work.langLevel}
                                          </span>
                                        </span>
                                      </p>
                                    ))}
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="2xl:w-1/3 w-2/4  border-r-2  2xl:p-4 p-2 flex flex-col items-start justify-between">
                              <p className="font-semibold  2xl:text-xl text-lg 2xl:pt-2 ">
                                Industry Experience
                              </p>
                              <div className="">
                                {agent?.industy_expertise && (
                                  <Doughnut
                                    industryExperience={
                                      agent?.industy_expertise
                                    }
                                  />
                                )}
                              </div>
                            </div>
                            <div className="w-1/3 2xl:m-4 m-2">
                              <p className="font-semibold  2xl:text-xl text-lg 2xl:pt-2 text-[#1D2939]">
                                {agent?.job_role}
                              </p>
                              <p className=" text-gray-400 2xl:text-base  text-sm pt-2 font-normal">
                                {agent?.about}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className=" h-auto m-4 flex gap-7 ">
                          <div className="border-2 border-gray-200 h-auto rounded-2xl w-full  flex ">
                            <div className="w-1/2  2xl:p-4 px-2 border-r-2">
                              <p className="font-semibold  2xl:text-xl text-lg 2xl:pt-2 pt-1 2xl:pb-4 pb-2 text-[#1D2939]">
                                Work Experience{" "}
                              </p>
                              <div className="flex flex-col gap-3 justify-center">
                                {agent?.work_history && (
                                  <>
                                    {agent?.work_history.map((work, index) => (
                                      <p
                                        key={index}
                                        className="flex gap-4 items-start"
                                      >
                                        <div className="">
                                          <img
                                            src="../../../images/team/sales.png"
                                            width={64}
                                            height={64}
                                          />
                                        </div>

                                        <div className="w-full ">
                                          <p className="font-medium 2xl:text-md text-sm  2xl:w-3/4 ">
                                            {work?.jobRole}
                                          </p>
                                          <p className="font-medium 2xl:text-md text-sm  2xl:w-3/4 ">
                                            {work?.company}
                                          </p>
                                          <p className="font-medium  text-sm text-[#667085] 2xl:w-[80%] w-[75%]">
                                            {work?.time_period}
                                          </p>
                                          <p className="font-medium  text-sm text-[#667085] 2xl:w-[80%] w-[75%]">
                                            {work?.location}
                                          </p>
                                        </div>
                                      </p>
                                    ))}
                                  </>
                                )}
                              </div>
                              {/* <div className="2xl:m-4 m-2">
                            <p className="font-semibold  text-xl 2xl:pt-2 ">
                              Languages
                            </p>
                            <p className="font-semibold  text-sm pt-4  w-3/4">
                              English :
                              <span className=" text-gray-500"> Native </span>
                            </p>

                            <p className="font-semibold  text-sm pt-2  w-3/4">
                              Sinhala :
                              <span className=" text-gray-500"> Fluent</span>
                            </p>
                            <p className="font-semibold  text-sm pt-2  w-3/4">
                              French :
                              <span className=" text-gray-500"> Fluent </span>
                            </p>
                          </div> */}
                              {/* <div className="border-t-2 border-gray-200 h-auto 2xl:p-4 p-2">
                            <p className="font-semibold  text-xl 2xl:pt-2  ">
                              Trusted By
                            </p>
                            <div className="flex gap-2 pt-4">
                              <img src="../../images/live/companyIcons/comapny1.png" />
                              <img src="../../images/live/companyIcons/comapny2.png" />
                              <img src="../../images/live/companyIcons/comapny3.png" />
                              <img src="../../images/live/companyIcons/comapny4.png" />
                              <img src="../../images/live/companyIcons/comapny5.png" />
                              <img src="../../images/live/companyIcons/comapny6.png" />
                            </div>
                          </div> */}
                            </div>
                            <div className="w-1/2 2xl:p-4 px-2">
                              <p className="font-semibold  2xl:text-xl text-lg 2xl:pt-2 pt-1 2xl:pb-4 pb-2 text-[#1D2939]">
                                Education{" "}
                              </p>
                              <div className="flex flex-col gap-3 justify-center">
                                {agent?.education_history && (
                                  <>
                                    {agent?.education_history.map(
                                      (edu, index) => (
                                        <p
                                          key={index}
                                          className="flex gap-4 justify-center"
                                        >
                                          <div className="">
                                            <img
                                              src="../../../images/team/education.png"
                                              width={64}
                                              height={64}
                                            />
                                          </div>
                                          <div className="w-full ">
                                            <p className="font-medium 2xl:text-md text-sm 2xl:w-3/4 ">
                                              {edu?.course}
                                            </p>
                                            <p className="font-medium 2xl:text-md text-sm  2xl:w-3/4 ">
                                              {edu?.institute}
                                            </p>
                                            <p className="font-medium  text-sm text-[#667085] 2xl:w-[80%] w-[75%]">
                                              {edu?.time_period}
                                            </p>
                                            <p className="font-medium  text-sm text-[#667085] 2xl:w-[80%] w-[75%]">
                                              {edu?.location}
                                            </p>
                                          </div>
                                        </p>
                                      )
                                    )}
                                  </>
                                )}

                                {/* <div className="flex gap-4 justify-center">
                                  <div className="">
                                    <img
                                      src="../../../images/team/education.png"
                                      width={64}
                                      height={64}
                                    />
                                  </div>
                                  <div className="w-full ">
                                    <p className="font-medium 2xl:text-md text-sm 2xl:w-3/4 ">
                                      Sales and Marketing Degree
                                    </p>
                                    <p className="font-medium 2xl:text-md text-sm  2xl:w-3/4 ">
                                      at ABC University
                                    </p>
                                    <p className="font-medium  text-sm text-[#667085] 2xl:w-[80%] w-[75%]">
                                      2022 Mar - 2022 December (8 Months)
                                      Colombo, Sri Lanka
                                    </p>
                                  </div>
                                </div>
                                <div className="flex gap-4 justify-center">
                                  <div className="">
                                    <img
                                      src="../../../images/team/education.png"
                                      width={64}
                                      height={64}
                                    />
                                  </div>
                                  <div className="w-full ">
                                    <p className="font-medium 2xl:text-md text-sm  ">
                                      Digital Marketing Certification
                                    </p>
                                    <p className="font-medium 2xl:text-md text-sm ">
                                      XYZ Institute
                                    </p>
                                    <p className="font-medium text-sm text-[#667085] 2xl:w-[80%] w-[75%]">
                                      2022 Mar - 2022 December (8 Months)
                                      Colombo, Sri Lanka
                                    </p>
                                  </div>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className=" relative">
                <div className="  py-5  2xl:pl-[8rem] pl-[6rem] 2xl:pr-[2rem] pr-[1rem] relative ">
                  <div className=" flex justify-between">
                    <div className="font-semibold text-md text-gray-500">
                      {agents.length} Available
                    </div>
                    {sortedBy.length > 0 && (
                      <>
                        <div className="font-semibold text-md text-gray-500 text flex gap-2 items-center">
                          Sort By :{" "}
                          <span className="text-[#1D2939]">
                            <div className="gap-2 flex justify-between items-center z-30 ">
                              {sortedBy.map((sort, index) => (
                                <div key={index}>
                                  {" "}
                                  {index === sortedBy.length - 1
                                    ? sort
                                    : `${sort}, `}
                                </div>
                              ))}
                              {/* <div>Relevance</div> */}

                              {/* <div>
                            <Image
                              src={"/images/live/drop.png"}
                              className="my-1"
                              alt="drop"
                              width={12}
                              height={12}
                            />
                          </div> */}
                            </div>
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="relative grid grid-cols-3  gap-4 h-auto">
                    {agents.map((agent, index) => (
                      <div
                        key={index}
                        className="border-[1px] border-gray-200 h-auto hover:shadow-md bg-white rounded-xl mt-4  flex justify-between p-3"
                      >
                        <div className=" flex justify-start items-start w-1/3 relative rounded-lg bg-gray-200 ">
                          {agent?.image_url != "" ? (
                            <img
                              src={agent?.image_url}
                              className=" w-full h-full rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-start w-full h-full">
                              User Image
                            </div>
                          )}

                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-gray-600 rounded-[50%]">
                            <Image
                              onClick={() => triggerOpenVideo(agent)}
                              src={"/images/settings/playBtn.svg"}
                              alt="play Button"
                              width={48}
                              height={48}
                            />
                          </div>
                        </div>

                        <div className="px-2 items-start w-2/3">
                          <div className=" flex justify-between items-center pb-2">
                            <div>
                              <p className="font-bold ">
                                {fullName(agent?.firstname, agent?.lastname)}
                              </p>
                              <p className="2xl:text-sm text-xs text-gray-500">
                                {agent?.city},{agent?.country}
                              </p>
                              <p className="font-bold 2xl:text-xl text-sm mt-1 mb-1">
                                <Badge
                                  backgroundColor="#F2F4F7"
                                  borderRadius={4}
                                  color="#344054"
                                  hoverColor="#F2F4F7"
                                  text={agent.exp_level}
                                  width={150}
                                  height={20}
                                  fontSize="12px"
                                />
                              </p>
                            </div>
                            <div>
                              <p className="font-bold 2xl:text-lg  text-right">
                                {agent?.total_earnings > 0 ? (
                                  <div> $ {agent?.total_earnings} / month </div>
                                ) : (
                                  <div>$ 0 / Month</div>
                                )}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className=" text-gray-500  2xl:text-sm text-xs py-2">
                              {agent?.about != "" ? (
                                <div> {agent?.about} </div>
                              ) : (
                                <div>Agent Bio.. </div>
                              )}
                            </p>
                          </div>
                          <div className="flex justify-start items-center gap-2 py-2">
                            <Avatar
                              border="1px"
                              borderRadius="50%"
                              height="24px"
                              image={getCountryLogo(agent?.country)}
                              width="24px"
                            />
                            <img src="../../images/live/star.png" />
                            <p className=" 2xl:text-lg  text-sm">
                              {agent?.rating > 0 ? (
                                <div>
                                  {" "}
                                  {agent?.rating}{" "}
                                  {/* {agent.reviews ? (
                                    <> ({agent.reviews})</>
                                  ) : (
                                    <>(0)</>
                                  )}{" "} */}
                                </div>
                              ) : (
                                <div>0.0</div>
                              )}
                            </p>
                          </div>
                          <div className=" justify-between items-center flex ">
                            <div className=" justify-start items-start">
                              <p className=" text-gray-500  text-sm ">
                                Sessions
                              </p>
                              <p className="font-bold 2xl:text-xl text-sm">
                                {agent?.completed_sessions > 0 ? (
                                  <div> {agent?.completed_sessions} </div>
                                ) : (
                                  <div>0</div>
                                )}
                              </p>
                            </div>
                            <div className="flex justify-center gap-2">
                              <div>
                                <Button
                                  alignItems="center"
                                  background="#ffffff"
                                  border="1px solid"
                                  borderColor="#D0D5DD"
                                  borderRadius="8px"
                                  color="black"
                                  direction="row"
                                  disabledColor="#D0D5DD"
                                  display="flex"
                                  flexDirection="row"
                                  focusColor="#D0D5DD"
                                  fontSize="14px"
                                  gap="8px"
                                  hoverColor="#1018280D"
                                  justifyContent="center"
                                  label="Hire"
                                  size="sm"
                                  onClick={() => handleFormHire(agent)}
                                  disabled={!agent?.available}
                                />
                              </div>
                              {showFormHire ? (
                                <>
                                  <div className=" !bg-opacity-75 w-screen h-[85vh] top-0 right-0 absolute ">
                                    <div className=" justify-center items-center flex bg-black/5 h-[85vh]">
                                      <div className="w-auto h-auto bg-white rounded-2xl  z-50">
                                        <div className=" p-3">
                                          <p className="font-regular text-gray-700  2xl:text-lg text-base  "></p>
                                        </div>

                                        <div className="border-b-2"></div>
                                        <div className="2xl:p-3 p-2">
                                          <p className="text-sm text-[#344054] font-normal">
                                            Your name
                                          </p>
                                          <div className="pt-2">
                                            <InputPlain
                                              alignItems="center"
                                              alignment="left"
                                              background="#FFFFFF"
                                              border="1px solid #EBECF0"
                                              borderRadius="8px"
                                              boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                                              color="#667085"
                                              disabledBackgroundColor="#EBECF0"
                                              display="flex"
                                              flexDirection="row"
                                              height="44px"
                                              padding="10px 8px"
                                              placeholder="Enter your name"
                                              type="text"
                                              width="500px"
                                              value={inquiryUserName}
                                              onChange={(e) =>
                                                setInquiryUserName(e)
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className="2xl:p-3 p-2  flex gap-4">
                                          <div>
                                            <p className="text-sm text-[#344054] font-normal">
                                              Contact Number
                                            </p>
                                            <div className="pt-2">
                                              <InputPlain
                                                alignItems="center"
                                                alignment="left"
                                                background="#FFFFFF"
                                                border="1px solid #EBECF0"
                                                borderRadius="8px"
                                                boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                                                color="#667085"
                                                disabledBackgroundColor="#EBECF0"
                                                display="flex"
                                                flexDirection="row"
                                                height="44px"
                                                padding="10px 8px"
                                                placeholder="098765432"
                                                type="text"
                                                value={inquiryUserPhone}
                                                onChange={(e) =>
                                                  setInquiryUserPhone(e)
                                                }
                                                // width="500px"
                                              />
                                            </div>
                                          </div>
                                          <div>
                                            <p className="text-sm text-[#344054] font-normal">
                                              Email
                                            </p>
                                            <div className="pt-2">
                                              <InputPlain
                                                alignItems="center"
                                                alignment="left"
                                                background="#FFFFFF"
                                                border="1px solid #EBECF0"
                                                borderRadius="8px"
                                                boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                                                color="#667085"
                                                disabledBackgroundColor="#EBECF0"
                                                display="flex"
                                                flexDirection="row"
                                                fontSize="12px"
                                                height="44px"
                                                padding="10px 8px"
                                                placeholder="hello@youremailhere.com"
                                                type="text"
                                                value={inquirUserEmail}
                                                onChange={(e) =>
                                                  setInquiryUserEmail(e)
                                                }
                                                // width="500px"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className=" 2xl:m-3 m-2 border-[1px] border-[#D0D5DD] rounded-lg bg-[#F9FAFB]">
                                          <div className="2xl:p-3 p-2 flex gap-3 ">
                                            <div>
                                              <p className="text-sm text-[#344054] font-normal">
                                                Day
                                              </p>
                                              <div className="pt-2">
                                                <CustomDatePicker
                                                  onSelectDate={
                                                    handleDateSelect
                                                  }
                                                />
                                              </div>
                                            </div>
                                            <div>
                                              <p className="text-sm text-[#344054] font-normal">
                                                Duration
                                              </p>

                                              <div className="pt-2">
                                                <Dropdown
                                                  background="#ffffff"
                                                  border="1px solid #D0D5DD"
                                                  borderRadius="8px"
                                                  color="rgba(0, 0, 0, 1)"
                                                  height="44px"
                                                  // onSelect={function noRefCheck() {}}
                                                  optionStyles={{
                                                    borderRadius: "10px",
                                                    color: "black",
                                                    width: "350px",
                                                  }}
                                                  options={[
                                                    {
                                                      label: "15 mins",
                                                      name: "15 mins",
                                                    },
                                                    {
                                                      label: "30 mins",
                                                      name: "30 mins",
                                                    },
                                                    {
                                                      label: "45 mins",
                                                      name: "45 mins",
                                                    },
                                                    {
                                                      label: "60 mins",
                                                      name: "60 mins",
                                                    },
                                                  ]}
                                                  // selectedValue="10 mins"
                                                  onSelect={(e) => {
                                                    setInquiryDuration(
                                                      e.target.value
                                                    );
                                                  }}
                                                  selectedValue={
                                                    inquiryDuration
                                                  }
                                                  labelKey="label"
                                                  valueKey="name"
                                                  width="100%"
                                                  outline="0"
                                                />
                                              </div>
                                            </div>
                                            <div>
                                              <p className="text-sm text-[#344054] font-normal">
                                                From
                                              </p>
                                              <div className="pt-2">
                                                <TimeInput
                                                  onSelectTime={
                                                    handleTimeSelect
                                                  }
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="p-3">
                                            <p className="text-sm text-[#344054] font-normal">
                                              Timezone
                                            </p>
                                            <TimezoneSelect
                                              value={selectedTimezone}
                                              className="pt-2 "
                                              onChange={setSelectedTimezone}
                                            />
                                          </div>
                                          <div className="p-3">
                                            <p className="text-sm text-[#344054] font-normal">
                                              Message
                                            </p>
                                            <textarea
                                              className="w-full bg-white outline-none border-2 border-gray-200 px-2  rounded-md mt-2"
                                              rows={4}
                                              placeholder="Write your message for seller"
                                              onChange={(e) =>
                                                setMessage(e.target.value)
                                              }
                                            />
                                          </div>
                                        </div>

                                        <div className=" items-end flex gap-4 justify-end 2xl:p-3 p-2">
                                          <Button
                                            alignItems="center"
                                            background="#ffffff"
                                            border="1px solid"
                                            borderColor="#D0D5DD"
                                            borderRadius="8px"
                                            color="#000000"
                                            direction="row"
                                            disabledColor="#D0D5DD"
                                            display="flex"
                                            flexDirection="row"
                                            focusColor="#D0D5DD"
                                            fontSize="14px"
                                            fontWeight="500"
                                            gap="8px"
                                            hoverColor="#D0D5DD30"
                                            justifyContent="center"
                                            label="Cancel"
                                            size="md"
                                            onClick={hideFormHire}
                                          />

                                          <Button
                                            alignItems="center"
                                            background="#7F56D9"
                                            border="1px solid"
                                            borderColor="#7F56D9"
                                            borderRadius="8px"
                                            color="white"
                                            direction="row"
                                            disabledColor="#E9D7FE"
                                            display="flex"
                                            flexDirection="row"
                                            focusColor="#F4EBFF"
                                            fontSize="14px"
                                            fontWeight="500"
                                            gap="8px"
                                            hoverColor="#5C3DA7"
                                            justifyContent="center"
                                            label="Send Message"
                                            size="md"
                                            onClick={() =>
                                              sendMessage(agent?.agent_id)
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : null}
                              <div onClick={() => handleModal(agent?.id)}>
                                <Button
                                  alignItems="center"
                                  background="#ffffff"
                                  border="1px solid"
                                  borderColor="#D0D5DD"
                                  borderRadius="8px"
                                  color="black"
                                  direction="row"
                                  disabledColor="#D0D5DD"
                                  display="flex"
                                  flexDirection="row"
                                  focusColor="#D0D5DD"
                                  fontSize="14px"
                                  gap="8px"
                                  hoverColor="#1018280D"
                                  icon="faUseroutlined"
                                  iconColor="#000000"
                                  iconPosition="trailing"
                                  iconSize="16px"
                                  justifyContent="center"
                                  label="View"
                                  size="sm"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {agents.length == 0 && (
                    <div>
                      <NoDataCardTable
                        cardHeight={`2xl:h-[77vh] h-[74vh]`}
                        message="No Agents"
                      />
                    </div>
                  )}
                </div>
              </div>

              {openVideo && (
                <div className="fixed top-0 bottom-0 z-40 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                  <div className="p-5 ">
                    <VideoModalAgent
                      onClose={onClose}
                      Height="50vh"
                      videoLink={openedVideo}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LiveSellers;
