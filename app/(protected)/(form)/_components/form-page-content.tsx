"use client";

import { Form } from "@prisma/client";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import Cover from "./cover";
import Toolbar from "./toolbar";
import FormNavbar from "./form-navbar";
import { updateForm } from "@/actions/form/update";
import { Button } from "@/components/ui/button";
import { createFormField } from "@/actions/form/create-form-field";
import { PlusCircle } from "lucide-react";
import FormFieldDialog from "./form-field-dialog";
import FormRenderer from "./form-renderer";
import { FormWithQuestions } from "@/types";

interface FormPageContentProps {
  form: FormWithQuestions;
}

function FormPageContent({ form }: FormPageContentProps) {
  const [tabValue, setTabValue] = useState<"form" | "responses">("form");
  const [addFieldDialogOpen, setAddFieldDialogOpen] = useState(false);

  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );

  return (
    <>
      <FormNavbar
        form={form}
        tabValue={tabValue}
        setTabValue={(v: typeof tabValue) => setTabValue(v)}
      />

      {tabValue === "form" && (
        <div className="pb-40 relative">
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
            {/* {JSON.stringify(form, null, 2)} */}

            {form.questions.length > 0 && (
              <FormRenderer questions={form.questions} />
            )}

            <div className="fixed bottom-0 right-o left-0 p-4 w-full flex justify-center bg-background shadow-2xl">
              <Button onClick={() => setAddFieldDialogOpen(true)}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </div>
      )}

      {tabValue === "responses" && <div>Responses</div>}

      {addFieldDialogOpen && (
        <FormFieldDialog
          open={addFieldDialogOpen}
          onOpenChange={setAddFieldDialogOpen}
          formId={form.id}
        />
      )}
    </>
  );
}

export default FormPageContent;
