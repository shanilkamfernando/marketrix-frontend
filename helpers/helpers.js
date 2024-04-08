import InquiriesApi from "@/pages/api/admin/inquiries";
import { loadState, saveState, saveStateSession } from "@/store/localStorage";
import { useContext } from "react";

export const formatTime = (timestamp) => {
  // Create a new Date object using the timestamp
  const date = new Date(timestamp);

  // Get the various components of the date
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is 0-indexed, so add 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Format the date and time as a string
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return formattedDate;
};

export const getFormattedDate = (dateString) => {
  // Create a new Date object using the timestamp
  const date = new Date(dateString);

  // Get the various components of the date
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is 0-indexed, so add 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Format the date and time as a string
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return formattedDate;
};

export const getFormattedDateOnly = (dateString) => {
  // Create a new Date object using the timestamp
  const date = new Date(dateString);

  // Get the various components of the date
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is 0-indexed, so add 1
  const day = date.getDate();

  // Format the date and time as a string
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  return formattedDate;
};

export const getTimeAgo = (dateString) => {
  //   console.log("getTimeAgo dateString", dateString);
  const currentTime = new Date();
  const pastTime = new Date(dateString);
  const timeDiffInSeconds = Math.floor((currentTime - pastTime) / 1000);
  //  console.log("getTimeAgo timeDiffInSeconds", timeDiffInSeconds);
  const timeDiffInMinutes = Math.floor(timeDiffInSeconds / 60);
  //  console.log("getTimeAgo timeDiffInMinutes", timeDiffInMinutes);
  const timeDiffInHours = Math.floor(timeDiffInMinutes / 60);
  // console.log("getTimeAgo timeDiffInHours", timeDiffInHours);
  const timeDiffInDays = Math.floor(timeDiffInHours / 24);
  // console.log("getTimeAgo timeDiffInDays", timeDiffInDays);

  // const timeDiffInWeeks = Math.floor(timeDiffInDays / 7);
  // console.log("getTimeAgo timeDiffInWeeks", timeDiffInWeeks);

  if (timeDiffInSeconds <= 0) {
    return "now";
  } else if (timeDiffInSeconds < 60 && timeDiffInSeconds >= 1) {
    return `${timeDiffInSeconds} seconds ago`;
  } else if (timeDiffInMinutes < 60 && timeDiffInMinutes >= 1) {
    return `${timeDiffInMinutes} minutes ago`;
  } else if (timeDiffInHours < 24 && timeDiffInHours >= 1) {
    return `${timeDiffInHours}
    hours ago`;
  } else if (timeDiffInDays >= 1) {
    return `${timeDiffInDays} days ago`;
  } else {
    return "Invaild Date";
  }
};

export const getFormattedTimeHM = (dateString) => {
  const date = new Date(dateString);
  const hours_minutes = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // console.log(hours_minutes);

  return hours_minutes;
};

export const getFormattedTimeMS = (dateString) => {
  const date = new Date(dateString);
  const hours_minutes = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    millisecond: "2-digit",
  });

  // console.log(hours_minutes);

  return hours_minutes;
};

export function removeObjectFromArray(array, object) {
  return array.filter((item) => item.id !== object.id);
}
export function updateObjectInArray(array, object) {
  return array.map((item) => {
    if (item.id !== object.id) {
      return item;
    }
    return {
      ...item,
      ...object,
    };
  });
}
export function getUserName(id, users) {
  //console.log("getUserName", id, users);

  if (users.length > 0 && id) {
    let user = users.find((user) => user.id == id);
    if (user?.firstname) {
      return user?.firstname;
    } else if (user?.email) {
      let email = user?.email;
      return email.substring(0, email.indexOf("@"));
    } else {
      return "";
    }
  } else {
    return;
  }
}

export function getUserImage(id, users) {
  let user = users.find((user) => user.id == id);
  return user?.image_url || "";
}

export function loggedInUserImage() {
  let userImage = loadState("image_url");
  console.log("userImage", userImage);
  if (userImage) {
    // console.log("YES",userImage)
    return userImage;
  } else {
    //console.log("NO",userImage)
    return "./../../../images/profile3.png";
  }
}

// if (!authContext) {
//   return null; // Or show some loading/error message when the context is not available yet.
// }

export function getCountryLogo(country) {
  switch (country) {
    case "Sri Lanka" || "LK" || "Sri lanka":
      // return "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg";
      return "https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Sri_Lanka.svg";
    case "United States":
      return "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg";
    case "United Kingdom":
      return "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg";
    case "India":
      return "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg";
    case "Australia":
      return "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg";
    case "Canada":
      return "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg";
    case "Germany":
      return "https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg";
    case "France":
      return "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg";
    case "Italy":
      return "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg";
    case "Japan":
      return "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg";
    case "China":
      return "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg";
    case "South Korea":
      return "https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg";
    case "Spain":
      return "https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg";
    case "Netherlands":
      return "https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg";
    case "Sweden":
      return "https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg";
    case "Switzerland":
      return "https://upload.wikimedia.org/wikipedia/commons/0/08/Flag_of_Switzerland_%28Pantone%29.svg";
    case "Norway":
      return "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg";
    case "Denmark":
      return "https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg";
    case "Finland":
      return "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg";
    case "Belgium":
      return "https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg";
    case "Austria":
      return "https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg";
    case "Indonesia":
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAANlBMVEX////OESfPECfSDyXq6urfrLDEABjQEynMEija2trMESbSEinPEyrHAB3bn6Thq7Dr7uvo6ep5vJs6AAABrElEQVR4nO3cQU4CQRBA0R5FGWBQuP9lBQUJ/gNA4nu96FpWfnrdY5mnaT1xs4xluz3dW35dm3Cz1iQuTV642Z2aSHJvN9bfTR79Xp/JWpPQpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU3q/PfyPE/TzNW5yc8wzZcz/ftxGa/8Nfbv3NuPj8+TN24+xmFw7zCOj17h6RzH6tErPJ2VJqFJaVKalCalSWlSmpQmpUlpUpqUJqVJaVKalCalSWlSmpQmpUlpUpqUJqVJaVKalCalSWlSmpQmpUlpUpqUJqVJaVKalCalSWlSmpQmpUlpUpqUJqVJaVKalCalSWlSmpQmpUlpUpqUJqVJaVKalCalSWlSmpQmpUlpUpqUJqVJaVKalCalSWlSmpQmpUlpUpqUJqVJaVKrsVlxb/MFGmaUP7bCBpsAAAAASUVORK5CYII=";
    default:
      return "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg";
  }
}

