import Sizebar from "../stock/components/sizebar";
import Tracking from "../tracking/page";

export default function Ordering() {
    return (
        <div className="w-full flex">
            <div>
                <Sizebar />
            </div>

            <div className="flex-1">
                <Tracking />
            </div>
        </div>
    )
}