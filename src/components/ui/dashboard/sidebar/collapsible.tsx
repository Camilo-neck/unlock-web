"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"

import {
  Collapsible as RadixCollapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const childEvents = [
  { icon: "👥", name: "BigParty", selected: true },
  { icon: "🏖️", name: "SummerParty" },
  { icon: "🔍", name: "Google I/O" },
  { icon: "🎭", name: "GoFest" },
]

export default function Collapsible() {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <div className="w-full space-y-2">
      <RadixCollapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-4 py-2 text-left text-sm font-medium hover:bg-gray-100">
          <div className="flex items-center space-x-3">
            <span className="text-xl">🎉</span>
            <span className="text-gray-700">Eventos</span>
          </div>
          <ChevronRight className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? "rotate-90" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-2 space-y-2 pl-4">
            {childEvents.map((event) => (
              <div key={event.name} className={`flex items-center text-gray-700 justify-between rounded-md px-4 py-2 text-left text-sm font-medium hover:bg-gray-100 ${event.selected && '!bg-primary !text-white hover:!bg-primary'}`}>
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{event.icon}</span>
                  <span>{event.name}</span>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </RadixCollapsible>
    </div>
  )
}