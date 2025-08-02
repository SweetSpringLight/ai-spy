"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
// import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Calendar23Props {
  range?: DateRange
  onRangeChange?: (range: DateRange | undefined) => void
  label?: string
}

export default function Calendar23({ range, onRangeChange}: Calendar23Props) {
  const [internalRange, setInternalRange] = React.useState<DateRange | undefined>(range)

  const handleRangeChange = (newRange: DateRange | undefined) => {
    setInternalRange(newRange)
    onRangeChange?.(newRange)
  }

  React.useEffect(() => {
    setInternalRange(range)
  }, [range])

  return (
    <div className="flex flex-col gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="dates"
            className="w-56 justify-between font-normal"
          >
            {internalRange?.from && internalRange?.to
              ? `${internalRange.from.toLocaleDateString()} - ${internalRange.to.toLocaleDateString()}`
              : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            selected={internalRange}
            captionLayout="dropdown"
            onSelect={(range) => {
              handleRangeChange(range)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
