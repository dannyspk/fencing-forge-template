export const Footer = () => (
  <footer className="bg-background border-t border-border pt-20 pb-10">
    <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
      <div className="col-span-2">
        <span className="text-xl font-bold tracking-tight text-primary">FENCECO.</span>
        <p className="mt-4 text-muted-foreground max-w-xs">
          Building lasting perimeters across the Pacific Northwest since 1998.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-foreground mb-6">Services</h4>
        <ul className="space-y-4 text-muted-foreground text-sm">
          <li><a href="#" className="hover:text-primary transition-colors">Residential</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">Commercial</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">Custom Gates</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-foreground mb-6">Contact</h4>
        <ul className="space-y-4 text-muted-foreground text-sm" style={{ fontVariantNumeric: "tabular-nums" }}>
          <li>(555) 123-4567</li>
          <li>hello@fenceco.com</li>
          <li>123 Industrial Way, Portland OR</li>
        </ul>
      </div>
    </div>
    <div className="container mx-auto px-6 pt-8 border-t border-border/50 flex justify-between text-xs text-muted-foreground uppercase tracking-widest">
      <span>© 2024 FenceCo Inc.</span>
      <span>License #123456789</span>
    </div>
  </footer>
);
