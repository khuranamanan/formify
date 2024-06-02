import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { QuestionWithOptions } from "@/types";
import { generateFormZodSchema } from "@/utils/generateFormZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Question } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FormRendererProps {
  questions: QuestionWithOptions[];
}

function FormRenderer({ questions }: FormRendererProps) {
  const FormSchema = generateFormZodSchema(questions);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div className="p-4 pl-[54px]">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          {questions.map((question) => {
            switch (question.type) {
              case "TEXT":
                return (
                  <FormField
                    control={form.control}
                    name={question.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{question.title}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          {question.description}
                        </FormDescription>
                        <FormMessage>
                          {JSON.stringify(form.formState.errors[question.id])}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                );
              case "TEXTAREA":
                return (
                  <FormField
                    control={form.control}
                    name={question.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{question.title}</FormLabel>
                        <FormControl>
                          <Textarea className="resize-none" {...field} />
                        </FormControl>
                        <FormDescription>
                          {question.description}
                        </FormDescription>
                        <FormMessage>
                          {JSON.stringify(form.formState.errors[question.id])}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                );
              case "RADIO":
                return (
                  <FormField
                    control={form.control}
                    name={question.id}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>{question.title}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {question.options?.map((option, index) => (
                              <FormItem
                                key={option.id}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem
                                    value={option.value.toString()}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {option.value}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          {question.description}
                        </FormDescription>
                        <FormMessage>
                          {JSON.stringify(form.formState.errors[question.id])}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                );
              case "SELECT":
                return (
                  <FormField
                    control={form.control}
                    name={question.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{question.title} </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an Option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {question.options?.map((option, index) => (
                              <SelectItem
                                key={option.id}
                                value={option.toString()}
                              >
                                {option.value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          {question.description}
                        </FormDescription>
                        <FormMessage>
                          {JSON.stringify(form.formState.errors[question.id])}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                );
              case "CHECKBOX":
                return (
                  <FormField
                    control={form.control}
                    name="items"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">
                            {question.title}
                          </FormLabel>
                          <FormDescription>
                            {question.description}
                          </FormDescription>
                        </div>
                        {question.options?.map((option, index) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name={question.id}
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={option.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...(field.value || []),
                                              option.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value: string) =>
                                                  value !== option.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {option.value}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        <FormMessage>
                          {JSON.stringify(form.formState.errors[question.id])}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                );
              case "DATE":
                return (
                  <FormField
                    control={form.control}
                    name={question.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{question.title}</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>
                          {question.description}
                        </FormDescription>
                        <FormMessage>
                          {JSON.stringify(form.formState.errors[question.id])}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                );
              case "TIME":
                return (
                  <FormField
                    control={form.control}
                    name={question.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{question.title}</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormDescription>
                          {question.description}
                        </FormDescription>
                        <FormMessage>
                          {JSON.stringify(form.formState.errors[question.id])}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                );
              case "NUMBER":
                return (
                  <FormField
                    control={form.control}
                    name={question.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{question.title}</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          {question.description}
                        </FormDescription>
                        <FormMessage>
                          {JSON.stringify(form.formState.errors[question.id])}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                );
              case "EMAIL":
                return (
                  <FormField
                    control={form.control}
                    name={question.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{question.title}</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormDescription>
                          {question.description}
                        </FormDescription>
                        <FormMessage>
                          {JSON.stringify(form.formState.errors[question.id])}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                );
              case "URL":
                return (
                  <FormField
                    control={form.control}
                    name={question.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{question.title}</FormLabel>
                        <FormControl>
                          <Input type="url" {...field} />
                        </FormControl>
                        <FormDescription>
                          {question.description}
                        </FormDescription>
                        <FormMessage>
                          {JSON.stringify(form.formState.errors[question.id])}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                );
              default:
                return null;
            }
          })}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default FormRenderer;
