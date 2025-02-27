import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Bell, HelpCircle, Settings, Grid } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="flex h-[10%] items-center justify-between px-4 py-2 dark:text-white light:bg-red-500 border-b shadow-sm">
      {/* Left Section */}
      <div className="flex items-center space-x-4  dark:text-white">
        <Grid className="w-6 h-6 text-gray-600  dark:text-white cursor-pointer" />
        <span className="text-sm  dark:text-white font-bold text-gray-800">
          XEOTEC CRM
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-sm font-medium  dark:text-white text-gray-700">
            Your work
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Recent work</DropdownMenuItem>
            <DropdownMenuItem>Starred projects</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-sm font-medium  dark:text-white text-gray-700">
            Projects
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All projects</DropdownMenuItem>
            <DropdownMenuItem>My projects</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-sm font-medium  dark:text-white text-gray-700">
            Filters
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Assigned to me</DropdownMenuItem>
            <DropdownMenuItem>Reported by me</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-sm font-medium  dark:text-white text-gray-700">
            Dashboards
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Default dashboard</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Middle Section */}

      {/* Right Section */}
      <div className="flex items-center space-x-4  dark:text-white">
        <Input placeholder="Search" className="w-40" />
        <Bell className="w-5 h-5  cursor-pointer" />
        <HelpCircle className="w-5 h-5  cursor-pointer" />
        <Settings className="w-5 h-5  cursor-pointer" />
        <ModeToggle />
        <Link to={"/admin/profile"}>
          {" "}
          <Avatar>
            <AvatarFallback>XC</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
