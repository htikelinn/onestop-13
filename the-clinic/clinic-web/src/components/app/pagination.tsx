import { PagerInfo } from "@/lib/model/common.model";
import { PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationPrevious, Pagination as UIPagination} from "@/components/ui/pagination"
import { ArrowLeft, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Pagination({info} : {info: PagerInfo}) {
    return (
        <UIPagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationFirst />
                </PaginationItem>

                {info.links[0] > 0 &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                }

                {info.links.map(item => 
                    <PaginationItem key={item}>
                        <PaginationLink isActive={item == info.page} href="">{item + 1}</PaginationLink>
                    </PaginationItem>
                )}

                {info.links[info.links.length - 1] < info.totalPage - 1 &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                }

                <PaginationItem>
                    <PaginationLast />
                </PaginationItem>
            </PaginationContent>
        </UIPagination>
    )
}

function PaginationFirst({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">First</span>
    </PaginationLink>
  )
}

function PaginationLast({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Last</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}
