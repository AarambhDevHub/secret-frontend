import { getSecretsVersionApi } from "@/API/api"
import type { PageServerLoad } from "./$types"
import { withActionHandler } from "@/API/actionUtils";

export const load: PageServerLoad = async ({ cookies, url, params }) => {
    let token = cookies.get('token');

    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = 10;

    const response = await withActionHandler(() => getSecretsVersionApi({ cookie: token as string, limit, page, id: params.id }));
    if(response.total_count != 0) {
        const totalPage = Math.ceil(response.total_count / limit);
        const pageIndex =  url.searchParams.get('page') ? parseInt(url.searchParams.get('page') || '1') : 1;
        return {
            secret: response.secret,
            counts: response.total_count,
            totalPage: totalPage,
            pageIndex: pageIndex,
        }
    }else {
        return {
            secret: [],
            counts: 0,
            totalPage: 0,
            pageIndex: 1,
        }
    }
}