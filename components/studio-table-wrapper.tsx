"use client"

import * as React from "react"
import { IconPlus } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StudioForm } from "@/components/studio-form"
import { StudioTable } from "@/components/studio-table"

export function StudioTableWrapper() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <IconPlus className="mr-2 size-4" />
              Add Studio
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Studio</DialogTitle>
              <DialogDescription>
                Add a new studio to track their games and activities.
              </DialogDescription>
            </DialogHeader>
            <StudioForm
              onSubmit={(data) => {
                // Handle form submission
                console.log("New studio data:", data)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <StudioTable />
    </div>
  )
}