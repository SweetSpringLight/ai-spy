"use client"

import * as React from "react"
import { IconCalendar, IconFilter, IconTrendingUp } from "@tabler/icons-react"
import { format, subDays, startOfDay, endOfDay } from "date-fns"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Calendar23 from "@/components/calendar-23"

// Schema for game release data
const gameReleaseSchema = z.object({
  gameName: z.string(),
  releaseDate: z.string(),
  genre: z.string(),
  rating: z.number(),
  downloads: z.number(),
})

const studioAnalyticsSchema = z.object({
  id: z.string(),
  name: z.string(),
  country: z.string(),
  focusGenres: z.array(z.string()),
  trackingStatus: z.string(),
  totalGames: z.number(),
  averageRating: z.number(),
  gameReleases: z.array(gameReleaseSchema),
})

type StudioAnalytics = z.infer<typeof studioAnalyticsSchema>
type GameRelease = z.infer<typeof gameReleaseSchema>

// Extended type for filtered data
type StudioAnalyticsWithMetrics = StudioAnalytics & {
  releasesInRange: number
  totalDownloadsInRange: number
  averageRatingInRange: number
}

// Import studio data
const studioData = [
  {
    "id": "studio_1",
    "name": "Happy Games Studio",
    "website": "https://happygames.com",
    "country": "United States",
    "focusGenres": ["Casual", "Merge", "Puzzle"],
    "trackingStatus": "active",
    "lastGameRelease": "2024-03-15",
    "totalGames": 12,
    "averageRating": 4.5,
    "notificationSettings": {
      "newReleases": true,
      "ratings": true,
      "updates": true
    },
    "notes": "Strong in casual merge games, consistent quality",
    "competitors": ["Pixel Studio Games", "Hyper Games"],
    "recentGames": [
      "Merge Masters: Cute Pets",
      "Happy Pet Village",
      "Merge Farm Adventure"
    ],
    "gameReleases": [
      {
        "gameName": "Merge Masters: Cute Pets",
        "releaseDate": "2024-03-15",
        "genre": "Merge",
        "rating": 4.6,
        "downloads": 50000
      },
      {
        "gameName": "Happy Pet Village",
        "releaseDate": "2024-02-28",
        "genre": "Casual",
        "rating": 4.4,
        "downloads": 35000
      },
      {
        "gameName": "Merge Farm Adventure",
        "releaseDate": "2024-02-15",
        "genre": "Merge",
        "rating": 4.3,
        "downloads": 42000
      },
      {
        "gameName": "Puzzle Quest",
        "releaseDate": "2024-01-20",
        "genre": "Puzzle",
        "rating": 4.7,
        "downloads": 28000
      },
      {
        "gameName": "Cute Merge World",
        "releaseDate": "2024-01-05",
        "genre": "Merge",
        "rating": 4.5,
        "downloads": 38000
      }
    ]
  },
  {
    "id": "studio_2",
    "name": "Pixel Studio Games",
    "website": "https://pixelstudio.games",
    "country": "Canada",
    "focusGenres": ["RPG", "Roguelike", "Pixel Art"],
    "trackingStatus": "active",
    "lastGameRelease": "2024-03-14",
    "totalGames": 8,
    "averageRating": 4.8,
    "notificationSettings": {
      "newReleases": true,
      "ratings": true,
      "updates": false
    },
    "notes": "Excellent pixel art style, strong community engagement",
    "competitors": ["Retro Games Inc", "8-Bit Studios"],
    "recentGames": [
      "Pixel Dungeon Heroes",
      "Retro Quest",
      "Pixel Knights"
    ],
    "gameReleases": [
      {
        "gameName": "Pixel Dungeon Heroes",
        "releaseDate": "2024-03-14",
        "genre": "Roguelike",
        "rating": 4.9,
        "downloads": 25000
      },
      {
        "gameName": "Retro Quest",
        "releaseDate": "2024-02-25",
        "genre": "RPG",
        "rating": 4.8,
        "downloads": 18000
      },
      {
        "gameName": "Pixel Knights",
        "releaseDate": "2024-02-10",
        "genre": "RPG",
        "rating": 4.7,
        "downloads": 22000
      },
      {
        "gameName": "Dungeon Crawler",
        "releaseDate": "2024-01-15",
        "genre": "Roguelike",
        "rating": 4.6,
        "downloads": 15000
      },
      {
        "gameName": "Pixel Adventure",
        "releaseDate": "2024-01-01",
        "genre": "RPG",
        "rating": 4.5,
        "downloads": 12000
      }
    ]
  },
  {
    "id": "studio_3",
    "name": "Anime Studio Games",
    "website": "https://animestudio.games",
    "country": "Japan",
    "focusGenres": ["Action", "RPG", "Fighting"],
    "trackingStatus": "paused",
    "lastGameRelease": "2024-03-13",
    "totalGames": 15,
    "averageRating": 4.6,
    "notificationSettings": {
      "newReleases": true,
      "ratings": false,
      "updates": true
    },
    "notes": "High quality anime-style games, strong in Asian markets",
    "competitors": ["Manga Games", "Anime Warriors Studio"],
    "recentGames": [
      "Anime Battle Legends",
      "Spirit Blade",
      "Ninja Warriors"
    ],
    "gameReleases": [
      {
        "gameName": "Anime Battle Legends",
        "releaseDate": "2024-03-13",
        "genre": "Fighting",
        "rating": 4.7,
        "downloads": 45000
      },
      {
        "gameName": "Spirit Blade",
        "releaseDate": "2024-02-20",
        "genre": "Action",
        "rating": 4.6,
        "downloads": 38000
      },
      {
        "gameName": "Ninja Warriors",
        "releaseDate": "2024-02-05",
        "genre": "Action",
        "rating": 4.5,
        "downloads": 42000
      },
      {
        "gameName": "Anime RPG Quest",
        "releaseDate": "2024-01-25",
        "genre": "RPG",
        "rating": 4.4,
        "downloads": 30000
      },
      {
        "gameName": "Battle Arena",
        "releaseDate": "2024-01-10",
        "genre": "Fighting",
        "rating": 4.3,
        "downloads": 28000
      }
    ]
  },
  {
    "id": "studio_4",
    "name": "Hyper Games",
    "website": "https://hypergames.com",
    "country": "United Kingdom",
    "focusGenres": ["Racing", "Sports", "Action"],
    "trackingStatus": "active",
    "lastGameRelease": "2024-03-10",
    "totalGames": 20,
    "averageRating": 4.4,
    "notificationSettings": {
      "newReleases": true,
      "ratings": true,
      "updates": true
    },
    "notes": "Fast-paced action games, strong in racing genre",
    "competitors": ["Speed Games", "Action Studios"],
    "recentGames": [
      "Speed Racer Pro",
      "Football Champions",
      "Action Hero"
    ],
    "gameReleases": [
      {
        "gameName": "Speed Racer Pro",
        "releaseDate": "2024-03-10",
        "genre": "Racing",
        "rating": 4.5,
        "downloads": 60000
      },
      {
        "gameName": "Football Champions",
        "releaseDate": "2024-02-18",
        "genre": "Sports",
        "rating": 4.3,
        "downloads": 55000
      },
      {
        "gameName": "Action Hero",
        "releaseDate": "2024-02-01",
        "genre": "Action",
        "rating": 4.4,
        "downloads": 48000
      },
      {
        "gameName": "Racing Legends",
        "releaseDate": "2024-01-20",
        "genre": "Racing",
        "rating": 4.2,
        "downloads": 52000
      },
      {
        "gameName": "Sports Arena",
        "releaseDate": "2024-01-05",
        "genre": "Sports",
        "rating": 4.1,
        "downloads": 45000
      }
    ]
  }
]

