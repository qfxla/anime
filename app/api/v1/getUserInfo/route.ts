import { respData, respErr } from "@/lib/resp";
import { getUserInfo } from "@/models/user";

import { auth, currentUser } from "@clerk/nextjs";

export async function POST(req: Request) {
    try {
        const clerkId = auth().userId;
        if (!clerkId) {
            return respErr("not login");
        }
        let userInfo = {};
        const res = await getUserInfo(clerkId);
        userInfo = res[0]

        return respData(userInfo);
    } catch (e) {
        console.log("get user info failed", e);
        return respErr("get user info failed");
    }
}
