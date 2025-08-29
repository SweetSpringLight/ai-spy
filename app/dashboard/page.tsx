import { AppSidebar } from "@/components/app-sidebar"
// import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
// import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/protected-route"

import gameData from "./data.json"

// Fake analytics data
const analyticsData = {
  totalGames: 1250,
  newGamesThisWeek: 45,
  trendingGenres: ["Merge", "Pixel Art", "Anime"],
  topArtStyles: ["2D", "Pixel", "3D Cartoon"],
  recentTrends: [
    { name: "Merge Games", growth: "+25%", status: "up" },
    { name: "Pixel Art", growth: "+15%", status: "up" },
    { name: "Anime Style", growth: "+10%", status: "up" }
  ]
}

export default function Page() {
  return (
    <ProtectedRoute>
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
        <SiteHeader title="Dashboard" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Analytics Overview Cards */}
              <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-4 lg:px-6">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold">Total Games Tracked</h3>
                  <p className="mt-2 text-3xl font-bold">{analyticsData.totalGames}</p>
                  <p className="text-sm text-gray-500">Active games in database</p>
                </Card>
                <Card className="p-4">
                  <h3 className="text-lg font-semibold">New This Week</h3>
                  <p className="mt-2 text-3xl font-bold">{analyticsData.newGamesThisWeek}</p>
                  <p className="text-sm text-gray-500">Recently added games</p>
                </Card>
                <Card className="p-4">
                  <h3 className="text-lg font-semibold">Trending Genres</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {analyticsData.trendingGenres.map((genre) => (
                      <Badge key={genre} variant="secondary">{genre}</Badge>
                    ))}
                  </div>
                </Card>
                <Card className="p-4">
                  <h3 className="text-lg font-semibold">Top Art Styles</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {analyticsData.topArtStyles.map((style) => (
                      <Badge key={style} variant="outline">{style}</Badge>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Trend Chart */}
              {/* <div className="px-4 lg:px-6">
                <Card className="p-4">
                  <h3 className="mb-4 text-lg font-semibold">Market Trends</h3>
                  <ChartAreaInteractive />
                </Card>
              </div> */}

              {/* Recent Games Table */}
              <div className="px-4 lg:px-6">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold">Recent Game Releases</h3>
                  <DataTable data={gameData.slice(0, 10)} />
                </Card>
              </div>
            </div>
          </div>
        </div>
              </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
