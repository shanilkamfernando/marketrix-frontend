// LiveWizardStep.js
import React, { useEffect, useContext, useState } from "react";
//COMPONENTS
import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import CompaniesTable from "@/components/CompaniesTable/CompaniesTable";
import EditCompany from "@/components/Popouts/CompaniesPopouts/EditCompany";
import ContactsNavBar from "@/components/SideNavBar/ContactsNavBar/ContactsNavBar";
import DeleteContact from "@/components/Popouts/DeletePopout";
import MLiveHeader from "@/components/MLiveHeader/MLiveHeader";
import AddCompany from "@/components/Popouts/CompaniesPopouts/AddCompany";
import NotAvailble from "@/components/NotAvailableOverlay/NotAvailable";
//API
import CompanyApi from "../../api/admin/companies";
import { AuthContext } from "@/auth/authContext";

function Companies() {
  // const [company, setCompany] =  useState({} as )
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
  const [isEditCompanyOpen, setIsEditCompanyOpen] = useState(false);
  const [isDeleteCompanyOpen, setIsDeleteCompanyOpen] = useState(false);
  const [companies, setCompaniesData] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState("contact");
  const [screenStatus, setScreenStatus] = useState(true);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check if the key pressed is the "Enter" key (key code 13)
      if (event.keyCode === 88) {
        setScreenStatus(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
  }, []);

  const closeDeleteContactModal = () => {
    setIsDeleteCompanyOpen(false);
  };

  const closeEditContactModal = () => {
    setIsEditCompanyOpen(false);
  };

  const closeAddCompanyModal = () => {
    setIsAddCompanyOpen(false);
  };

  const getCompanies = async () => {
    let contacts = await getCompaniesCall(); // get companies

    //console.log("getCompanies" , contacts)
    setCompaniesData(contacts);
  };

  const getCompaniesCall = async () => {
    const response = await CompanyApi.get_company();
    if (response?.data) {
      return response?.data;
    } else {
      return [];
    }
  };

  useEffect(() => {
    getCompanies(); // get incoming and ongoing inquiries
  }, []);

  const [selectedButton, setSelectedButton] = useState("Companies");

  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null; // Or show some loading/error message when the context is not available yet.
  }
  const { isLoggedIn, packageName, proStatus } = authContext;

  return (
    <>
      {isLoggedIn && (
        <div className="flex w-full h-screen relative">
          <NotAvailble
            loading={screenStatus}
            messageOveraly="Coming soon"
            position="left-[20%] w-[80%] bg-gray-200"
          />

          {/* {packageName === "free" && (
            <>
              <NotAvailble
                loading={screenStatus}
                messageOveraly="Coming soon.."
                position="left-[0%] w-[100%] bg-gray-100"
              />
            </>
          )} */}

          <div className="w-[5%] ">
            <IconSideNavBar
              selectedIcon={selectedIcon}
              setSelectedIcon={setSelectedIcon}
            />
          </div>
          <div className="w-[15%]">
            <ContactsNavBar
              contactsAmount={"8"}
              companiesAmount={"6"}
              selectedButton={selectedButton}
              setSelectedButton={setSelectedButton}
            />
          </div>
          <div className="w-[80%] overflow-auto scrollbar-hide ">
            <div className=" w-[100%] p-[1rem] ">
              <div className="">
                <MLiveHeader
                  buttonName={"New company"}
                  buttonIcon={"plus"}
                  buttonFunction={() => setIsAddCompanyOpen(true)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 pr-[0.2rem] overflow-y-auto ">
              <div className=" px-[1rem] ">
                <div className="w-[100%] ">
                  <CompaniesTable
                    setIsDeleteCompanyOpen={setIsDeleteCompanyOpen}
                    setIsEditCompanyOpen={setIsEditCompanyOpen}
                    companies={companies}
                  />
                  {isAddCompanyOpen && (
                    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                      <div className="p-5">
                        <AddCompany
                          onClose={closeAddCompanyModal}
                          companyName={""}
                          website_url={""}
                          company_address={""}
                        />
                      </div>
                    </div>
                  )}
                  {isEditCompanyOpen && (
                    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                      <div className="p-5 ">
                        <EditCompany onClose={closeEditContactModal} />
                      </div>
                    </div>
                  )}
                  {isDeleteCompanyOpen && (
                    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                      <div className="p-5">
                        <DeleteContact
                          onClose={closeDeleteContactModal}
                          deleteName={"company"}
                          Name={"ABC Company"}
                          email={"abccompany.com"}
                          logoImage={"/images/mainLogoBlack.svg"}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Companies;
