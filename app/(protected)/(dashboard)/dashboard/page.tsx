import { getFormsByUserId } from "@/actions/form/get-forms-by-userId";
import { currentUser } from "@/lib/auth";
import React from "react";
import FormList from "../_components/form-list";

async function DashboardPage() {
  const session = await currentUser();
  const { data, error } = await getFormsByUserId(session?.id);

  if (error || !data) {
    return (
      <div className="p-4 flex flex-col gap-4">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="font-bold mr-2">Error!</span>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <FormList user={session} formsData={data} />
    </div>
  );
}

export default DashboardPage;
