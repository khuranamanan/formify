import { ExtendedUser } from "@/auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

function UserInfo({ user, label }: UserInfoProps) {
  return (
    <Card className="max-w-[600px] w-full shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between flex-wrap gap-4 rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="truncate text-xs max-w-60 font-modo p-1 bg-muted rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between flex-wrap gap-4 rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="truncate text-xs max-w-60 font-modo p-1 bg-muted rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between flex-wrap gap-4 rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="truncate text-xs max-w-60 font-modo p-1 bg-muted rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between flex-wrap gap-4 rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="truncate text-xs max-w-60 font-modo p-1 bg-muted rounded-md">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between flex-wrap gap-4 rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Two Factor Authentication</p>
          <Badge variant={user?.isTwoFactorEnabled ? "default" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserInfo;
