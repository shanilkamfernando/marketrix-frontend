const APIKit = require("../config").default;
const { handleResponse } = require("../config");
const { AGENT } = require("../constants/endPoints");

class Agent {
  get_all_agents = async () => {
    return await APIKit.get(AGENT.GET_ALL)
      .then(handleResponse)
      .then((data) => data)
      .catch((error) => {
        console.log("GET_ALL_AGENTS-----------", error);
        return error?.response?.data;
      });
  };

  get_by_id = async (id) => {
    return await APIKit.get(AGENT.GET_BY_ID + id)
      .then(handleResponse)
      .then((data) => data)
      .catch((error) => {
        console.log("GET_BY_ID-----------", error);
        return error?.response?.data;
      });
  };

  create_inquiry = async (data) => {
    return await APIKit.post(AGENT.CREATE_INQUIRY, data)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };

  get_agent_filter = async () => {
    return await APIKit.get(AGENT.GET_AGENT_FILTERS)
      .then(handleResponse)
      .then((data) => data)
      .catch((error) => {
        return error?.response?.data;
      });
  };
}

const AgentApi = new Agent();
Object.freeze(AgentApi);
module.exports = AgentApi;
