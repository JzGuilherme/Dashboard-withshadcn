import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ExternalLink, GitBranch } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

const DEPLOY_URL = import.meta.env.VITE_DEPLOY_URL ?? "https://example.com"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 h-4" />
        <ModeToggle />
        <h1 className="text-base font-medium">Documents</h1>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={DEPLOY_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open deployment"
          >
            <Button variant="secondary" size="sm" type="button" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Deploy
            </Button>
          </a>

          <a
            href="https://github.com/JzGuilherme"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <Button variant="outline" size="icon" type="button">
              <GitBranch className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </header>
  )
}