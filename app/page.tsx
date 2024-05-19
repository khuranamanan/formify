import { PencilIcon } from "@/assets/icons";
import LoginButton from "@/components/auth/login-button";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-full">
      <div className="space-y-6 text-center">
        <div className="flex justify-center items-center gap-2">
          <PencilIcon className="h-12 w-12" />
          <h1 className="text-6xl font-semibold drop-shadow-md">Formify</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Formify is a form builder that helps you create beautiful forms and
          surveys.
        </p>
        <div>
          <LoginButton mode="modal" asChild>
            <Button variant="default" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
    </main>
  );
}
