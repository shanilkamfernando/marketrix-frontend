// AuthContext.tsx
import LoggedInUserApi from "@/pages/api/admin/loggedInUser";
import { loadState } from "@/store/localStorage";
import { useRouter } from "next/router";
import React, { createContext, useState, useEffect } from "react";

import Router from "next/router";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  const [domainExist, setDomainExist] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tenantExist, setTenantExist] = useState(false);
  const [proStatus, setProStatus] = useState(false);
  const [packageName, setPackageName] = useState("");

  // Function to update user data
  const updateUser = (updatedUserData) => {
    setUserData((prevUserData) => {
      // You can use the updater function form of setState to handle the update
      // Here we assume updatedUserData is a function (prevState: UserData[]) => UserData[]
      return typeof updatedUserData === "function"
        ? updatedUserData(prevUserData)
        : updatedUserData;
    });
  };

  // Simulate fetching user data on login
  useEffect(() => {
    if (isLoggedIn) {
      // Replace this with your actual data fetching logic
      const fetchedUserData = [
        { id: 1, name: "John" },
        { id: 2, name: "Alice" },
        // Add more objects as needed
      ];

      setUserData(fetchedUserData);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    checkUserLoggedIn();
    checkUserStatus();
  }, []);

  const router = useRouter();

  const checkUserStatus = async () => {
    const currentPath = window.location.pathname;
    console.log("checkUserLoggedIn currentPath", currentPath);

    if (currentPath == "/SignUp/AdminRegistration") {
      return;
    }

    const domainName = loadState("website_domain");
    const tenantName = loadState("tenantName");

    console.log("checkUserStatus domainName", domainName);
    console.log("checkUserStatus tenantName", tenantName);
    if (!tenantName || !domainName) {
      setTenantExist(false);
      setDomainExist(false);
      console.log("checkUserStatus isLoggedIn", isLoggedIn);
      if (isLoggedIn) {
        Router.push("/SignUp/AdminRegistrationOnboardingStep01");
      } else {
      }
    }
    // if (tenantName == null) {
    //   setTenantExist(false);
    //   Router.push("/SignUp/AdminRegistrationOnboardingStep01");
    // } else if (domainName == null) {
    //   setTenantExist(true);
    //   setDomainExist(false);
    //   Router.push("/Dashboard/MLivePages/Live");
    // } else {
    //   setDomainExist(true);
    // }
  };
  const setTenantStatus = async () => {
    setIsLoggedIn(true);
    setTenantExist(true);
    setDomainExist(true);
  };
  const checkUserLoggedIn = async () => {
    const currentPath = window.location.pathname;
    console.log("checkUserLoggedIn currentPath", currentPath);

    if (currentPath == "/SignUp/AdminRegistration") {
      return;
    }
    await LoggedInUserApi.validate_admin_token().then((response) => {
      if (response?.data) {
        setIsLoggedIn(true);
        console.log("checkUserLoggedIn User is logged in", response.data);
        console.log("User ROLE", response.data.role);
        console.log("PRO Status", response.data.pro_status);
        console.log("Package Status", response.data.package);

        setPackageName(response.data.package);
        if (response.data.role == "Admin") {
          console.log("YES");
          setIsAdmin(true);
        }

        if (response.data.pro_status == true) {
          setProStatus(true);
        } else {
          setProStatus(false);
        }

        if (response.data.tenant_status) {
          setTenantExist(true);
        } else {
          router.push("/SignUp/AdminRegistrationOnboardingStep01");
          setTenantExist(false);
        }
      } else {
        setIsLoggedIn(false);
        router.push("/");
      }
    });
  };

  const removeAuthContext = async () => {
    setIsLoggedIn(false);
    setDomainExist(false);
    setIsAdmin(false);
    setTenantExist(false);
    setProStatus(false);
    setPackageName("");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        proStatus,
        packageName,
        setIsLoggedIn,
        setTenantExist,
        userData,
        setUserData: updateUser,
        domainExist,
        tenantExist,
        setDomainExist,
        checkUserLoggedIn,
        checkUserStatus,
        removeAuthContext,
        setTenantStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
