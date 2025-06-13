import { WelcomeCard } from "../../components";
import { Boxes, ClipboardCheck, PackageCheck, Users } from "lucide-react";
import { useUserStore } from "../../store/useUserStore";

function Welcome() {
  const { user } = useUserStore();

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Welcome {user.name}
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Manage and oversee the entire IT Inventory System from one place
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <WelcomeCard
            title="Inventory Overview"
            description="View and manage all IT assets and consumables."
            icon={<Boxes className="size-6.5" />}
          />
          <WelcomeCard
            title="Manage Approvals"
            description="Approve or reject issuance, disposal and trasfer requests."
            icon={<ClipboardCheck className="size-6.5" />}
          />
          <WelcomeCard
            title="Issue / Return Items"
            description="Manually issue or return items after approval."
            icon={<PackageCheck className="size-6.5" />}
          />
          <WelcomeCard
            title="User Management"
            description="Manage users and assign roles."
            icon={<Users className="size-6.5" />}
          />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