export function StudioAnalyticsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [data, setData] = React.useState<StudioAnalytics[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [mounted, setMounted] = React.useState(false)

  // Date range state - initialize with undefined to prevent hydration mismatch
  const [dateRange, setDateRange] = React.useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  React.useEffect(() => {
    setMounted(true)
    // Set default date range after component mounts
    setDateRange({
      from: subDays(new Date(), 30),
      to: new Date(),
    })
  }, [])

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        setData(studioData)
      } catch (error) {
        console.error("Error loading studio data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Filter data based on date range
  const filteredData = React.useMemo((): StudioAnalyticsWithMetrics[] => {
    if (!dateRange.from || !dateRange.to || !mounted) {
      return data.map(studio => ({
        ...studio,
        releasesInRange: 0,
        totalDownloadsInRange: 0,
        averageRatingInRange: 0
      }))
    }

    return data.map(studio => {
      const filteredReleases = studio.gameReleases.filter(release => {
        const releaseDate = new Date(release.releaseDate)
        return releaseDate >= startOfDay(dateRange.from!) &&
               releaseDate <= endOfDay(dateRange.to!)
      })

      return {
        ...studio,
        gameReleases: filteredReleases,
        releasesInRange: filteredReleases.length,
        totalDownloadsInRange: filteredReleases.reduce((sum, release) => sum + release.downloads, 0),
        averageRatingInRange: filteredReleases.length > 0
          ? filteredReleases.reduce((sum, release) => sum + release.rating, 0) / filteredReleases.length
          : 0
      }
    })
  }, [data, dateRange, mounted])

  const columns: ColumnDef<StudioAnalyticsWithMetrics>[] = [
    {
      accessorKey: "name",
      header: "Studio Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.original.name}</span>
          <Badge variant={row.original.trackingStatus === "active" ? "default" : "secondary"}>
            {row.original.trackingStatus}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      accessorKey: "focusGenres",
      header: "Focus Genres",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.focusGenres.slice(0, 2).map((genre) => (
            <Badge key={genre} variant="outline" className="text-xs">
              {genre}
            </Badge>
          ))}
          {row.original.focusGenres.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{row.original.focusGenres.length - 2}
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "releasesInRange",
      header: "Releases",
      cell: ({ row }) => (
        <div className="text-center">
          <div className="text-lg font-semibold">{row.original.releasesInRange}</div>
          <div className="text-xs text-muted-foreground">in range</div>
        </div>
      ),
    },
    {
      accessorKey: "totalDownloadsInRange",
      header: "Downloads",
      cell: ({ row }) => (
        <div className="text-center">
          <div className="text-lg font-semibold">
            {row.original.totalDownloadsInRange.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">total</div>
        </div>
      ),
    },
    {
      accessorKey: "averageRatingInRange",
      header: "Avg Rating",
      cell: ({ row }) => (
        <div className="text-center">
          <div className="text-lg font-semibold">
            {row.original.averageRatingInRange > 0
              ? row.original.averageRatingInRange.toFixed(1)
              : "N/A"}
          </div>
          <div className="text-xs text-muted-foreground">in range</div>
        </div>
      ),
    },
    {
      accessorKey: "totalGames",
      header: "Total Games",
      cell: ({ row }) => (
        <div className="text-center">
          <div className="text-lg font-semibold">{row.original.totalGames}</div>
          <div className="text-xs text-muted-foreground">all time</div>
        </div>
      ),
    },
    {
      accessorKey: "averageRating",
      header: "Overall Rating",
      cell: ({ row }) => (
        <div className="text-center">
          <div className="text-lg font-semibold">{row.original.averageRating.toFixed(1)}</div>
          <div className="text-xs text-muted-foreground">all time</div>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex items-center justify-center h-32">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Date Range Filter */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <IconCalendar className="size-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Date Range:</Label>
          </div>

          <Calendar23
            range={dateRange}
            onRangeChange={(range) => {
              if (range && range.from && range.to) {
                setDateRange({ from: range.from, to: range.to })
              }
            }}
          />

          <Button
            variant="outline"
            size="sm"
            onClick={() => setDateRange({ from: subDays(new Date(), 7), to: new Date() })}
          >
            Last 7 days
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDateRange({ from: subDays(new Date(), 30), to: new Date() })}
          >
            Last 30 days
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDateRange({ from: subDays(new Date(), 90), to: new Date() })}
          >
            Last 90 days
          </Button>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <IconTrendingUp className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Total Releases</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">
            {filteredData.reduce((sum, studio) => sum + studio.releasesInRange, 0)}
          </p>
          <p className="text-xs text-muted-foreground">in selected range</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <IconTrendingUp className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Total Downloads</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">
            {filteredData.reduce((sum, studio) => sum + studio.totalDownloadsInRange, 0).toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">in selected range</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <IconTrendingUp className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Active Studios</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">
            {filteredData.filter(studio => studio.trackingStatus === "active").length}
          </p>
          <p className="text-xs text-muted-foreground">currently tracking</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <IconTrendingUp className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Avg Rating</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">
            {(filteredData.reduce((sum, studio) => sum + studio.averageRatingInRange, 0) /
              filteredData.filter(studio => studio.averageRatingInRange > 0).length || 0).toFixed(1)}
          </p>
          <p className="text-xs text-muted-foreground">in selected range</p>
        </Card>
      </div>

      {/* Table Controls */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Filter studios..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex items-center justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found for the selected date range.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}