"use client";

import { createForm } from "@/actions/form/create";
import { ExtendedUser } from "@/auth";
import { Button } from "@/components/ui/button";
import { Form } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import { Session } from "next-auth";
import { useTransition } from "react";
import FormsTable from "./forms-table";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface FormListProps {
  user?: Session["user"] & ExtendedUser;
  formsData: Form[];
}

function FormList({ user, formsData }: FormListProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function onFormCreate() {
    startTransition(async () => {
      const { data, success, error } = await createForm();

      if (success) {
        router.push(`/form/${data.id}`);
        toast.success(success);
      } else {
        toast.error(error);
      }
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome back {user?.name}!
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your forms!
          </p>
        </div>

        <Button onClick={onFormCreate} disabled={isPending}>
          <PlusCircle className="w-4 h-4 mr-2" />
          New
        </Button>
      </div>

      {formsData.length === 0 ? (
        <div className="p-4 bg-card border rounded-md">
          <p className="text-muted-foreground">
            You don&apos;t have any forms yet. Click the &quot;New&quot; button
            to create one!
          </p>
        </div>
      ) : (
        <FormsTable data={formsData} />
      )}
    </div>
  );
}

export default FormList;
