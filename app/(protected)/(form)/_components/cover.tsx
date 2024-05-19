"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import { updateForm } from "@/actions/form/update";
import { toast } from "sonner";

interface CoverImageProps {
  url: string | null;
  preview?: boolean;
  formId: string;
}

function Cover({ url, preview, formId }: CoverImageProps) {
  async function onRemove() {
    const { error, success } = await updateForm(formId, { coverImage: null });

    if (error) {
      toast.error("Failed to remove cover image");
      console.error("Failed to remove cover image");
      return;
    }

    toast.success("Cover image removed successfully");
  }

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          {/* <Button
            onClick={() => {}}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button> */}
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cover;
