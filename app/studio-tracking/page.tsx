import { Suspense } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { StudioTableWrapper } from "@/components/studio-table-wrapper"
import { StudioAnalyticsTable } from "@/components/studio-analytics-table"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default function StudioTrackingPage() {
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
      <SidebarInset>
        <SiteHeader title="Studio Tracking" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    Manage and monitor game studios you want to track
                  </p>
                </div>

                <Tabs defaultValue="management" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="management">Studio Management</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics & Reports</TabsTrigger>
                  </TabsList>

                  <TabsContent value="management" className="space-y-4">
                    <Suspense fallback={<div>Loading...</div>}>
                      <StudioTableWrapper />
                    </Suspense>
                  </TabsContent>

                  <TabsContent value="analytics" className="space-y-4">
                    <Card className="p-4">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold">Studio Analytics</h3>
                        <p className="text-sm text-muted-foreground">
                          Track studio performance and game releases with date range filtering
                        </p>
                      </div>
                      <StudioAnalyticsTable />
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}