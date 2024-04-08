import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Button,
  Avatar,
  AvatarIntials,
  Toggle,
  Badge,
} from "@creativehub/marketrix-ui";
import {
  addSpace,
  formatTime,
  getFormattedDate,
  getFormattedTimeHM,
} from "@/helpers/helpers";
import Link from "next/link";
import { updateActiveUsers, selectActionTrigger } from "@/store/actionSlice";
import { useDispatch, useSelector } from "react-redux";
import { loadState, loadStateSession } from "@/store/localStorage";
import MarketrixLive from "../MarketrixLive/MarketrixLive";

// interface TeamSettingsProps {
//   setIsAddMemberOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   setIsUpdateMemberOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   setIsDeleteMemberOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   adminUsers: any;
//   teamMembers: any;
//   selectedUserForUpdate: any;
//   selectedUserForDelete: any;
//   isAdmin: boolean;
// }

function TeamSettingsPage({
  setIsAddMemberOpen,
  setIsDeleteMemberOpen,
  setIsUpdateMemberOpen,
  adminUsers,
  teamMembers,
  selectedUserForUpdate,
  selectedUserForDelete,
  isAdmin,
  statusUpdate,
}) {
  const [avatarSrc, setAvatarSrc] = useState(
    "https://xsgames.co/randomusers/avatar.php?g=male"
  );

  const handleFileUpload = (base64Image) => {
    setAvatarSrc(base64Image);
  };

  const [activeUsers, setActiveUsers] = useState(0);
  const trigger = useSelector(selectActionTrigger);
  const [admins, setAdmins] = useState([]);
  const [team, setTeam] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const logged_in_email = loadState("logged_in_email");
    // console.log("logged_in_email_____________", logged_in_email);

    let foundAdmin = adminUsers.find((obj) => {
      // Assuming the objects have the same properties and values
      return obj.email === logged_in_email;
    });

    // Check if the object is found
    if (foundAdmin) {
      // console.log("Object foundAdmin:", foundAdmin);
      const index = adminUsers.indexOf(foundAdmin);
      if (index !== -1) {
        adminUsers.splice(index, 1);

        // Unshift the found object to the beginning of the array
        //        foundAdmin.firstname = foundAdmin.firstname + " (You) ";
        adminUsers.unshift(foundAdmin);
        setAdmins(adminUsers);
        //    console.log("Updated teamMembers:", adminUsers);
      }
    } else {
      setAdmins(adminUsers);
      //    console.log("Object not foundAdmin");
    }
  }, [adminUsers]);

  useEffect(() => {
    const logged_in_email = loadState("logged_in_email");
    //console.log("logged_in_email_____________", logged_in_email);

    let foundTeamMember = teamMembers.find((obj) => {
      // Assuming the objects have the same properties and values
      return obj.email === logged_in_email;
    });

    // Check if the object is found
    if (foundTeamMember) {
      //console.log("Object foundTeamMember:", foundTeamMember);
      // Remove the found object from its current position
      const index = teamMembers.indexOf(foundTeamMember);
      if (index !== -1) {
        teamMembers.splice(index, 1);

        // Unshift the found object to the beginning of the array
        //        foundTeamMember.firstname = foundTeamMember.firstname + " (You) ";
        teamMembers.unshift(foundTeamMember);
        setTeam(teamMembers);
        // console.log("Updated teamMembers:", teamMembers);
      }
    } else {
      setTeam(teamMembers);
      // console.log("Object not foundTeamMember");
    }
  }, [teamMembers]);

  const checkOnlineUsers = () => {
    const data = loadStateSession("activeUsers");
    if (data) {
      // Update online status based on emails in array1
      console.log("activeUsers______________", data);

      adminUsers.forEach((obj2) => {
        data.forEach((obj1) => {
          if (obj2.email === obj1.email) {
            console.log("obj2_____:", obj2);
            obj2.online = true;
          }
        });
      });

      teamMembers.forEach((obj2) => {
        data.forEach((obj1) => {
          if (obj2.email === obj1.email) {
            console.log("obj2_____:", obj2);
            obj2.online = true;
          }
        });
      });
      setActiveUsers(data);
    }
  };
  useEffect(() => {
    checkOnlineUsers();
  }, []);

  useEffect(() => {
    checkOnlineUsers();
    dispatch(updateActiveUsers(false));
  }, [trigger.updateActiveUsersTriggered]);

  return (
    <div className="w-[100%]">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between ">
          <div className=" flex flex-col !font-Semibold mtx-h6 mb-2 pl-2">
            My Team
            <div className="!font-normal mtx-subtitle2">
              Manage your members and their account permissions here
            </div>
          </div>
          {/* {
            isAdmin && (<div>
              Hiii!
            </div>)
          } */}
          {isAdmin && (
            <div className=" flex gap-4 items-center">
              <div className="flex items-center gap-3">
                <MarketrixLive />
                <Link href={"/Dashboard/MLivePages/LiveSellers"}>
                  <Button
                    alignItems="center"
                    background="white"
                    border="1px solid"
                    borderColor="#D0D5DD"
                    color="#667085"
                    gap="10px"
                    direction="row"
                    disabledColor="#E9D7FE"
                    display="flex"
                    fontSize="14px"
                    fontWeight="500"
                    flexDirection="row"
                    focusColor="#F4EBFF"
                    hoverColor="#F3F4F6"
                    icon="searchIcon"
                    iconMargin={12}
                    iconPosition="leading"
                    justifyContent="center"
                    label="Hire a Marketrix Agent"
                    size="sm"
                    // onClick={setIsAddMemberOpen}
                  />
                </Link>
              </div>
              <div>
                <Button
                  alignItems="center"
                  background="white"
                  border="1px solid"
                  borderColor="#D0D5DD"
                  color="#667085"
                  gap="10px"
                  direction="row"
                  disabledColor="#E9D7FE"
                  display="flex"
                  fontSize="14px"
                  fontWeight="500"
                  flexDirection="row"
                  focusColor="#F4EBFF"
                  hoverColor="#F3F4F6"
                  icon="plus"
                  iconMargin={12}
                  iconPosition="leading"
                  justifyContent="center"
                  label="Add team member"
                  size="sm"
                  onClick={setIsAddMemberOpen}
                />
              </div>
            </div>
          )}
        </div>
        <div className="border-b-[0.5px]"></div>

        <div className="flex !font-medium mtx-body2 p-2 ">
          <div className="flex flex-row justify-between items-start w-full ">
            {/* <div className="flex flex-col items-start  w-[20%] bg-red-300">
              <div className="mtx-body2 !font-semibold pb-2">Admin Users</div>

              <div className="flex mtx-body2 text-[#667085] ">
                Admin can add and remove users and manage organization-level
                settings
              </div>
            </div> */}
            <div className=" w-[100%] ">
              {team.length > 0 && (
                <>
                  {" "}
                  <div className="rounded-lg overflow-hidden border items-start !font-normal">
                    <table className=" w-full ">
                      <thead>
                        <tr className="bg-gray-100 !font-normal 2xl:text-[13px] text-[12px] text-[#667085]">
                          <th className="p-4 text-left  w-[30%]">NAME</th>
                          <th className="p-4 text-center  w-[30%]">
                            DATE ADDED
                          </th>
                          <th className="p-4 text-center  w-[20%]">
                            LAST SEEN
                          </th>
                          {/* <th className="p-4 text-center  w-[10%]">
                        COMPLETED SESSIONS
                      </th>
                      <th className="p-4 text-center  w-[10%]">
                        ACCOUNT STATUS
                      </th> */}
                          <th className="p-4 text-center  w-[10%]">
                            ACTIVE STATUS
                          </th>
                          <th className="p-4 text-center w-[5%]"></th>
                          <th className="p-4 text-center w-[5%]"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {team.map((user, index) => {
                          return (
                            <tr key={index} className="border-t">
                              <td className="p-2 whitespace-nowrap">
                                <div className="flex items-center  w-[100%]  gap-2 ">
                                  {/* {user.image_url} */}
                                  {/* <Avatar
                                border="none"
                                borderRadius="50%"
                                height="40px"
                                image="https://picsum.photos/300/300?random=1"
                                width="40px"
                              />
                              <Avatar
                                border="none"
                                borderRadius="100%"
                                height="40px"
                                image={user.image_url}
                                width="40px" /> */}
                                  <div>
                                    {user.image_url ? (
                                      <>
                                        <Avatar
                                          border="none"
                                          borderRadius="100%"
                                          height="40px"
                                          image={user.image_url}
                                          width="40px"
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <AvatarIntials
                                          background="#F9F5FF"
                                          borderRadius="100%"
                                          color="#7F56D9"
                                          fontSize="16px"
                                          height="40px"
                                          name={user.firstname || user.email}
                                          width=" 40px"
                                        />
                                      </>
                                    )}
                                  </div>

                                  <div className=" ">
                                    <div className=" flex gap-3 items-center">
                                      <div className="text-[#344054] font-medium text-[14px]">
                                        {user.firstname}
                                      </div>
                                      <div>
                                        <Badge
                                          backgroundColor="#F9F5FF"
                                          borderRadius={16}
                                          color="#6941C6"
                                          fontSize="12px"
                                          hoverColor="#00FF00"
                                          text={addSpace(user.roleName)}
                                        />
                                      </div>
                                    </div>

                                    <div className="text-[#667085] text-[14px] font-normal ">
                                      {user.email}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="p-4 whitespace-nowrap text-center text-[#667085]">
                                {getFormattedDate(user.createdAt)}
                              </td>
                              <td className="p-4 whitespace-nowrap text-center text-[#667085]">
                                {getFormattedDate(user.updatedAt)}
                              </td>

                              {/* <td className="p-4 whitespace-nowrap  text-center text-[#667085]">
                            40
                          </td> */}
                              {/* account status */}
                              {/* 
                          <td>
                            <div className="flex justify-center">
                              <Toggle onChange={() => {}} />
                            </div>
                          </td> */}
                              <td className="text-center  flex justify-center p-4">
                                {user.online ? (
                                  <>
                                    {" "}
                                    <Badge
                                      backgroundColor="#ECFDF3"
                                      borderRadius={16}
                                      color="#FF3232"
                                      hoverColor="#00FF00"
                                      // text={salesTagName}
                                      text={"Online"}
                                    />
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    <Badge
                                      backgroundColor="#FFE5E5"
                                      borderRadius={16}
                                      color="#FF0000"
                                      hoverColor="#00FF00"
                                      // text={salesTagName}
                                      text={"Offline"}
                                    />
                                  </>
                                )}
                                {/* <Badge
                              backgroundColor="#ECFDF3"
                              borderRadius={16}
                              color="#027A48"
                              hoverColor="#00FF00"
                              // text={salesTagName}
                              text={"Online"}
                            /> */}
                              </td>
                              <td className=" text-center">
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
                                  justifyContent="center"
                                  iconSize={"20px"}
                                  onClick={() => {
                                    selectedUserForDelete(user); // Set the user for deletion
                                    setIsDeleteMemberOpen(true); // Show the delete modal
                                  }}
                                />
                              </td>
                              <td className="">
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
                                  justifyContent="center"
                                  iconSize={"20px"}
                                  onClick={() => {
                                    selectedUserForUpdate(user); // Set the user for update
                                    setIsUpdateMemberOpen(true); // Show the update modal
                                  }}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>{" "}
                </>
              )}
            </div>
          </div>
        </div>

        <>
          <div className="flex !font-medium mtx-body2 p-2  ">
            <div className="flex flex-col justify-center items-start w-full ">
              <div className="mtx-body2 !font-semibold pb-3  w-full">
                Admins
              </div>

              <div className=" w-[100%]">
                <div className="rounded-lg overflow-hidden border !font-normal">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100 !font-normal mtx-label text-[#667085]">
                        <th className="p-4 text-left w-[50%]]">NAME</th>
                        <th className="p-4 text-center  w-[15%]">DATE ADDED</th>
                        <th className="p-4 text-center w-[15%]">LAST SEEN</th>
                        <th className="p-4 text-left w-[10%]">ACTIVE STATUS</th>
                        <th className="p-4 text-left w-[5%]"></th>
                        <th className="p-4 text-left w-[5%]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {admins.map((user, index) => {
                        return (
                          <tr key={index} className="border-t">
                            <td className="p-2 whitespace-nowrap ">
                              <div className="flex items-center  gap-2">
                                <div>
                                  {user.image_url ? (
                                    <>
                                      <Avatar
                                        border="none"
                                        borderRadius="100%"
                                        height="40px"
                                        image={user.image_url}
                                        width="40px"
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <AvatarIntials
                                        background="#F9F5FF"
                                        borderRadius="100%"
                                        color="#7F56D9"
                                        fontSize="16px"
                                        height="40px"
                                        name={user.firstname || user.email}
                                        width=" 40px"
                                      />
                                    </>
                                  )}
                                </div>

                                <div className="">
                                  <div className="">
                                    <div className="text-[#344054] font-medium text-[14px]">
                                      {user.firstname}
                                    </div>
                                    <div className=" text-[#667085] text-[14px] font-normal ">
                                      {user.email}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 items-center">
                              <div className=" flex justify-center text-[#667085]">
                                {getFormattedDate(user.createdAt)}
                                {/* <Toggle onChange={() => {}} /> */}
                                {/* <Checkbox
                              // onChange={undefined}
                              // value={undefined}
                              // backgroundColor={undefined}
                              /> */}
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex justify-center text-[#667085] ">
                                {" "}
                                {getFormattedDate(user.updatedAt)}
                                {/* <Toggle onChange={() => {}} /> */}
                                {/* <Checkbox
                              // onChange={undefined}
                              // value={undefined}
                              // backgroundColor={'#F9F5FF'}
                              /> */}
                              </div>
                            </td>
                            <td className="p-4 flex justify-center items-center">
                              {" "}
                              {user.online ? (
                                <>
                                  {" "}
                                  <Badge
                                    backgroundColor="#ECFDF3"
                                    borderRadius={16}
                                    color="#027A48"
                                    hoverColor="#00FF00"
                                    // text={salesTagName}
                                    text={"Online"}
                                  />
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <Badge
                                    backgroundColor="#FFE5E5"
                                    borderRadius={16}
                                    color="#FF0000"
                                    hoverColor="#00FF00"
                                    // text={salesTagName}
                                    text={"Offline"}
                                  />
                                </>
                              )}
                              {/* <Badge
                                backgroundColor="#ECFDF3"
                                borderRadius={16}
                                color="#027A48"
                                hoverColor="#00FF00"
                                // text={salesTagName}
                                text={"Online"}
                              /> */}
                            </td>
                            <td className="p-4">
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
                                justifyContent="center"
                                iconSize={"20px"}
                                onClick={() => {
                                  selectedUserForDelete(user); // Set the user for deletion
                                  setIsDeleteMemberOpen(true); // Show the delete modal
                                }}
                              />
                            </td>
                            <td className="p-4">
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
                                onClick={() => {
                                  selectedUserForUpdate(user); // Set the user for update
                                  setIsUpdateMemberOpen(true); // Show the update modal
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>

        {/* <div className="flex !font-medium mtx-body2 p-2">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex items-center"></div>
            <div className="flex flex-row gap-4">
              <Button
                alignItems="center"
                background="white"
                border="1px solid"
                borderColor="#D0D5DD"
                borderRadius="8px"
                color="#344054"
                hoverColor="#F3F4F6"
                direction="row"
                display="flex"
                flexDirection="row"
                fontSize="14px"
                fontWeight="500"
                gap="8px"
                justifyContent="center"
                label="Cancel"
                size="custom"
                paddingLeft={15}
                paddingBottom={5}
                paddingTop={5}
                paddingRight={15}
              />
              <Button
                alignItems="center"
                background="#7F56D9"
                hoverColor="#6941C6"
                border="1px solid"
                borderColor="#7F56D9"
                borderRadius="8px"
                color="white"
                direction="row"
                display="flex"
                flexDirection="row"
                fontSize="14px"
                fontWeight="500"
                gap="8px"
                justifyContent="center"
                label="Save"
                size="custom"
                paddingLeft={35}
                paddingBottom={5}
                paddingTop={5}
                paddingRight={35}
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default TeamSettingsPage;