export function getBrowserLogo(browser) {
  switch (browser) {
    case "Google Chrome":
      return "./../../../images/overview/chrome.svg";
    case "Brave":
      return "./../../../images/overview/brave.svg";
    case "Safari":
      return "./../../../images/overview/safari.svg";
    case "Microsoft Edge":
      return "./../../../images/overview/microsoft-edge.svg";
    case "Mozilla Firefox":
      return "./../../../images/overview/mozilla-firefox.svg";
    case "Opera":
      return "./../../../images/overview/opera.svg";
    case "Internet Explorer":
      return "./../../../images/overview/internet-explorer.svg";

    default:
      return "./../../../images/overview/chrome.svg";
  }
}

export function getPlatformIcon(platform) {
  switch (platform) {
    case "Win32":
      return "./../../../images/overview/windows.svg";
    case "MacIntel":
      return "./../../../images/overview/mac.svg";
    case "Linux":
      return "./../../../images/overview/linux.svg";
    case "Android":
      return "./../../../images/overview/android.svg";
    case "iOS":
      return "./../../../images/overview/ios.svg";
    default:
      return "./../../../images/overview/microsoft.svg";
  }
}

export function getDeviceIcon(windowWidth, screenHeight) {
  switch (windowWidth > 0) {
    case windowWidth >= 1024:
      return "../../../../images/overview/laptop.svg";
    case windowWidth >= 768:
      return "../../../../images/overview/tablet.svg";
    case windowWidth >= 320:
      return "../../../../images/overview/mobile.svg";
    default:
      return "../../../../images/overview/device.svg";
  }

  // if (screenWidth >= 1024) {
  //   return "../../../../images/overview/laptop.svg";
  // }
  // if (screenWidth >= 768) {
  //   return "../../../../images/overview/tablet.svg";
  // }
  // if (screenWidth >= 320) {
  //   return "../../../../images/overview/mobile.svg";
  // } else {
  //   return "../../../../images/overview/device.svg";
  // }
}

export function removeQueryParamFromURL(url, paramName) {
  const urlObject = new URL(url);
  urlObject.searchParams.delete(paramName);
  return urlObject.toString();
}

export function capitalizeWords(input) {
  if (typeof input !== "string") return "";
  return input.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });
}

export function trimURLToMaxLength(url, maxLength) {
  if (url.length <= maxLength) {
    return url; // No need to trim if it's already shorter than or equal to the desired length.
  }

  const urlObject = new URL(url);

  // Preserve the protocol (http:// or https://)
  const protocol = urlObject.protocol + "//";

  // Preserve the domain and subdomain
  const domainParts = urlObject.hostname.split(".");
  let domain = domainParts[domainParts.length - 2]; // Get the second-to-last part of the domain (e.g., 'example' in 'www.example.com')

  // If there's a subdomain, include it
  if (domainParts.length > 2) {
    domain = domainParts[domainParts.length - 3] + "." + domain;
  }

  // Include the first path segment
  const pathSegments = urlObject.pathname.split("/");
  let path = pathSegments[1]; // Get the second path segment (e.g., 'page' in '/page/somepage')

  // Construct the trimmed URL
  const trimmedURL = protocol + domain + "/" + path;

  // Ensure the trimmed URL length is within the specified maxLength
  if (trimmedURL.length <= maxLength) {
    return trimmedURL;
  }

  // If it's still longer, truncate it and add an ellipsis
  return trimmedURL.slice(0, maxLength - 3) + "...";
}

export function addSpace(inputString) {
  let spacedString = inputString.replace(/([a-z])([A-Z])/g, "$1 $2");
  return spacedString;
}

export function removeProtocol(url) {
  return url.replace(/^.*:\/\//, "");
}

// export function getUserRole

// Example usage:
// const originalURL = 'https://www.example.com/some/long/path/to/a/page';
// const maxLength = 30;
// const trimmedURL = trimURLToMaxLength(originalURL, maxLength);
// console.log(trimmedURL); // Output: 'https://example.com/some/

// // util.js (Create a utility file)

// export function runEffectOnce(effectFunction, storageKey) {
//   // Check if the effect has already been executed
//   const effectExecuted = loadState(storageKey);

//   if (!effectExecuted) {
//     // Run the effect if it hasn't been executed yet
//     effectFunction();

//     // Set a flag in localStorage to indicate that the effect has been executed
//     saveState(storageKey, true);
//   }
// }
