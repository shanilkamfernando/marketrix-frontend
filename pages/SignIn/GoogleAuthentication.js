import AvatarWithMail from "@/components/Avatar/avatarWithMail";
import SignInScreenHeader from "@/components/Headers/SignInScreenHeader/SignInScreenHeader";
import LogoWithTitle from "@/components/LogoWithTitle/LogoWithTitle";
import ScreenInputField from "@/components/ScreenInputField/ScreenInputField";
import { Avatar, Button, Dropdown } from "@creativehub/marketrix-ui";
import Link from "next/link";
import React from "react";
import { FaGoogle } from "react-icons/fa";

function GoogleAuthentication() {
  return (
    <div className=" h-screen  flex flex-col justify-center">
      <div className="">
        <div className=" flex justify-center items-center ">
          <div className=" xl:w-[30%] lg:w-[40%] w-[50%]">
            <div className=" border-2 rounded-xl ">
              <div className="flex justify-start py-2 px-5 items-center gap-x-2 border-b-2 text-[#5F6368] mtx-subtitle2">
                <FaGoogle />
                Sign in with Google
              </div>
              <div className=" pt-10">
                <div className="mtx-h4 w-full flex justify-center !font-semibold  pb-1">
                  <div className=" text-[#101828] text-center w-[80%]">
                    Choose an account
                  </div>
                </div>
                <div className="flex justify-center text-[#667085] mtx-body1 !font-normal">
                  <p>
                    to continue to{" "}
                    <span className="text-[#1A73E8] font-bold">
                      marketrix.io
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex justify-start px-7 py-5 ">
                <div className=" w-full  ">
                  <div>
                    <Link href="" passHref>
                      <AvatarWithMail
                        personName="Irosha de silva"
                        personEmail="iroshas@gmail.com"
                        personalImage="/images/live/iroshaProfilePic.png"
                      />
                    </Link>
                  </div>

                  <div className="pt-3">
                    <hr />
                  </div>

                  <div className="pt-3">
                    <Link href="" passHref>
                      <AvatarWithMail
                        personName="Use another account"
                        personEmail=""
                        personalImage="/images/profileImage.png"
                      />
                    </Link>
                  </div>
                  <div className="pt-3 mtx-label text-[#5F6368] !font-regular">
                    <p>
                      To continue, Google will share your name, email address,
                      language preference, and profile picture with marketrix.io
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mtx-label pt-5 w-full text-[#3C4043]">
              <div className="w-[60%]">
                <div>
                  <Dropdown
                    background="#ffffff"
                    border="1px solid #D0D5DD"
                    borderRadius="8px"
                    color="#000000"
                    height="44px"
                    onSelect={() => {}}
                    options={[
                      {
                        label: "‪English (United States)‬",
                        value: "‪English (United States)‬",
                      },
                      {
                        label: "Option 2",
                        value: "option2",
                      },
                      {
                        label: "Option 3",
                        value: "option3",
                      },
                    ]}
                    labelKey="label"
                    valueKey="value"
                    width="80%"
                    padding={undefined}
                  />
                </div>
              </div>
              <div className=" w-[40%] flex justify-between">
                <div>
                  <Link
                    href={"https://support.google.com/accounts#topic=3382296"}
                    target="_blank"
                  >
                    Help
                  </Link>
                </div>
                <div>
                  <Link
                    href={"https://policies.google.com/privacy"}
                    target="_blank"
                  >
                    Privacy
                  </Link>
                </div>
                <div>
                  <Link
                    href={"https://policies.google.com/terms"}
                    target="_blank"
                  >
                    Terms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoogleAuthentication;
