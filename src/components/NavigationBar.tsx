import { Link, useNavigate } from "react-router-dom";
import navBarLogo from "../assets/books-logo.svg";
import aboutMiniLogo from "../assets/about-mini-logo.png";
import { BookText } from "lucide-react";

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
import { useAuthContext } from "@/context/AuthContext";

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
  const { isLoggedIn, setIsLoggedIn, setUser, libraryId, setLibraryId } =
    useAuthContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
    setLibraryId(null);
    navigate("/");
  };
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
                    <BookText className="h-6 w-6" />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-purple-200">
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] ">
                      {!isLoggedIn && (
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-purple-300 from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/about-us"
                            >
                              <img src={aboutMiniLogo} />
                              <div className=" text-xl font-medium">
                                About us
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Click here to find out more about our beautiful
                                team.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      )}
                      {isLoggedIn && (
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-purple-300 from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/books"
                            >
                              <img src={aboutMiniLogo} />
                              <div className=" text-xl font-medium">Books</div>
                              <p className="text-sm  text-black">
                                Start exploring, there are plenty books out
                                there!
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      )}
                      {!isLoggedIn && (
                        <>
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
                        </>
                      )}

                      {isLoggedIn && !libraryId && (
                        <ListItem
                          href="/add-library"
                          title="Library"
                          className="hover:bg-purple-300"
                        >
                          Check your favourite books
                        </ListItem>
                      )}
                      {isLoggedIn && (
                        <ListItem
                          href="/"
                          title="Books"
                          className="hover:bg-purple-300"
                        >
                          Add book
                        </ListItem>
                      )}
                      {isLoggedIn && libraryId && (
                        <ListItem
                          href={`/libraries/${libraryId}`}
                          title="Library"
                          className="hover:bg-purple-300"
                        >
                          Check your favourite books
                        </ListItem>
                      )}

                      {isLoggedIn && (
                        <ListItem
                          href="/"
                          title="Logout"
                          onClick={handleLogout}
                          className="hover:bg-purple-300"
                        >
                          See you soon...
                        </ListItem>
                      )}
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
