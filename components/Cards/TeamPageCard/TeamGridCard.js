import {
  Avatar,
  Badge,
  Button,
} from "@creativehub/marketrix-ui";
import React from "react";
import TeamsJsonData from "./TeamsJsonData.json";

function TeamGridCard() {
  return (
    <>
      {TeamsJsonData.teamMembers.map((member, index) => {
        return (
          <div className=" border-[1px] p-3 rounded-[12px]" key={index}>
            <div className=" flex justify-between items-center pb-5 ">
              <div className=" flex gap-2 items-center ">
                <div>
                  <Avatar
                    border="none"
                    borderRadius="50%"
                    height="40px"
                    image={member.avatarImage}
                    width="40px"
                  />
                </div>

                <div className="mtx-body2">
                  <div className=" !font-semibold">{member.name}</div>
                  <div className="text-[#98A2B3]">{member.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <img
                    src="../../images/team/rateStar.svg"
                    width={20}
                    height={20}
                  />
                </div>
                <div>{member.ratings}</div>
              </div>
            </div>

            <div className="pb-3 mtx-body1 !font-medium text-[#344054]">
              <div className="flex justify-between py-1 ">
                <div>Session completed</div>
                <div>{member.completedSessions}</div>
              </div>

              <div className="border-b-[1px] border-[#D0D5DD]"></div>

              <div className="flex justify-between py-1 ">
                <div>Resolution Time</div>
                <div>{member.resolutionTime}</div>
              </div>

              <div className="border-b-[1px] border-[#D0D5DD]"></div>

              <div className="flex justify-between py-1 items-center">
                <div>Status</div>
                <div>
                  <Badge
                    backgroundColor={member.statusBadgeBgColor}
                    borderRadius={16}
                    color={member.statusBadgeTextColor}
                    hoverColor="#F2F4F7"
                    text={member.statusBadgeText}
                    width={60}
                    height={28}
                    fontSize="16px"
                  />
                </div>
              </div>

              <div className="border-b-[1px] border-[#D0D5DD]"></div>

              <div className="flex justify-between py-1 ">
                <div>MLive Status</div>
                <div>
                  {" "}
                  <Button
                    alignItems="center"
                    background={"transparent"}
                    borderColor="#D0D5DD"
                    borderRadius="8px 0px 0px 8px "
                    color="#667085"
                    fontSize="16px"
                    fontWeight="500"
                    gap="8px"
                    icon="ArrowUpRight "
                    iconPosition="trailing"
                    iconSize={"18px"}
                    justifyContent="center"
                    label="View"
                    size="custom"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TeamGridCard;
