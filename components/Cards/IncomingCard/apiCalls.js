import InquiriesApi from "@/pages/api/admin/inquiries";
import UsersApi from "@/pages/api/admin/users";

export async function getInquiriesByStatus(status) {
  const response = await InquiriesApi.getInquiriesByStatus(status);
  if (response?.data) {
    return response?.data;
  } else {
    return [];
  }
}

export async function getAllInquiriesCall() {
  const response = await InquiriesApi.getInquiries();
  if (response?.data) {
    return response?.data;
  } else {
    return [];
  }
}

export async function getIncomingOngoingInquiriesCall() {
  const response = await InquiriesApi.getIncomingOngoingInquiriesCall();
  if (response?.data) {
    return response?.data;
  } else {
    return [];
  }
}

export async function getIncomingInquiriesCall() {
  const response = await InquiriesApi.getInquiriesByStatus("incoming");
  if (response?.data) {
    return response?.data;
  } else {
    return [];
  }
}

export async function getOngoingInquiriesCall() {
  const response = await InquiriesApi.getInquiriesByStatus("ongoing");
  if (response?.data) {
    return response?.data;
  } else {
    return [];
  }
}

export async function getMissedInquiriesCall() {
  const response = await InquiriesApi.getInquiriesByStatus("missed");
  if (response?.data) {
    return response?.data;
  } else {
    return [];
  }
}

export async function getCompletedInquiriesCall() {
  const response = await InquiriesApi.getInquiriesByStatus("completed");
  if (response?.data) {
    return response?.data;
  } else {
    return [];
  }
}

export async function deleteInquiryCall(id) {
  const response = await InquiriesApi.deleteInquiry(id);
  if (response?.data) {

    return response?.data;
  } else {
    return [];
  }
}

export async function getLiveCounts() {
  const response = await InquiriesApi.getLiveCounts();
  if (response?.data) {
    return response?.data;
  } else {
    return [];
  }
}

export async function updateInquiry(data, id) {
  const response = await InquiriesApi.updateInquiry(data, id);
  if (response?.data) {
    return response?.data;
  } else {
    return [];
  }
}

export async function getAllUser() {
  const response = await UsersApi.get_user();
  if (response?.data) {
    return response?.data;
  } else {
    return [];
  }
}


export async function startSessionCall(id) {
  const response = await InquiriesApi.startSession(id);
  if (response?.data) {
    return response?.data;
  } else {
    return false;
  }
}

export async function startSessionCallLive(id) {
  const response = await InquiriesApi.startSession(id);
  if (response?.data) {
    return response?.data;
  } else {
    return false;
  }
}
export async function endSessionCall(id) {
  const response = await InquiriesApi.endSession(id);
  if (response?.data) {
    return response?.data;
  } else {
    return false;
  }
}

 
