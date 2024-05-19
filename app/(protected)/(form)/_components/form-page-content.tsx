"use client";

import { Form } from "@prisma/client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import Cover from "./cover";
import Toolbar from "./toolbar";
import FormNavbar from "./form-navbar";
import { updateForm } from "@/actions/form/update";

interface FormPageContentProps {
  form: Form;
}

function FormPageContent({ form }: FormPageContentProps) {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );

  return (
    <>
      <FormNavbar form={form} />

      <div className="pb-40 ">
        <Cover url={form.coverImage} formId={form.id} />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
          <Toolbar initialData={form} />
          <Editor
            onChange={async (value: string) => {
              console.log("changed");
              await updateForm(form.id, { description: value });
            }}
            initialContent={form.description}
          />
        </div>
      </div>
    </>
  );
}

export default FormPageContent;
