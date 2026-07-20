import Sizebar from "../stock/components/sizebar";
import StatementPage from "@/app/components/statementpage/page";
export default function Statement() {
    return (
        <div className="w-full flex">
            <div>
                <Sizebar />
            </div>
            <div className="flex-1">
                <StatementPage />
            </div>
        </div>
    )
}