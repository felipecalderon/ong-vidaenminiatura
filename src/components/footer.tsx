import { FooterBottom } from "./footer/footer-bottom";
import { FooterBrand } from "./footer/footer-brand";
import { FooterContact } from "./footer/footer-contact";
import { FooterLinks } from "./footer/footer-links";
import { FooterSocial } from "./footer/footer-social";

export function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-lowest mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FooterBrand />
          <FooterLinks />
          <FooterContact />
          <FooterSocial />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}
