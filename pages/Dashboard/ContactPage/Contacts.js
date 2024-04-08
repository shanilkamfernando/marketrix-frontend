import React, { useEffect, useContext, useState } from "react";

//COMPONENTS
import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import ContactsTable from "@/components/ContactsTable/ContactsTable";
import AddContacts from "@/components/Popouts/ContactsPopouts/AddContacts";
import EditContact from "@/components/Popouts/ContactsPopouts/EditContact";
import DeleteContact from "@/components/Popouts/DeletePopout";
import MLiveHeader from "@/components/MLiveHeader/MLiveHeader";
import ContactsNavBar from "@/components/SideNavBar/ContactsNavBar/ContactsNavBar";
import NotAvailble from "../../../components/NotAvailableOverlay/NotAvailable.js";

import ClientApi from "../../api/admin/clients";

import { AuthContext } from "@/auth/authContext";

function Contacts() {
  const [isAddContactsOpen, setIsAddContactsOpen] = useState(false);
  const [isEditContactsOpen, setIsEditContactsOpen] = useState(false);
  const [isDeleteContactsOpen, setIsDeleteContactsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("contact");
  const [contacts, setContacts] = useState([]);
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
    setIsDeleteContactsOpen(false);
  };

  const closeEditContactModal = () => {
    setIsEditContactsOpen(false);
  };
  const closeAddContactModal = () => {
    setIsAddContactsOpen(false);
  };

  const getContacts = async () => {
    let contacts = await getContactsCall(); // get contacts

    //console.log("getContacts" , contacts)
    setContacts(contacts);
  };
  const getContactsCall = async () => {
    const response = await ClientApi.get_client();
    if (response?.data) {
      return response?.data;
    } else {
      return [];
    }
  };

  useEffect(() => {
    getContacts(); // get incoming and ongoing inquiries
  }, []);

  const [selectedButton, setSelectedButton] = useState("Contacts");

  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null; // Or show some loading/error message when the context is not available yet.
  }
  const { isLoggedIn,packageName, proStatus } = authContext;
  return (
    <>
      {isLoggedIn && (
        <div className="flex w-full h-screen">
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
          <div className="w-[5%] bg-slate-800">
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
            <div className=" w-[100%] p-[1rem]  ">
              <div className="">
                <MLiveHeader
                  buttonName={"New contact"}
                  buttonIcon={"plus"}
                  buttonFunction={() => setIsAddContactsOpen(true)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1  pr-[0.2rem] overflow-y-auto">
              <div className=" px-[1rem] ">
                <div className="w-[100%] ">
                  <ContactsTable
                    setIsDeleteContactsOpen={setIsDeleteContactsOpen}
                    setIsEditContactsOpen={setIsEditContactsOpen}
                    contacts={contacts}
                  />
                  {isAddContactsOpen && (
                    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                      <div className="p-5">
                        <AddContacts onClose={closeAddContactModal} />
                      </div>
                    </div>
                  )}
                  {isEditContactsOpen && (
                    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                      <div className="p-5">
                        <EditContact onClose={closeEditContactModal} />
                      </div>
                    </div>
                  )}
                  {isDeleteContactsOpen && (
                    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                      <div className="p-5">
                        <DeleteContact
                          onClose={closeDeleteContactModal}
                          deleteName={"contact"}
                          Name={"Candice Wu from CreativeHub"}
                          email={"candice@untitledui.com"}
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

export default Contacts;
