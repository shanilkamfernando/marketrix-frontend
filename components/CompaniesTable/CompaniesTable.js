// CompanyTable.js
import {
  Avatar,
  AvatarIntials,
  Button,
  MouseOver,
} from "@creativehub/marketrix-ui";
import React, { useState } from "react";


function CompanyTable({
  setIsDeleteCompanyOpen,
  setIsEditCompanyOpen,
  companies,
}) {
  const [companiesState, setCompaniesState] = useState(companies);

  const handleRowHover = (index, isHovered) => {
    const updatedCompanies = [...companiesState];
    updatedCompanies[index].isHovered = isHovered;
    setCompaniesState(updatedCompanies);
  };

  const handleEditClick = () => {
    setIsEditCompanyOpen(true);
  };
  const handleDeleteClick = () => {
    setIsDeleteCompanyOpen(true);
  };

  return (
    <div className="border border-gray-300 rounded-lg !font-medium">
      <table className="min-w-full  ">
        <thead>
          <tr className=" text-[#667085] mtx-subtitle2 !font-normal hover:bg-gray-200 ">
            <th className="p-2 text-left bg-[#F9FAFB]">Company Name</th>
            <th className="p-2 text-left bg-[#F9FAFB]">Industry</th>
            <th className="p-2 text-left bg-[#F9FAFB]">Website</th>
            <th className="p-2 text-left bg-[#F9FAFB]">Company Size</th>
            <th className="p-2 text-left bg-[#F9FAFB]">Address</th>
            <th className="p-2 text-left bg-[#F9FAFB]">Country</th>
            <th className="p-2 text-left bg-[#F9FAFB]"></th>
          </tr>
        </thead>
        <tbody>
          {companiesState.map((company, index) => {
            return (
              <tr
                key={index}
                className={`border-b border-gray-200 mtx-label text-[#667085] h-fixed ${
                  company?.isHovered ? "hover:bg-gray-200" : ""
                }`}
                onMouseEnter={() => handleRowHover(index, true)}
                onMouseLeave={() => handleRowHover(index, false)}
              >
                <td className="p-2 flex items-center text-left">
                  {company?.logo_url != null ? (
                    <>
                      <Avatar
                        border="none"
                        borderRadius="50%"
                        height="24px"
                        image={company?.logo_url}
                        width="24px"
                      />
                    </>
                  ) : (
                    <>
                      <AvatarIntials
                        background="#F9F5FF"
                        borderRadius="100%"
                        color="#7F56D9"
                        fontSize="16px"
                        height="24px"
                        name={company?.name}
                        width=" 24px"
                      />
                    </>
                  )}

                  <span className="ml-2 !font-semibold text-[#667085]">
                    {company?.name}
                  </span>
                </td>
                <td className="p-2 text-left ">{company?.industry}</td>
                <td className="p-2 text-left">{company?.website}</td>
                <td className="p-2 text-left">{company?.size}</td>
                <td className="p-2 text-left">{company?.address}</td>
                <td className="p-2 text-left">{company?.country}</td>

                <td className="p-2 text-left flex gap-2 min-w-[100px] justify-end ease-in duration-300">
                  {company?.isHovered && (
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
                            iconSize={"20px"}
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
                            iconSize={"20px"}
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

export default CompanyTable;
