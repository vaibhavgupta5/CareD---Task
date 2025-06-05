"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useUser } from "@/store/zustStore";
import HealthArticle from "@/components/health-article";

export default function Page() {
  const { mood } = useUser();
  console.log(mood);



  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="bg-[#007EFF]/5">
        <SiteHeader />

        <div className="p-8 flex flex-col gap-3">
        
        <HealthArticle/>
         
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
