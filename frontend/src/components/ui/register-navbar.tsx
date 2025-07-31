// src/components/Navbar.tsx
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

export default function Navbar() {
  return (
    <nav className="border-b px-6 py-4 shadow-sm">
      <NavigationMenu>
        <NavigationMenuList className="gap-4">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/" className={cn("font-medium text-sm hover:text-blue-600")}>
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/register" className="font-medium text-sm hover:text-blue-600">
                Register
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/login" className="font-medium text-sm hover:text-blue-600">
                Login
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>


        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
