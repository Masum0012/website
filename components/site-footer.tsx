export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <a href="#top" className="font-heading text-lg font-bold text-foreground">
          Masum Ahmod<span className="text-primary">.</span>
        </a>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Masum Ahmod. Academic Coordinator,
          Brit Academy London.
        </p>
        <div className="flex items-center gap-5 text-sm font-medium text-muted-foreground">
          <a href="#about" className="transition-colors hover:text-foreground">
            About
          </a>
          <a href="#services" className="transition-colors hover:text-foreground">
            Services
          </a>
          <a href="#contact" className="transition-colors hover:text-foreground">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
