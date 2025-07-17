"use client"
 
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { PersonIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import Link from "next/link";

const ProfilePicture = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
ProfilePicture.displayName = AvatarPrimitive.Root.displayName
 
const ProfilePictureImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
ProfilePictureImage.displayName = AvatarPrimitive.Image.displayName
 
const ProfilePictureFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))


type Props = {
  name: string;
  picture: string;
  html_url: string;
};


const Avatar = ({ name, picture, html_url }: Props) => {
  return (
    <Link
      className="no-underline hover:underline w-fit"
      href={html_url}
      >
      <div className="flex items-center gap-2 ">
        <ProfilePicture>
          <ProfilePictureImage src={picture} />
          <ProfilePictureFallback>
            <PersonIcon/>
          </ProfilePictureFallback>
        </ProfilePicture>
        <div className="text-l font-medium">by {name}</div>
      </div>
    </Link>
  );
};

export default Avatar;
