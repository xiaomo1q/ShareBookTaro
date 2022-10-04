/**
 * 服务器路径
 */
const API_PATH = "/api";

export const InterfacePath = {
  login_code: API_PATH + "/login_code",
  login_user: API_PATH + "/login_user",
  get_userInfo: API_PATH + "/get_userInfo",

  get_book_type: API_PATH + "/get_book_type",
  add_only_book: API_PATH + "/add_only_book",
  get_connect_book_list: API_PATH + "/get_connect_book_list",
  get_book_list: API_PATH + "/get_book_list",
  search_book_list: API_PATH + "/search_book_list",
  get_only_book_detail: API_PATH + "/get_only_book_detail",
  get_favorite_book_list: API_PATH + "/get_favorite_book_list",
  add_favorite_book: API_PATH + "/add_favorite_book",

  get_exchange_square_list: API_PATH + "/get_exchange_square_list",
  add_exchange_square_detail: API_PATH + "/add_exchange_square_detail",

  get_bookuser_userInfo: API_PATH + "/get_bookuser_userInfo",

  add_messages: API_PATH + "/add_messages",

};
