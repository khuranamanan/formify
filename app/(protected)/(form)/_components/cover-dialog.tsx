"use client";

import { updateForm } from "@/actions/form/update";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { defaultImages } from "@/constants/images";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { CoverSchema } from "@/schemas/cover";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface CoverDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  formId: string;
}

function CoverDialog({ open, onOpenChange, formId }: CoverDialogProps) {
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.error("Failed to get images from Unsplash");
        }
      } catch (error) {
        console.log(error);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, []);

  const form = useForm<z.infer<typeof CoverSchema>>({
    resolver: zodResolver(CoverSchema),
    defaultValues: {
      url: undefined,
    },
  });

  const formUnsplash = useForm<z.infer<typeof CoverSchema>>({
    resolver: zodResolver(CoverSchema),
    defaultValues: {
      url: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof CoverSchema>) {
    console.log("data", data);

    const { error, success } = await updateForm(formId, {
      coverImage: data.url,
    });

    if (error) {
      toast.error("Failed to add cover");
      console.log("error", error);
      return;
    }

    form.reset();
    onOpenChange(false);
    toast.success("Cover added successfully");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Cover</DialogTitle>
          <DialogDescription>Add a cover photo to your form</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="unsplash" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="unsplash">Unsplash</TabsTrigger>
            <TabsTrigger value="embed">Embed</TabsTrigger>
          </TabsList>
          <TabsContent value="unsplash">
            <Form {...formUnsplash}>
              <form
                onSubmit={formUnsplash.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  name="url"
                  control={formUnsplash.control}
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-3 gap-2 mb-2"
                        >
                          {isLoading ? (
                            <div className="animate-pulse bg-muted h-8 rounded-md" />
                          ) : (
                            images.map((image) => (
                              <FormItem
                                key={image.id}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem
                                    value={image.urls.regular}
                                    className="hidden"
                                    onClick={() => setSelectedImageId(image.id)}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal h-full w-full">
                                  <div
                                    className={cn(
                                      "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted h-auto w-auto"
                                    )}
                                  >
                                    <Image
                                      src={image.urls.thumb}
                                      alt="Unsplash image"
                                      className="object-cover rounded-sm"
                                      fill
                                    />
                                    {selectedImageId === image.id && (
                                      <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                                        <Check className="h-4 w-4 text-white" />
                                      </div>
                                    )}
                                    <Link
                                      href={image.links.html}
                                      target="_blank"
                                      className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
                                    >
                                      {image.user.name}
                                    </Link>
                                  </div>
                                </FormLabel>
                              </FormItem>
                            ))
                          )}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">Add Cover</Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="embed">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  name="url"
                  control={form.control}
                  render={({ field }) => (
                    <div className="space-y-1">
                      <Label htmlFor="url">Image URL</Label>
                      <Input id="url" {...field} type="url" />
                      <FormMessage />
                    </div>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">Add Cover</Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default CoverDialog;
