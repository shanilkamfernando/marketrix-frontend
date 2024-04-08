import React, { useEffect, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import TeamNavBar from "@/components/SideNavBar/TeamNavBar/TeamNavBar";
import TeamSettingsPage from "@/components/TeamSettingsPage/TeamSettingsPage";
import NotAvailble from "@/components/NotAvailableOverlay/NotAvailable";
import { AuthContext } from "@/auth/authContext";
import DeleteMember from "@/components/Modals/TeamMemberModals/DeleteMember";
import AddMember from "@/components/Modals/TeamMemberModals/AddMember";
import UpdateMember from "@/components/Modals/TeamMemberModals/UpdateMember";
import UserApi from "../../api/admin/users";
import UserRolesApi from "../../api/admin/usersRoles";
import { loadingTriggered } from "@/store/actionSlice";

function Team() {
  const [gridView, setGridView] = useState(false);
  const [tableData, setTableData] = useState([]);
  const handleGridViewChange = (value) => {
    if (value === true) {
      setGridView(true);
    } else {
      setGridView(false);
    }
  };
  const [selectedUserForUpdate, setSelectedUserForUpdate] = useState(null);
  const [selectedUserForDelete, setSelectedUserForDelete] = useState(null);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isUpdateMemberOpen, setIsUpdateMemberOpen] = useState(false);
  const [isDeleteMemberOpen, setIsDeleteMemberOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [selectedButton, setSelectedButton] = useState("TeamPage");
  const [selectedIcon, setSelectedIcon] = useState("Team");
  const [screenStatus, setScreenStatus] = useState(true);
  const authContext = useContext(AuthContext);

  const dispatch = useDispatch();
  const getAllUsers = async () => {
    dispatch(loadingTriggered(true));
    let users = await UserApi.get_user().then((response) => {
      if (response.status) {
        dispatch(loadingTriggered(false));
        return response.data;
      } else {
        dispatch(loadingTriggered(false));
        return [];
      }
    });
    const adminUsers = users.filter((user) => user.roleName === "Admin");
    const teamMembers = users.filter((user) => user.roleName != "Admin");

    setAdminUsers(adminUsers);
    setTeamMembers(teamMembers);
    console.log("Admin Users", adminUsers);
    console.log("Team Members", teamMembers);
  };
  const getRoles = async () => {
    await UserRolesApi.get_roles().then((response) => {
      if (response.status) {
        setRoles(response.data);
      } else {
        setRoles([]);
      }
    });
  };

  const closeDelete = () => {
    if (selectedUserForDelete) {
      console.log("Deleting user:", selectedUserForDelete);
    }
    setIsDeleteMemberOpen(false);
    setSelectedUserForDelete(null);
  };
  const closeAdd = () => {
    setIsAddMemberOpen(false);
  };

  const closeupdate = () => {
    // if (selectedUserForUpdate) {
    //   console.log("Updating user:", selectedUserForUpdate);
    // }
    setIsUpdateMemberOpen(false);
    setSelectedUserForUpdate(null);
  };

  const addMember = async (data) => {
    console.log("Adding member", data);
    dispatch(loadingTriggered(true));
    await UserApi.create_user(data).then((response) => {
      if (response.status) {
        console.log("Added user", response.data);
        dispatch(loadingTriggered(false));
        closeAdd();
        getAllUsers();
      } else {
        dispatch(loadingTriggered(false));
        console.log("Error adding user", response.data);
      }
    });
  };

  const updateMember = async (data) => {
    if (selectedUserForUpdate) {
      const id = selectedUserForUpdate.id;
      const userData = {
        role: data.role,
      };
      dispatch(loadingTriggered(true));
      await UserApi.update_user(userData, id).then((response) => {
        if (response.status) {
          console.log("Updated user", response.data);
          dispatch(loadingTriggered(false));
          closeupdate();
          getAllUsers();
        } else {
          console.log("Error updating user", response.data);
        }
      });
    }
  };

  const statusUpdate = async (id, status) => {
    const data = { pro_status: status };
    await UserApi.update_user(data, id).then((response) => {
      if (response.status) {
        console.log("Updated user", response.data);
        dispatch(loadingTriggered(false));
        closeupdate();
        getAllUsers();
      } else {
        console.log("Error updating user", response.data);
      }
    });
  };

  const deleteMember = async () => {
    // alert(`Deleting user - ${selectedUserForDelete?.firstname}`)
    if (selectedUserForDelete) {
      const id = selectedUserForDelete.id;
      dispatch(loadingTriggered(true));
      await UserApi.delete_user(id).then((response) => {
        if (response.status) {
          console.log("Deleted user", response.data);
          dispatch(loadingTriggered(false));
          closeDelete();
          getAllUsers();
        } else {
          dispatch(loadingTriggered(false));
          console.log("Error deleting user", response.data);
        }
      });
    }
  };

  useEffect(() => {
    getAllUsers();
    getRoles();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check if the key pressed is the "Enter" key (key code 13)
      if (event.keyCode === 88) {
        setScreenStatus(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
  }, []);
  if (!authContext) {
    return null; // Or show some loading/error message when the context is not available yet.
  }
  const { isLoggedIn, isAdmin, proStatus } = authContext;
  return (
    <>
      {" "}
      {isLoggedIn && (
        <div className="flex w-full h-screen">
          {/* {!proStatus && (
        <>
          <NotAvailble
            loading={screenStatus}
            messageOveraly="Coming soon"
            position="left-[20%] w-[80%] bg-gray-200"
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
            <TeamNavBar
              selectedButton={selectedButton}
              setSelectedButton={setSelectedButton}
            />
          </div>

          <div className="w-[80%] overflow-auto scrollbar-hide">
            {/* <div>
          <div>
            <TwoButtonIcon gridViewChange={handleGridViewChange} />
          </div>
        </div> */}

        <>
          <div className="w-[100%] overflow-auto scrollbar-hide  py-[1rem] 2xl:px-[4rem] px-[1rem] flex ">
            <TeamSettingsPage
              isAdmin={isAdmin}
              adminUsers={adminUsers}
              teamMembers={teamMembers}
              setIsAddMemberOpen={setIsAddMemberOpen}
              setIsUpdateMemberOpen={setIsUpdateMemberOpen}
              setIsDeleteMemberOpen={setIsDeleteMemberOpen}
              selectedUserForUpdate={setSelectedUserForUpdate}
              selectedUserForDelete={setSelectedUserForDelete}
              statusUpdate={statusUpdate}
            />
          </div>
          {/* <div className="  h-[90vh] px-[1rem] py-[3rem] ">
            <div className=" grid 2xl:grid-cols-4 grid-cols-3 gap-4">
              <TeamGridCard />
            </div>
          </div> */}
            </>
          </div>
          {isDeleteMemberOpen && selectedUserForDelete && (
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="p-5 ">
                <DeleteMember
                  onClose={closeDelete}
                  deleteUser={deleteMember}
                  Name={selectedUserForDelete?.firstname}
                  email={selectedUserForDelete?.email}
                  logoImage={selectedUserForDelete?.image_url}
                />
              </div>
            </div>
          )}

          {isAddMemberOpen && (
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="p-5 ">
                <AddMember
                  onClose={closeAdd}
                  addMember={addMember}
                  roles={roles}
                />
              </div>
            </div>
          )}

          {isUpdateMemberOpen && selectedUserForUpdate && (
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="p-5 ">
                <UpdateMember
                  onClose={closeupdate}
                  updateUser={updateMember}
                  roles={roles}
                  role={selectedUserForUpdate?.role}
                  Name={selectedUserForUpdate?.firstname}
                  email={selectedUserForUpdate?.email}
                  logoImage={selectedUserForUpdate?.image_url}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Team;
