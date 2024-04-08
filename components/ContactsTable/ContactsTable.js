// ContactsTable.js
import {
  Avatar,
  AvatarIntials,
  Button,
  MouseOver,
} from "@creativehub/marketrix-ui";
import React, { useEffect, useState } from "react";

 
function ContactsTable({
  setIsDeleteContactsOpen,
  setIsEditContactsOpen,
  contacts,
}) {
  const [contactsState, setContactsState] = useState(contacts);
  const handleRowHover = (index, isHovered) => {
    const updatedTableData = [...contacts];
    updatedTableData[index].isHovered = isHovered;
    setContactsState(updatedTableData);
  };

  const handleEditClick = (contact) => {
    console.log("contact", contact);
    setIsEditContactsOpen(true);
  };
  const handleDeleteClick = () => {
    setIsDeleteContactsOpen(true);
  };

  return (
    <div className="border border-gray-300 rounded-lg !font-medium">
      <table className="min-w-full rounded-lg">
        <thead>
          <tr className=" text-[#667085] mtx-subtitle2 !font-normal hover:bg-gray-200 bg-[#F9FAFB] rounded-lg ">
            <th className="p-2 text-left ">Name</th>
            <th className="p-2 text-left ">Email</th>
            <th className="p-2 text-left ">Phone</th>
            <th className="p-2 text-left ">Job Title</th>
            <th className="p-2 text-left ">Company</th>
            <th className="p-2 text-left "></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => {
            return (
              <tr
                key={index}
                className={` cursor-pointer border-b border-gray-200 mtx-label text-[#667085] h-fixed ${
                  contact.isHovered ? "hover:bg-gray-200 " : ""
                }`}
                onMouseEnter={() => handleRowHover(index, true)}
                onMouseLeave={() => handleRowHover(index, false)}
              >
                <td className="p-2 flex items-center text-left">
                  {contact?.image_url != null ? (
                    <>
                      <Avatar
                        border="none"
                        borderRadius="50%"
                        height="24px"
                        image={contact.image_url}
                        width="24px"
                      />
                    </>
                  ) : (
                    <>
                      <AvatarIntials
                        background="#F9F5FF"
                        borderRadius="50%"
                        height="24px"
                        name={contact.firstname[0] + contact.lastname[0]}
                        width="24px"
                      />
                    </>
                  )}
                  <span className="ml-2 !font-semibold text-[#667085]">
                    {contact.firstname} {contact.lastname}
                  </span>
                </td>
                <td className="p-2 text-left cursor-pointer">
                  {contact.email}
                </td>
                <td className="p-2 text-left">{contact.contact_no}</td>
                <td className="p-2 text-left">{contact.designation}</td>
                <td className="p-2 text-left">
                  {contact.client_company_id} {contact.client_company_name}
                </td>
                <td className="p-2 text-left flex gap-2 min-w-[100px] justify-end ease-in duration-300">
                  {contact.isHovered && (
                    <>
                      <div className="relative ">
                        <MouseOver
                          alignItems="center"
                          background="#101828"
                          borderRadius="8px"
                          boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
                          color="#FFFFFF"
                          display="flex"
                          flexDirection="column"
                          fontSize="12px"
                          fontWeight="500px"
                          height="30px"
                          justifyContent="center"
                          lineHeight="18px"
                          padding="8px 8px"
                          position="absolute"
                          text="Edit"
                          textAlign="center"
                        >
                          <Button
                            alignItems="center"
                            border=""
                            borderRadius="8px"
                            color="#382e2e"
                            direction="row"
                            display="flex"
                            flexDirection="row"
                            focusColor="#F4EBFF"
                            fontSize="16px"
                            paddingLeft={2}
                            paddingRight={2}
                            icon="edit"
                            iconSize="16px"
                            justifyContent="center"
                            onClick={handleEditClick}
                          />
                        </MouseOver>
                      </div>
                      <div className="relative ">
                        <MouseOver
                          alignItems="center"
                          background="#101828"
                          borderRadius="8px"
                          boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
                          color="#FFFFFF"
                          display="flex"
                          flexDirection="column"
                          fontSize="12px"
                          fontWeight="500px"
                          height="30px"
                          justifyContent="center"
                          lineHeight="18px"
                          padding="8px 8px"
                          position="absolute"
                          text="Delete"
                          textAlign="center"
                        >
                          <Button
                            alignItems="center"
                            border=""
                            borderRadius="8px"
                            color="#382e2e"
                            direction="row"
                            display="flex"
                            flexDirection="row"
                            focusColor="#F4EBFF"
                            fontSize="16px"
                            paddingLeft={2}
                            paddingRight={2}
                            icon="Delete"
                            iconSize="16px"
                            justifyContent="center"
                            onClick={handleDeleteClick}
                          />
                        </MouseOver>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ContactsTable;
