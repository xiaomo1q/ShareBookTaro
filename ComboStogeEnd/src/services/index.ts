import { GETRequest, POSTRequest, DELETERequest, PUTRequest, POSTFormRequest } from '@/utils/net-requests';
import { ClassList, EXCELIMPORT, UPLOADIMG, ROUTE, DOWNLOAD } from '@/constants/server-api';

/**
 * 其他 请求
 */
/** GET */
export const GetClassList = (data: { pageCount: number, pageIndex: number }) => {
    // prams: any
    return GETRequest(ClassList, data);
}
/** POST */
export const PostClassList = (prams: any) => {
    return POSTRequest(ClassList, prams);
}
/** DELETE */
export const DeleteClassList = (prams: any) => {
    return DELETERequest(ClassList, prams);
}
/** PUT */
export const PUTClassList = (prams: any) => {
    return PUTRequest(ClassList, prams);
}
/** 上传excel */
export const ImportClassList = (prams: any) => {
    return POSTFormRequest(EXCELIMPORT, prams);
}
/** 上传img */
export const uploadImg = (prams: any) => {
    return POSTFormRequest(UPLOADIMG, prams);
}
/** 路由 */
export const IndexRoute = (data: any) => {
    return GETRequest(ROUTE, data);
}
/** 导出 */
export async function downloadFile(): Promise<any> {
    return GETRequest(DOWNLOAD);
}
