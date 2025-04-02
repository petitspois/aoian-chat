"use server"
import { generateId } from "ai"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Chat } from "@/components/chat"
import { getModels } from "@/lib/config/models"

export default async function Page() {
  const id = generateId()
  const models = await getModels()
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset  className="h-screen">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <div className="flex flex-col min-h-0 grow">
          <Chat id={id} models={models} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
