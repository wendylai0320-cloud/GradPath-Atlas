import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-foreground">
      <span aria-hidden className="grid h-8 w-8 place-items-center rounded-md bg-primary font-serif text-lg text-primary-foreground">G</span>
      <span className="font-serif text-xl">GradPath Atlas</span>
    </Link>
  );
}

export function PublicHeader() {
  return (
    <header className="border-b border-border bg-background/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />
        <nav className="flex items-center gap-6 text-sm">
          <Link to="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link>
          <Link to="/auth" className="text-muted-foreground hover:text-foreground">Sign in</Link>
          <Link to="/auth" search={{ mode: "signup" }} className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90">Start planning</Link>
        </nav>
      </div>
    </header>
  );
}
