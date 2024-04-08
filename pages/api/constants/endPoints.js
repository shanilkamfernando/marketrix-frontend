export const ADMIN_AUTH = {
  LOGIN: "admin/user/login",
  PROFILE: "",
  FORGOT_PASSWORD: "admin/user/forgot_password",
  RESET_PASSWORD: "admin/user/reset_password",
  GOOGLE_LOGIN: "admin/user/google_login",
};

export const CLIENT_AUTH = {
  LOGIN: "client/client/login",
  LOGIN_WITH_MEETING_TOKEN: "client/client/login_with_token",
  PROFILE: "",
};

export const COMPONENT = {
  GET_ALL: "components/component/get-all-compdata",
  GET_BY_PAGE: "components/component/get-compdata-by-page",
};

export const MEETING = {
  CLIENT_JOIN: "videoSDK/video_sdk/client_join_meeting",
  USER_JOIN: "videoSDK/video_sdk/user_join_meeting",
  TOKEN_JOIN: "videoSDK/video_sdk/token_join_meeting",
  GUEST_JOIN: "videoSDK/video_sdk/guest_join_meeting",
  ADMIN_JOIN: "videoSDK/video_sdk/admin_join_meeting",
  //    END_MEETING: 'videoSDK/video_sdk/end_meeting',
  MEETING_CREATE: "admin/meeting/create_meeting",
  UPDATE_PITCH: "admin/meeting/update/",
  UPDATE_CLIENTS: "admin/meeting/update_clients/",
  GET_ALL: "admin/meeting/all",
  START_MEETING: "videoSDK/video_sdk/create_meeting",
  END_MEETING: "admin/meeting/end_meeting/",
  RESEND_EMAIL: "admin/email/resend_email/",
  RESEND_EMAIL_V2: "admin/email/resend_email_v2",
  DELETE_MEETING: "admin/meeting/delete/",
  GET_COUNT: "admin/meeting/count",
};

export const COMPANY = {
  CREATE_COMPANY: "admin/client/create_company",
  GET_ALL: "admin/client/all_companies",
  GET_BY_ID: "admin/client/company_profile/",
  UPDATE_COMPANY: "admin/client/update_company/",
  DELETE_COMPANY: "admin/client/delete_company/",
  UPLOAD_COMPANY_LOGO: "admin/client/upload_company_logo",
};

export const CLIENT = {
  CLIENT_CREATE: "admin/client/create_client",
  GET_ALL: "admin/client/all",
  GET_BY_ID: "admin/client/profile/",
  CLIENT_UPDATE: "admin/client/update/",
  DELETE_CLIENT: "admin/client/delete/",
  UPLOAD_CLIENT_LOGO: "admin/client/upload_client_logo",
};

export const USER = {
  USER_CREATE: "admin/user/register",
  USER_SIGN_UP: "admin/user/self_register_admin",
  ADD_TENANT: "admin/user/add_tenant/",
  ADD_USERS: "admin/user/add_users/",
  GET_ALL: "admin/user/all",
  GET_BY_ID: "admin/user/profile/",
  USER_UPDATE: "admin/user/update/",
  DELETE_USER: "admin/user/delete/",
  UPLOAD_USER_LOGO: "admin/user/upload_user_logo",
  UPLOAD_USER_VIDEO: "admin/user/upload_user_video",
  UPLOAD_USER_VIDEO_TEST: "admin/user/upload_user_video_test",
  GET_ALL_USER_VIDEOS: "admin/user/all_user_videos",
};

export const USER_ROLE = {
  GET_ALL: "admin/user_role/all",
};

export const LIVE_INQUIRY = {
  CREATE: "meet-live/inquiries/create_live",
  GET_ALL: "meet-live/inquiries/all",
  GET_ALL_IO: "meet-live/inquiries/all-incoming-ongoing",
  GET_BY_STATUS: "meet-live/inquiries/all/status/",
  UPDATE: "meet-live/inquiries/update/",
  DELETE: "meet-live/inquiries/delete/",
  GET_COUNT: "meet-live/inquiries/count",
  START_SESSION: "meet-live/inquiries/start_session/",
  END_SESSION: "meet-live/inquiries/end_session/",
  GET_ALL_LIVE_CONNECT: "meet-live/inquiries/all_live_connect",
  GET_SESSION_RECORDING: "meet-live/inquiries/all/recordings/",
  GET_ALL_SESSION_RECORDINGS: "meet-live/inquiries/all_recordings",
  GET_ALL_INQUIRIES_RECORDINGS: "meet-live/inquiries/all_inquiries_recordings",
};

export const LOGGED_IN_USER = {
  GET_USER: "general/user/get",
  VALIDATE_ADMIN_TOKEN: "general/user/validate-admin-token",
  VALIDATE_CLIENT_TOKEN: "general/user/validate-client-token",
};
export const RE_CAPTCHA = {
  VERIFY: "general/re_captcha/verify_captcha",
};

export const TENANT = {
  CREATE: "admin/tenant/create",
  UPDATE: "admin/tenant/update",
  SNIPPET_CODE: "admin/tenant/snippet_code",
  GET_TENANT: "admin/tenant/get_tenant",
  UPLOAD_TENANT_LOGO: "admin/tenant/upload_tenant_logo",
};

export const AGENT = {
  GET_ALL: "admin/agents/all",
  GET_BY_ID: "admin/agents/get_by_id/",
  CREATE_INQUIRY: "admin/agent_inquiry/create",
  GET_AGENT_FILTERS: "general/data_arrays/get_agent_filter",
};

export const AVATAR_OPENAI = { 
  GET_REPLY: "avatar_openai/avatar_reply/get_reply",
  GET_TEXT_REPLY: "avatar_openai/avatar_reply/get_text_reply",
  GET_LOOP_REPLY: "avatar_openai/avatar_reply/get_loop_reply",
  GET_LOOP_REPLY_CONTINUE: "avatar_openai/avatar_reply/get_loop_reply_continue",
 
};

export const AVATAR = {
    CREATE: "avatar_openai/avatar/create", 
    CREATE_FORM_DATA: "avatar_openai/avatar/create_form_data",
    GET_ALL_DEMO_AVATARS: "avatar_openai/avatar_pre_defined/get_all",
    GET_AVATAR: "avatar_openai/avatar/get_avatar/",
    GET_ALL_AVATARS: "avatar_openai/avatar/get_all_avatars",
    DELETE_AVATAR: "avatar_openai/avatar/delete_avatar/",
    UPDATE: "avatar_openai/avatar/update/",
  };
