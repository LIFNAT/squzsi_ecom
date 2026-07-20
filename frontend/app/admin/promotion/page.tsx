import Sizebar from "../stock/components/sizebar";
import Controlpromotion from "./component/controlpromotion";



export default function pagepromotion() {
    return (
        <div className="w-full flex">
            <div>
                <Sizebar />
            </div>

            <div className="flex-1">
                <Controlpromotion />
            </div>
        </div>
    )
}