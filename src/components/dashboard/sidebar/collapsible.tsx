"use client"

import { useState, useCallback } from "react"
import { ChevronRight, Plus } from "lucide-react"

import {
  Collapsible as RadixCollapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Event } from "@/schemas/event.schema"
import { Button } from "../../ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import CreateEventModal from "./createEventModal"
import useAdminEvents from "@/stores/useAdminEvents"


const icons = [
  "👥",
  "🏖️",
  "🔍",
  "🎭",
]


export default function Collapsible() {
  const { events } = useAdminEvents();
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const handleEventClick = useCallback(
    (eventId: string) => {
      const queryString = createQueryString("event", eventId)
      router.push(`${pathname}?${queryString}`)
    },
    [createQueryString, pathname, router]
  )

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
            {events?.map((event, index) => (
              <Button variant='ghost' onClick={() => handleEventClick(event.id)} key={event.name} className={cn(
                'flex w-full items-center text-gray-700 justify-between rounded-md px-4 py-2 text-left text-sm font-medium hover:bg-gray-100',
                event.id === searchParams.get('event') && '!bg-primary !text-white hover:!bg-primary'
              )}>
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{icons[index % icons.length]}</span>
                  <span>{event.name}</span>
                </div>
              </Button>
            ))}
            <hr />
            <CreateEventModal />
          </div>
        </CollapsibleContent>
      </RadixCollapsible>
    </div>
  )
}