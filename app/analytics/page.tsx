import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"

// Fake analytics data for AI analysis
const aiAnalytics = {
  artStyleTrends: [
    { style: "Pixel Art", confidence: 0.95, growth: "+28%", games: 156 },
    { style: "Anime", confidence: 0.92, growth: "+22%", games: 143 },
    { style: "3D Cartoon", confidence: 0.88, growth: "+15%", games: 98 },
    { style: "Realistic 3D", confidence: 0.85, growth: "+10%", games: 67 },
  ],
  genreInsights: [
    {
      genre: "Merge Games",
      trend: "Rising",
      keyFeatures: ["Cute Characters", "Collection Mechanics", "Simple Controls"],
      targetAudience: "Casual Gamers",
    },
    {
      genre: "Pixel RPG",
      trend: "Hot",
      keyFeatures: ["Retro Style", "Deep Gameplay", "Story-driven"],
      targetAudience: "Core Gamers",
    },
    {
      genre: "Anime Battle",
      trend: "Stable",
      keyFeatures: ["Action Combat", "Character Collection", "PvP Features"],
      targetAudience: "Anime Fans",
    },
  ],
  marketPredictions: [
    "Increasing demand for nostalgic pixel art games",
    "Growing market for casual merge mechanics",
    "Rising popularity of anime-style action games",
    "Trend towards hybrid casual-core gameplay",
  ],
}

export default function AnalyticsPage() {
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
        <SiteHeader title="AI Analytics" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Art Style Analysis */}
              <div className="px-4 lg:px-6">
                <Card className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">Art Style Analysis</h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {aiAnalytics.artStyleTrends.map((style) => (
                      <Card key={style.style} className="p-4">
                        <h3 className="text-lg font-semibold">{style.style}</h3>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between">
                            <span>Confidence:</span>
                            <Badge variant="secondary">{(style.confidence * 100).toFixed(0)}%</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Growth:</span>
                            <Badge variant="success">{style.growth}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Games:</span>
                            <span className="font-semibold">{style.games}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Market Trends Chart */}
              <div className="px-4 lg:px-6">
                <Card className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">Market Trends</h2>
                  <ChartAreaInteractive />
                </Card>
              </div>

              {/* Genre Insights */}
              <div className="px-4 lg:px-6">
                <Card className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">Genre Insights</h2>
                  <div className="grid gap-4 md:grid-cols-3">
                    {aiAnalytics.genreInsights.map((genre) => (
                      <Card key={genre.genre} className="p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{genre.genre}</h3>
                          <Badge variant="outline">{genre.trend}</Badge>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div>
                            <p className="text-sm font-medium">Key Features:</p>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {genre.keyFeatures.map((feature) => (
                                <Badge key={feature} variant="secondary">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Target Audience:</p>
                            <p className="text-sm text-gray-500">{genre.targetAudience}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Market Predictions */}
              <div className="px-4 lg:px-6">
                <Card className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">AI Market Predictions</h2>
                  <div className="space-y-4">
                    {aiAnalytics.marketPredictions.map((prediction, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-lg border p-4"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          {index + 1}
                        </span>
                        <p className="text-lg">{prediction}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}