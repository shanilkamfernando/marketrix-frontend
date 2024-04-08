import React, { useState, useRef, useEffect } from "react";
import Joyride, { STATUS } from "react-joyride";
import { loadState } from "@/store/localStorage";
import { setProductTourStatus } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import Router from "next/router";

function ProductTour() {
  const [{ run, steps }, setState] = useState({
    run: true,
    steps: [
      {
        content: (
          <>
            <h2 className="!font-bold"> Welcome to Marketrix Product Tour</h2>
          </>
        ),
        locale: {
          skip: (
            <>
              <b>SKIP</b>
            </>
          ),
        },
        placement: "center",
        target: "body",
      },
      {
        content: (
          <>
            <h2 className="text-[#667085]">
              Home is your Marketrix home 😉 where you can see a snapshot of
              everything
            </h2>
          </>
        ),
        placement: "right",
        target: "#step-1",
        title: "Home",
      },
      {
        content: (
          <>
            <h2 className="text-[#667085]">STEP 1 - 1</h2>
          </>
        ),
        placement: "right",
        target: "#step-1-1", // Use the parent div ID as the target
        title: "INSIDE HOME",
      },

      {
        content: (
          <>
            <h2 className="text-[#667085]">STEP 1 - 2</h2>
          </>
        ),
        placement: "right",
        target: "#step-1-2",
        title: "INSIDE HOME",
      },

      {
        content: (
          <>
            <h2 className="text-[#667085]">STEP 1 - 3</h2>
          </>
        ),
        placement: "right",
        target: "#step-1-3",
        title: "INSIDE HOME",
      },

      {
        content: (
          <>
            <h2 className="text-[#667085]">STEP 1 - 4</h2>
          </>
        ),
        placement: "right",
        target: "#step-1-4",
        title: "INSIDE HOME",
      },

      {
        content: (
          <>
            <h2 className="text-[#667085]">
              Connect with your website visitors realtime with Interactive Video
              Co-Browsing and Spot Meetings on the website itself
            </h2>
          </>
        ),
        placement: "right",
        target: "#step-2",
        title: "MLive",
      },

      {
        content: (
          <>
            <h2 className="text-[#667085]">
              Create an AI Sales Avatar to speak to your site visitors
            </h2>
          </>
        ),
        placement: "right",
        target: "#step-3",
        title: "Avatars",
      },
      {
        content: (
          <>
            <h2 className="text-[#667085]">This is your Analytics 🙂</h2>
          </>
        ),
        placement: "right",
        target: "#step-4",
        title: "Analytics",
      },
      {
        content: (
          <>
            <h2 className="text-[#667085]">
              Manage your Marketrix superheroes here
            </h2>
          </>
        ),
        placement: "right",
        target: "#step-5",
        title: "Team",
      },
      {
        content: (
          <>
            <h2 className="text-[#667085]">
              Recruit a Marketrix Agent to supercharge your sales team
            </h2>
          </>
        ),
        placement: "right",
        target: "#step-6",
        title: "Agents",
      },

      {
        content: (
          <>
            <h2 className="text-[#667085]">
              This is your Marketrix Settings 🙂
            </h2>
          </>
        ),
        placement: "right",
        target: "#step-7",
        title: "Settings",
      },
      {
        content: (
          <>
            <h2 className="text-[#667085]">Your profile can be managed here</h2>
          </>
        ),
        placement: "top",
        target: "#step-8",
        title: "Profile",
      },
    ],
  });
  const dispatch = useDispatch();
  const [first, setfirst] = useState(null);
  const triggerProductTour = () => {
    dispatch(setProductTourStatus(true));
    // setfirst(true);
    router.push("/Dashboard/NewOverview");
    // alert("TRIGGERED");
  };

  const handleTourEnd = (data) => {
    const { status,step } = data;

    // console.log("handleTourEnd! status!", status);
    if (status === STATUS.FINISHED) {
      console.log("handleTourEnd! The tour is complete!");
      setfirst(false);
      dispatch(setProductTourStatus(false));
    }

    if (status === STATUS.SKIPPED) {
      console.log("handleTourEnd! The tour is skipped!");
      setfirst(false);
      dispatch(setProductTourStatus(false));
    }

    if (status === STATUS.RUNNING) {
      const currentStep = step.target;
      switch (currentStep) {
        case "#step-1":
          Router.push("/Dashboard/NewOverview");
        case "#step-2":
          Router.push("/MLivePages/LiveTraffic");
      }
    }
  };

  useEffect(() => {
    let productTourStatus = loadState("product_tour_status");
    // let productTourStatus = true;
    console.log("productTourStatus", productTourStatus);
    if (productTourStatus) {
      setfirst(true);
    } else {
      setfirst(false);
    }
    // setfirst(true);
  }, []);

  return (
    <div>
      {first ? (
        <Joyride
          run={run}
          steps={steps}
          hideCloseButton
          scrollToFirstStep
          spotlightPadding={2}
          showSkipButton
          showProgress={true}
          continuous
          callback={handleTourEnd}
          styles={{
            options: {
              primaryColor: "#7F56D9",
              textColor: "#101828",
              zIndex: 1000,
            },
          }}
        />
      ) : null}
    </div>
  );
}

export default ProductTour;
