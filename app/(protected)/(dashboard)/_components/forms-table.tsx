import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Form } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import {
  ArchiveRestore,
  ArchiveX,
  Copy,
  MoreVertical,
  Pencil,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { deleteForm } from "@/actions/form/delete";
import { toast } from "sonner";
import { updateForm } from "@/actions/form/update";

interface FormsTableProps {
  data: Form[];
}

function FormsTable({ data }: FormsTableProps) {
  async function onFormDelete(formId: string) {
    try {
      await deleteForm(formId);
      toast.success("Form deleted successfully!");
    } catch (error) {
      toast.error("Error deleting form");
    }
  }

  async function onFormPublishChange(formId: string, value: boolean) {
    try {
      await updateForm(formId, { isPublished: value });
      toast.success("Form updated successfully!");
    } catch (error) {
      toast.error("Error updating form");
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((form) => (
          <TableRow key={form.id}>
            <TableCell>
              <Link href={`/form/${form.id}`}>
                {form.icon && <span className="mr-2">{form.icon}</span>}
                {form.title}
              </Link>
            </TableCell>
            <TableCell>
              {form.isPublished ? (
                <Badge>Published</Badge>
              ) : (
                <Badge variant="outline">Draft</Badge>
              )}
            </TableCell>
            <TableCell>{format(form.createdAt, "dd, MMM yyyy")}</TableCell>
            <TableCell>{format(form.updatedAt, "dd, MMM yyyy")}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() =>
                      onFormPublishChange(form.id, !form.isPublished)
                    }
                  >
                    {form.isPublished ? (
                      <>
                        <ArchiveX className="mr-2 w-4 h-4" />
                        Retract
                      </>
                    ) : (
                      <>
                        <ArchiveRestore className="mr-2 w-4 h-4" />
                        Publish
                      </>
                    )}
                  </DropdownMenuItem>
                  {form.isPublished && (
                    <DropdownMenuItem>
                      <Copy className="mr-2 w-4 h-4" />
                      Copy Link
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <Pencil className="mr-2 w-4 h-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => onFormDelete(form.id)}
                  >
                    <Trash className="mr-2 w-4 h-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default FormsTable;
