'use client'
import Link from "next/link";
import DarkModeButton from "@/components/ui/dark-mode-button";
import Container from "@/components/ui/container";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

const MainHeader = () => {
  return (
    <>
      <Container>
        <section className="flex flex-row items-center justify-between py-[16px] lg:py-[24px]">
          <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tighter leading-tight md:pr-8">
            <Link href={`/`} className="">
              octotype.
            </Link>
          </h1>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/about" className={navigationMenuTriggerStyle()} asChild>
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/docs" className={navigationMenuTriggerStyle()} asChild>
                  Docs
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <DarkModeButton />
        </section>
      </Container>
    </>
  );
};

export default MainHeader;