import { Form } from "@prisma/client";
import Publish from "./publish";
import Menu from "./menu";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface FormNavbarProps {
  form: Form;
}

function FormNavbar({ form }: FormNavbarProps) {
  return (
    <nav className="px-3 py-2 w-full flex items-center gap-x-4">
      <Button variant="ghost" size="icon" asChild>
        <Link href="/dashboard">
          <ArrowLeft />
        </Link>
      </Button>

      <div className="flex-1 min-w-0 flex flex-2 items-center">
        {!!form.icon && <p>{form.icon}</p>}
        <h1 className="text-sm truncate h-auto p-1">{form?.title}</h1>
      </div>

      <div className="flex items-center gap-x-2">
        <Publish initialData={form} />
        <Menu formId={form.id} />
      </div>
    </nav>
  );
}

export default FormNavbar;
