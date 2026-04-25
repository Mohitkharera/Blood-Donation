import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card">
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-8 sm:grid-cols-3">
        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-4">Quick Links</h3>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {["Dashboard", "Find Donors", "Blood Inventory", "Partner Hospitals", "Reports"].map(l => (
              <li key={l}><a href="#" className="hover:text-primary transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-4">Resources</h3>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {["Donation Guidelines", "Eligibility Check", "FAQs", "Privacy Policy", "Terms of Service"].map(l => (
              <li key={l}><a href="#" className="hover:text-primary transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +1 (800) 123-4567</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> support@crimsoncare.com</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-primary mt-0.5" /> 123 Medical Center Dr, Suite 100</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
