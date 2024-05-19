import { createFormField } from "@/actions/form/create-form-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { AddFormFieldSchema } from "@/schemas/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface FormFieldDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  formId: string;
}

function FormFieldDialog({ open, onOpenChange, formId }: FormFieldDialogProps) {
  const form = useForm<z.infer<typeof AddFormFieldSchema>>({
    resolver: zodResolver(AddFormFieldSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "TEXT",
      required: false,
      options: [{ value: "" }, { value: "" }],
    },
  });

  const typeWatch = form.watch("type");

  const fieldArray = useFieldArray({
    name: "options",
    control: form.control,
  });

  async function onSubmit(data: z.infer<typeof AddFormFieldSchema>) {
    const { error, success } = await createFormField(formId, data);

    if (error) {
      toast.error(error);
      console.error(error);
      return;
    }

    toast.success(success);
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add Form Field</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="required"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Required</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a field" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="TEXT">Text</SelectItem>
                      <SelectItem value="TEXTAREA">Textarea</SelectItem>
                      <SelectItem value="RADIO">Radio</SelectItem>
                      <SelectItem value="CHECKBOX">Checkbox</SelectItem>
                      <SelectItem value="SELECT">Select</SelectItem>
                      <SelectItem value="DATE">Date</SelectItem>
                      <SelectItem value="TIME">Time</SelectItem>
                      <SelectItem value="NUMBER">Number</SelectItem>
                      <SelectItem value="EMAIL">Email</SelectItem>
                      <SelectItem value="URL">URL</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {(typeWatch === "RADIO" ||
              typeWatch === "CHECKBOX" ||
              typeWatch === "SELECT") && (
              <>
                {fieldArray.fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    name={`options.${index}.value`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-2 items-center">
                          <FormLabel className="text-nowrap">
                            Option {index + 1}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={`Option ${index + 1}`}
                              {...field}
                            />
                          </FormControl>
                          <Button
                            size="icon"
                            onClick={() => fieldArray.remove(index)}
                            type="button"
                            className="shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        <FormMessage>
                          {form.formState.errors.options?.root?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                ))}

                <Button
                  onClick={() => fieldArray.append({ value: "" })}
                  type="button"
                >
                  Add Option
                </Button>
              </>
            )}

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default FormFieldDialog;
