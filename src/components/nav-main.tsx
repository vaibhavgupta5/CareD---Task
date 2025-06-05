"use client"

import {  type Icon } from "@tabler/icons-react"
import React from "react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname, useRouter } from "next/navigation"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {

      const param = usePathname()
 

    console.log(items)

    console.log(param.slice(1))

    const router = useRouter()
  return (

    

    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
       
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem onClick={()=> router.push(`/${item.title.toLowerCase()}`)} className={`${param.slice(1) === item.title.toLowerCase() && "bg-[#007EFF] rounded-md hover:rounded:md text-white"} cursor-pointer `} key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
