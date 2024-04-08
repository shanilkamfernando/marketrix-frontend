const APIKit = require("../config").default;
const { handleResponse } = require("../config");
const { LIVE_INQUIRY } = require("../constants/endPoints");

class Inquiries {
  createInquiry = async (data) => {
    return await APIKit.post(LIVE_INQUIRY.CREATE, data)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };

  getInquiries = async () => {
    return await APIKit.get(LIVE_INQUIRY.GET_ALL)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };

  getInquiriesByStatus = async (status) => {
    return await APIKit.get(LIVE_INQUIRY.GET_BY_STATUS + `${status}`)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };

  getInquiriesByStatusPagination = async (status, page, pageSize) => {
    return await APIKit.get(
      LIVE_INQUIRY.GET_BY_STATUS +
        `${status}` +
        `?page=${page}&pageSize=${pageSize}`
    )
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };

  updateInquiry = async (data, id) => {
    return await APIKit.post(LIVE_INQUIRY.UPDATE + `${id}`, data)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };

  getIncomingOngoingInquiriesCall = async () => {
    return await APIKit.get(LIVE_INQUIRY.GET_ALL_IO)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };

  deleteInquiry = async (id) => {
    return await APIKit.delete(LIVE_INQUIRY.DELETE + `${id}`)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };

  getLiveCounts = async () => {
    return await APIKit.get(LIVE_INQUIRY.GET_COUNT)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };

  startSession = async (id) => {
    return await APIKit.get(LIVE_INQUIRY.START_SESSION + `${id}`)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };

  endSession = async (id) => {
    return await APIKit.get(LIVE_INQUIRY.END_SESSION + `${id}`)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };
  getSessionRecording = async (id) => {
    return await APIKit.get(LIVE_INQUIRY.GET_SESSION_RECORDING + `${id}`)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };
  getAllSessionRecordings = async () => {
    console.log("getAllSessionRecordings");
    return await APIKit.get(LIVE_INQUIRY.GET_ALL_SESSION_RECORDINGS)
      .then(handleResponse)
      .then((data) => {
        console.log("getAllSessionRecording data", data);
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };
}

const InquiriesApi = new Inquiries();
Object.freeze(InquiriesApi);
module.exports = InquiriesApi;
