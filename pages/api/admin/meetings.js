const APIKit = require("../config").default;
const { handleResponse } = require("../config");
const { MEETING } = require("../constants/endPoints");
const ClientApi = require('./clients');
const CompanyApi = require('./companies');

class Meeting {


    // Customer and Meeting Details IOnvolved
    create_pitch = async (pitchData, user_id) => {

        // console.log('pitchData', pitchData)
        let newUserId = user_id

        if (newUserId == 0) {
            // Create Client and await untill Client ID return
            const clientData = {
                email: pitchData.email,
                firstname: pitchData.firstname,
                lastname: pitchData.lastname,
                contact_no: pitchData.contact_no,
                password: pitchData.password,
                company: pitchData.company,
                client_company_id: null

            }

            if (clientData.company) {
                console.log("NEW COMPANY")

                let createCompany = await CompanyApi.create_company({ name: pitchData.company })

                // const companyData = {
                //     name: createCompany.data.name,
                //     client_company_id: createCompany.data.id
                // }

                clientData.client_company_id = createCompany.data.id 

                console.log("NEW clientData",clientData)
            }
            let createClient = await ClientApi.create_client(clientData)

            newUserId = createClient.data.id

        }

        if (newUserId > 0) {

            // Create Meeting
            const meetingData = {
                client_id: newUserId,
                client_email: pitchData.email,
                pitch_title: pitchData.pitch_title,
                time_zone: pitchData.time_zone,
                time_zone_string: pitchData.time_zone_string,
                start_time: pitchData.start_time,
                end_time: pitchData.end_time,
                deal: pitchData.deal,
                password: pitchData.password,
                minutes: pitchData.minutes
            }
            // console.log('meetingData', meetingData)

            return await APIKit.post(MEETING.MEETING_CREATE, meetingData)
                .then(handleResponse)
                .then(data => {
                    //   alert("Meeting Created Successfully....... ")
                    return data;
                })
                .catch(error => {
                    // alert(error?.response?.data.message)
                    return error?.response?.data;
                })

        }

    } //createPitch


    update_pitch = async (pitchData) => {

        console.log("update_pitch", pitchData)
        const id = pitchData.meeting_id

        const meetingData = {
            pitch_title: pitchData.pitch_title,
            time_zone: pitchData.time_zone,
            time_zone_string: pitchData.time_zone_string,
            start_time: pitchData.start_time,
            end_time: pitchData.end_time,
            deal: pitchData.deal,
            minutes: pitchData.minutes
        }


        return await APIKit.post(MEETING.UPDATE_PITCH + `${id}`, meetingData)
            .then(handleResponse)
            .then(data => {
                return data;
            })
            .catch(error => {
                if (error?.response) {
                    return error?.response?.data;
                }
                else {
                    return error;
                }
            })


    }

    update_clients = async (clients, id) => {

        return await APIKit.post(MEETING.UPDATE_CLIENTS + `${id}`, clients)
            .then(handleResponse)
            .then(data => {
                return data;
            })
            .catch(error => {
                if (error?.response) {
                    return error?.response?.data;
                }
                else {
                    return error;
                }
            })
    }

    get_meetings = async () => {
        return await APIKit.get(MEETING.GET_ALL,)
            .then(handleResponse)
            .then(data => {
                return data;
            })
            .catch(error => {
                if (error?.response) {
                    return error?.response?.data;
                }
                else {
                    return error;
                }

            })
    }

    start_meeting = async (req) => {
        return await APIKit.post(MEETING.START_MEETING, req)
            .then(handleResponse)
            .then(data => {
                return data;
            })
            .catch(error => {

                if (error?.response) {
                    console.log("ERROR1", error)
                    return error?.response?.data;
                }
                else {
                    console.log("ERROR2", error)
                    return error;
                }
            })
    }


    admin_join = async (req) => {
        return await APIKit.post(MEETING.ADMIN_JOIN, req)
            .then(handleResponse)
            .then(data => {
                //  console.log("ADMIN_JOIN", data)
                return data;
            })
            .catch(error => {
                // console.log("ADMIN_JOIN", error)
                if (error?.response) {
                    return error?.response?.data;
                }
                else {
                    return error;
                }
            })
    }
    end_meeting = async (req) => {

        return await APIKit.post(MEETING.END_MEETING, req)
            .then(handleResponse)
            .then(data => {
                return data;
            })
            .catch(error => {
                return error?.response?.data;
            })
    }

    delete_meeting = async (meeting_id) => {

        return await APIKit.delete(MEETING.DELETE_MEETING + `${meeting_id}`)
            .then(handleResponse)
            .then(data => {
                return data;
            })
            .catch(error => {
                // console.log("GET_ALL---------- failed", error)
                return error?.response?.data;
            })
    }



    resend_email = async (meeting_id) => {

        return await APIKit.get(MEETING.RESEND_EMAIL + `${meeting_id}`)
            .then(handleResponse)
            .then(data => {
                return data;
            })
            .catch(error => {

                return error?.response?.data;
            })
    }
    resend_email_v2 = async (pitch) => {

        return await APIKit.post(MEETING.RESEND_EMAIL_V2, pitch)
            .then(handleResponse)
            .then(data => {
                return data;
            })
            .catch(error => {

                return error?.response?.data;
            })
    }

    getMeetCounts = async () => {
        return await APIKit.get(MEETING.GET_COUNT)
            .then(handleResponse)
            .then(data => {
                return data
            })
            .catch(error => {
                return error?.response?.data;
            })
    }

}

const MeetingApi = new Meeting;
Object.freeze(MeetingApi);
module.exports = MeetingApi;