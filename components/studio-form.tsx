"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { studioSchema } from "@/components/studio-table"
import type { z } from "zod"

type Studio = z.infer<typeof studioSchema>

export function StudioForm({
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