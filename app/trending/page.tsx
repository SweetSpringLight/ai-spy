import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, Share2, Code, ChevronLeft, ChevronRight, MoreVertical, HelpCircle } from "lucide-react"

export default function TrendingPage() {
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
        <SiteHeader title="Trending" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {/* Filter Bar */}
            <div className="bg-muted/50 border-b px-4 lg:px-6 py-3">
              <div className="flex items-center gap-4">
                <Select defaultValue="vietnam">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vietnam">Việt Nam</SelectItem>
                    <SelectItem value="global">Toàn cầu</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="12months">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12months">12 tháng qua</SelectItem>
                    <SelectItem value="6months">6 tháng qua</SelectItem>
                    <SelectItem value="3months">3 tháng qua</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="allcategories">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="allcategories">Tất cả danh mục</SelectItem>
                    <SelectItem value="entertainment">Giải trí</SelectItem>
                    <SelectItem value="technology">Công nghệ</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="websearch">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="websearch">Tìm kiếm trên web</SelectItem>
                    <SelectItem value="imagesearch">Tìm kiếm hình ảnh</SelectItem>
                    <SelectItem value="videosearch">Tìm kiếm video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <h1 className="text-2xl font-bold tracking-tight">Xu hướng tìm kiếm</h1>
                <p className="text-muted-foreground">
                  Dữ liệu xu hướng và phân tích
                </p>
              </div>

              {/* Two Panels Container */}
              <div className="px-4 lg:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  {/* Left Panel - Search Topics */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">Chủ đề tìm kiếm</h3>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Select defaultValue="increase">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="increase">Gia tăng</SelectItem>
                            <SelectItem value="decrease">Giảm sút</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Code className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { number: 1, topic: "Kết quả - Chủ đề", value: "Đột phá" },
                          { number: 2, topic: "2025 - Chủ đề", value: "+2.450%" },
                          { number: 3, topic: "Xoi Lac TV - Mạng truyền hình", value: "+2.050%" },
                          { number: 4, topic: "ChatGPT - Phần mềm máy tính", value: "+450%" },
                          { number: 5, topic: "Trò chuyện trực tuyến - Chủ đề", value: "+300%" }
                        ].map((item) => (
                          <div key={item.number} className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-muted-foreground w-6">{item.number}</span>
                              <span className="text-sm">{item.topic}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{item.value}</span>
                              <MoreVertical className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pagination */}
                      <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t">
                        <Button variant="ghost" size="sm">
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          &lt; Đang hiển thị 1-5 trong tổng số 19 chủ đề &gt;
                        </span>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Right Panel - Search Terms */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">Cụm từ tìm kiếm</h3>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Select defaultValue="increase">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="increase">Gia tăng</SelectItem>
                            <SelectItem value="decrease">Giảm sút</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Code className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { number: 1, term: "rophim", value: "+4.700%" },
                          { number: 2, term: "f168", value: "+3.250%" },
                          { number: 3, term: "qq88", value: "+3.250%" },
                          { number: 4, term: "rr88", value: "+2.350%" },
                          { number: 5, term: "98win", value: "+1.950%" }
                        ].map((item) => (
                          <div key={item.number} className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-muted-foreground w-6">{item.number}</span>
                              <span className="text-sm">{item.term}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{item.value}</span>
                              <MoreVertical className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pagination */}
                      <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t">
                        <Button variant="ghost" size="sm">
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          &lt; Đang hiển thị 1-5 trong tổng số 25 cụm từ tìm kiếm &gt;
                        </span>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}