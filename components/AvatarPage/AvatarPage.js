import React, { useEffect, useState } from "react";
import AvatarCreateCard from "../Cards/AvatarCards/AvatarCreateCard";

import WidgetModal from "../Modals/LiveSettingsModals/WidgetModal";
import CreateAvatarModal from "../Modals/AvatarModals/CreateAvatarModal";
import AvatarLibrary from "./AvatarLibraryPage";
import AvatarTextPlaygroundCard from "../Cards/AvatarCards/AvatarTextPlaygroundCard";
import AvatarApi from "@/pages/api/admin/avatar";
import Tenant from "@/pages/api/admin/tenants";

import CustomAvatarTextPlaygroundCard from "../Cards/AvatarCards/CustomAvatarTextPlaygroundCard";
import { loadingTriggered } from "@/store/actionSlice";
import { useDispatch } from "react-redux";
import { setAvatarId } from "@/store/avatarSlice";
import Router from "next/router";

function AvatarPage() {
  const [isCreateAvatar, setIsCreateAvatar] = useState(false);
  const [fetchedAvatar, setFetchedAvatar] = useState({});
  const [avatars, setAvatars] = useState([]);
  const [tenant, setTenant] = useState({});

  const router = Router;

  const closeCreateAvatar = () => {
    setIsCreateAvatar(false);
  };
  const dispatch = useDispatch();

  const getAllAvatars = () => {
    dispatch(loadingTriggered(true));
    AvatarApi.get_all_avatars().then((res) => {
      console.log("get_all_avatars", res.data);
      if (!res.data) {
        dispatch(loadingTriggered(false));
        return;
      }
      if (res.data.length > 0) {
        // for(let i = 0; i < res.data.length; i++) {
        //   res.data[i].model_status = "failed";
        // }
        dispatch(loadingTriggered(false));
        setAvatars(res.data);
      } else {
        dispatch(loadingTriggered(false));
        setAvatars([]);
      }
    });
  };

  const modifyAvatar = (avatar) => {
    const id = avatar.id;
    dispatch(setAvatarId(id));
    router.push("/Dashboard/Trixy/AvatarModify");
  };

  const deleteAvatar = (avatar) => {
    console.log("Delete Avatar", avatar.id);
    const id = avatar.id;
    dispatch(loadingTriggered(true));
    AvatarApi.delete_avatar(id).then((res) => {
      console.log("delete_avatar", res);
      if (res.status === true) {
        dispatch(loadingTriggered(false));
        alert(res.message);
        getAllAvatars();
      } else {
        alert(res.message);
        dispatch(loadingTriggered(false));
      }
    });
  };

  const getTenant = async () => {
    dispatch(loadingTriggered(true));
    Tenant.get_tenant().then((response) => {
      if (response?.data) {
        console.log("Tenant response", response.data);
        setTenant(response.data);
        dispatch(loadingTriggered(false));
      } else {
        dispatch(loadingTriggered(false));
        alert(response?.message);
      }
    });
  };

  useEffect(() => {
    getAllAvatars();
    getTenant();
  }, []);
  return (
    <div className="">
      <div className=" flex flex-col !font-Semibold mtx-h6 ">
        My Avatars
        <div className="!font-normal mtx-subtitle2 text-[#667085]">
          Create your digital avatar in minutes
        </div>
      </div>

      <div className="py-5 grid grid-cols-3 gap-3 ">
        <AvatarCreateCard openCreateCard={setIsCreateAvatar} />

        {avatars.length > 0 &&
          avatars.map((avatar, index) => (
            <CustomAvatarTextPlaygroundCard
              avatarInfo={avatar}
              key={index}
              modifyAvatar={modifyAvatar}
              deleteAvatar={deleteAvatar}
              activeAvatarId={tenant?.active_avatar}
            />
          ))}

        {/* <div>
          <AvatarTextPlaygroundCard />
        </div> */}
      </div>

      {isCreateAvatar && (
        <div className=" fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center w-full">
          <CreateAvatarModal onClose={closeCreateAvatar} />
        </div>
      )}
    </div>
  );
}

export default AvatarPage;
