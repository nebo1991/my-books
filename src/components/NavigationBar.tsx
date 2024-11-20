import { Link } from "react-router-dom";
import navBarLogo from "../assets/books-logo.svg";
import aboutMiniLogo from "../assets/about-mini-logo.png";
import * as React from "react";
import { cn } from "../lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

const NavigationBar = () => {
  return (
    <>
      <div className="pb-4">
        <div className="flex justify-between">
          <Link to="/">
            <img
              alt="books-logo"
              src={navBarLogo}
              className="w-[100px] mx-8 "
            />
          </Link>

          <div className="mx-8 my-8">
            <NavigationMenu className="bg-transparent hover:bg-transparent focus:bg-transparent">
              <NavigationMenuList>
                <NavigationMenuItem>
                  {/* TODO: @nebo - Also conditional for different text once User is logged in. */}
                  <NavigationMenuTrigger className="bg-transparent">
                    Getting started
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-purple-200">
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] ">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-purple-300 from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/about-us"
                          >
                            <img src={aboutMiniLogo} />
                            <div className=" text-xl font-medium">About us</div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Click here to find out more about our beautiful
                              team.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem
                        href="/sign-in"
                        title="Login"
                        className="hover:bg-purple-300"
                      >
                        Login to your account
                      </ListItem>
                      <ListItem
                        href="/sign-up"
                        title="Sign up"
                        className="hover:bg-purple-300"
                      >
                        Dont have account yet?
                      </ListItem>
                      {/* This will be rendered later when condition is introduced */}

                      {/* TODO: @nebo1991 */}
                      {/* <ListItem
                        href="/"
                        title="Logout"
                      >
                        See you soon...
                      </ListItem> */}
                      {/* TODO: @nebo1991 */}
                      {/* <ListItem
                        href="/libraries"
                        title="Library"
                      >
                        Check your favourite books
                      </ListItem> */}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;