import { getFormById } from "@/actions/form/get-form-by-id";
import FormPageContent from "../../_components/form-page-content";

interface FormIdPageProps {
  params: {
    formId: string;
  };
}

async function FormIdPage({ params }: FormIdPageProps) {
  const { formId } = params;
  const { data, error } = await getFormById(formId);

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

  return <FormPageContent form={data} />;
}

export default FormIdPage;
