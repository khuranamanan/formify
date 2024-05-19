import { Form } from "@prisma/client";
import Publish from "./publish";
import Menu from "./menu";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface FormNavbarProps {
  form: Form;
  tabValue: "form" | "responses";
  setTabValue: (value: FormNavbarProps["tabValue"]) => void;
}

function FormNavbar({ form, tabValue, setTabValue }: FormNavbarProps) {
  return (
    <nav className="px-3 py-2 w-full flex items-center flex-wrap gap-x-4">
      <Button variant="ghost" size="icon" asChild>
        <Link href="/dashboard">
          <ArrowLeft />
        </Link>
      </Button>

      <div className="min-w-0 flex flex-2 items-center">
        {!!form.icon && <p>{form.icon}</p>}
        <h1 className="text-sm truncate h-auto p-1">{form?.title}</h1>
      </div>

      <div className="flex-1 flex justify-center">
        <Tabs
          defaultValue="unsplash"
          value={tabValue}
          onValueChange={(v) => setTabValue(v as typeof tabValue)}
        >
          <TabsList>
            <TabsTrigger value="form">Form</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex items-center gap-x-2">
        <Publish initialData={form} />
        <Menu formId={form.id} />
      </div>
    </nav>
  );
}

export default FormNavbar;
