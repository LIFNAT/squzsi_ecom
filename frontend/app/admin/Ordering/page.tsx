import Control from "@/app/components/Ordering/control";
import Sizebar from "../stock/components/sizebar";

export default function Ordering() {
    return (
        <div className="w-full flex">
            <div>
                <Sizebar />
            </div>
            <div className="flex-1">
                <Control/>
            </div>
        </div>
    )
}