import { POSTRequest, GETRequest, PUTRequest } from "../utils/net-requests";
import { InterfacePath } from "./interfacePath";

/**
 * 获取 token
 */
export const Get_Data = () => {
  return GETRequest(InterfacePath.Get_Data, {});
};