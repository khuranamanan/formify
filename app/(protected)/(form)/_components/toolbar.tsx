"use client";

import { ElementRef, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { Form } from "@prisma/client";
import IconPicker from "./icon-picker";
import { updateForm } from "@/actions/form/update";
import CoverDialog from "./cover-dialog";

interface ToolbarProps {
  initialData: Form;
  preview?: boolean;
}

function Toolbar({ initialData, preview }: ToolbarProps) {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);
  const [coverDialogOpen, setCoverDialogOpen] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function enableInput() {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  }

  function disableInput() {
    setIsEditing(false);
  }

  function onInput(value: string) {
    setValue(() => value);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      await updateForm(initialData.id, { title: value || "Untitled" });
    }, 500);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  }

  async function onIconSelect(icon: string) {
    await updateForm(initialData.id, { icon });
  }

  async function onRemoveIcon() {
    await updateForm(initialData.id, { icon: null });
  }

  return (
    <>
      <div className="pl-[54px] group relative">
        {!!initialData.icon && !preview && (
          <div className="flex items-center gap-x-2 group/icon pt-6">
            <IconPicker onChange={onIconSelect}>
              <p className="text-6xl hover:opacity-75 transition">
                {initialData.icon}
              </p>
            </IconPicker>
            <Button
              onClick={onRemoveIcon}
              className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
              variant="outline"
              size="icon"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        {!!initialData.icon && preview && (
          <p className="text-6xl pt-6">{initialData.icon}</p>
        )}
        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
          {!initialData.icon && !preview && (
            <IconPicker asChild onChange={onIconSelect}>
              <Button
                className="text-muted-foreground text-xs"
                variant="outline"
                size="sm"
              >
                <Smile className="h-4 w-4 mr-2" />
                Add icon
              </Button>
            </IconPicker>
          )}
          {!initialData.coverImage && !preview && (
            <Button
              onClick={() => setCoverDialogOpen(true)}
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Add cover
            </Button>
          )}
        </div>
        {isEditing && !preview ? (
          <TextareaAutosize
            ref={inputRef}
            onBlur={disableInput}
            onKeyDown={onKeyDown}
            value={value}
            onChange={(e) => onInput(e.target.value)}
            className="text-5xl bg-transparent font-bold break-words outline-none resize-none"
          />
        ) : (
          <div
            onClick={enableInput}
            className="pb-[11.5px] text-5xl font-bold break-words outline-none"
          >
            {initialData.title}
          </div>
        )}
      </div>

      {coverDialogOpen && (
        <CoverDialog
          open={coverDialogOpen}
          onOpenChange={(v: boolean) => setCoverDialogOpen(v)}
          formId={initialData.id}
        />
      )}
    </>
  );
}

export default Toolbar;
