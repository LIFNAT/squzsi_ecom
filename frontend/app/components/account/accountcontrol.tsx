import { propsaccount } from "@/app/admin/account/page";
import Accountuser from "./sections/accountuser";
import Scoremanagement from "./sections/scoremanagement";

interface propsAccountcontrol {
    respodaw: propsaccount[]
}

export default function Accountcontrol({ respodaw }: propsAccountcontrol) {
    return (
        <div className="mx-auto w-full px-10 h-full py-10">
            <Scoremanagement respodaw={respodaw} />
            <div className="my-10">
                <Accountuser respodaw={respodaw} />
            </div>
        </div>
    )
}