import ProfileInfo from "../components/dashboardComponents/ProfileInfo";
import QuickActions from "../components/dashboardComponents/QuickActions";

export default function Dashboard() {
  return (
    <div className="h-full flex flex-col">
      {/* Profile Information */}
      <ProfileInfo />

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}
