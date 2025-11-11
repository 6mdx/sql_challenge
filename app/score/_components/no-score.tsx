import { ArrowRight, OctagonAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import Link from "next/link"

export function EmptyScore() {
  return (
    <Empty className="relative h-[calc(100vh-10rem)]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <OctagonAlert />
        </EmptyMedia>
        <EmptyTitle>No Score</EmptyTitle>
        <EmptyDescription>
          Start a challenge to see your score.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link href="/challenges">
            START CHALLENGES <ArrowRight />
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  )
}
