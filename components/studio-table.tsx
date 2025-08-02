"use client"

import * as React from "react"
import {
  IconBell,
  IconBellOff,
  IconDotsVertical,
  IconEdit,
  IconExternalLink,
  IconTrash,
} from "@tabler/icons-react"
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

// Import data directly to avoid Turbopack issues
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
    ]
  }
]
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Textarea } from "@/components/ui/textarea"

// Schema for studio data
export const studioSchema = z.object({
  id: z.string(),
  name: z.string(),
  website: z.string(),
  country: z.string(),
  focusGenres: z.array(z.string()),
  trackingStatus: z.string(),
  lastGameRelease: z.string(),
  totalGames: z.number(),
  averageRating: z.number(),
  notificationSettings: z.object({
    newReleases: z.boolean(),
    ratings: z.boolean(),
    updates: z.boolean(),
  }),
  notes: z.string(),
  competitors: z.array(z.string()),
  recentGames: z.array(z.string()),
})

type Studio = z.infer<typeof studioSchema>

// Studio form for add/edit
function StudioForm({
  studio,
  onSubmit,
}: {
  studio?: Studio
  onSubmit: (data: Partial<Studio>) => void
}) {
  const [formData, setFormData] = React.useState<Partial<Studio>>(
    studio || {
      notificationSettings: {
        newReleases: true,
        ratings: true,
        updates: true,
      },
    }
  )

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
      }}
      className="grid gap-4"
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Studio Name</Label>
        <Input
          id="name"
          value={formData.name || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          type="url"
          value={formData.website || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, website: e.target.value }))
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          value={formData.country || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, country: e.target.value }))
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="status">Tracking Status</Label>
        <Select
          value={formData.trackingStatus}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, trackingStatus: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, notes: e.target.value }))
          }
        />
      </div>
      <div className="grid gap-2">
        <Label>Notification Settings</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.notificationSettings?.newReleases}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  notificationSettings: {
                    newReleases: e.target.checked,
                    ratings: prev.notificationSettings?.ratings ?? true,
                    updates: prev.notificationSettings?.updates ?? true,
                  },
                }))
              }
            />
            New Releases
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.notificationSettings?.ratings}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  notificationSettings: {
                    newReleases: prev.notificationSettings?.newReleases ?? true,
                    ratings: e.target.checked,
                    updates: prev.notificationSettings?.updates ?? true,
                  },
                }))
              }
            />
            Ratings
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.notificationSettings?.updates}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  notificationSettings: {
                    newReleases: prev.notificationSettings?.newReleases ?? true,
                    ratings: prev.notificationSettings?.ratings ?? true,
                    updates: e.target.checked,
                  },
                }))
              }
            />
            Updates
          </label>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save Changes</Button>
      </DialogFooter>
    </form>
  )
}

export function StudioTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [data, setData] = React.useState<Studio[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

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

  const columns: ColumnDef<Studio>[] = [
    {
      accessorKey: "name",
      header: "Studio Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.original.name}</span>
          <a
            href={row.original.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <IconExternalLink className="size-4" />
          </a>
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
          {row.original.focusGenres.map((genre) => (
            <Badge key={genre} variant="outline">
              {genre}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "trackingStatus",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.trackingStatus
        return (
          <Badge
            variant={
              status === "active"
                ? "default"
                : status === "paused"
                ? "secondary"
                : "outline"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "lastGameRelease",
      header: "Last Release",
      cell: ({ row }) => {
        const date = new Date(row.original.lastGameRelease)
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      },
    },
    {
      accessorKey: "totalGames",
      header: "Total Games",
    },
    {
      accessorKey: "averageRating",
      header: "Avg Rating",
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.averageRating.toFixed(1)}</Badge>
      ),
    },
    {
      accessorKey: "notificationSettings",
      header: "Notifications",
      cell: ({ row }) => {
        const settings = row.original.notificationSettings
        const enabledCount = Object.values(settings).filter(Boolean).length
        return (
          <div className="flex items-center gap-2">
            {enabledCount > 0 ? (
              <IconBell className="text-muted-foreground size-4" />
            ) : (
              <IconBellOff className="text-muted-foreground size-4" />
            )}
            <span className="text-muted-foreground text-sm">
              {enabledCount} active
            </span>
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const studio = row.original

        return (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <IconDotsVertical className="size-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <IconEdit className="mr-2 size-4" />
                    Edit
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem
                  onClick={() => {
                    setData((prev) =>
                      prev.map((item) =>
                        item.id === studio.id
                          ? {
                              ...item,
                              trackingStatus:
                                item.trackingStatus === "active"
                                  ? "paused"
                                  : "active",
                            }
                          : item
                      )
                    )
                  }}
                >
                  {studio.trackingStatus === "active" ? (
                    <IconBellOff className="mr-2 size-4" />
                  ) : (
                    <IconBell className="mr-2 size-4" />
                  )}
                  {studio.trackingStatus === "active"
                    ? "Pause Tracking"
                    : "Resume Tracking"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => {
                    setData((prev) =>
                      prev.filter((item) => item.id !== studio.id)
                    )
                  }}
                >
                  <IconTrash className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Studio</DialogTitle>
                <DialogDescription>
                  Make changes to the studio tracking configuration.
                </DialogDescription>
              </DialogHeader>
              <StudioForm
                studio={studio}
                onSubmit={(updatedData) => {
                  setData((prev) =>
                    prev.map((item) =>
                      item.id === studio.id
                        ? { ...item, ...updatedData }
                        : item
                    )
                  )
                }}
              />
            </DialogContent>
          </Dialog>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Filter studios..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuItem
                    key={column.id}
                    className="capitalize"
                    onSelect={() => column.toggleVisibility(!column.getIsVisible())}
                  >
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      className="mr-2"
                      readOnly
                    />
                    {column.id}
                  </DropdownMenuItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
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