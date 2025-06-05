"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useUser } from "@/store/zustStore";
import HealthArticle from "@/components/health-article";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { mood, email } = useUser();
  console.log(mood);

  const router = useRouter()
    useEffect(() => {
  
      if(!email){
          router.push("/login")
      }
  
    }, [email, router])
  

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

        <div className="md:p-8 p-4 flex flex-col gap-3">
          <Suspense fallback={<p>Loading...</p>}>
            <HealthArticle />
          </Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
