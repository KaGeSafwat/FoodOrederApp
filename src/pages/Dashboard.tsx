import ProfileInfo from "../components/dashboardComponents/ProfileInfo/ProfileInfo";
import QuickActions from "../components/dashboardComponents/QuickActions/QuickActions";

export default function Dashboard() {
  return (
    <div className="flex flex-col justify-around space-y-8">
      {/* Profile Information */}
      <ProfileInfo />

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}
