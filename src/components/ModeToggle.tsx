import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";

import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";

export function ModeToggle() {
  const changeTheme = (theme: string) => {
    const html = document.querySelector("html");
    if (html) {
      html.style.colorScheme = theme;
    }

    const app_root = document.querySelector(".app_root");
    if (app_root) {
      app_root.classList.remove("light", "dark", "system");
      app_root.classList.add(theme);
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 px-0">
            <SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => changeTheme("light")}>
            <SunIcon className="mr-2 h-4 w-4" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeTheme("dark")}>
            <MoonIcon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeTheme("system")}>
            <LaptopIcon className="mr-2 h-4 w-4" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
