import { HomeIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/Button";

const Navbar = () => {
  return (
    <nav className="px-5 py-2 w-full flex items-center justify-between  border-b shadow-sm backdrop-blur">
      <Button variant="ghost" size="sm" className="w-9 px-0" asChild>
        <Link to="/home" className="flex flex-row items-center gap-1">
          <HomeIcon />
          <span className="sr-only">Go home</span>
        </Link>
      </Button>
      <ModeToggle />
    </nav>
  );
};

export default Navbar;
