const links = [
  { label: "GitHub", href: "https://github.com/kik-work" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/khairul-islam-kakon-12618222a/" },
  { label: "YouTube", href: "https://www.youtube.com/@kikKakon" },
  { label: "Facebook", href: "https://www.facebook.com/share/17XSYL6Q7R/?mibextid=wwXIfr" },
];

const Footer = () => {
  return (
    <footer className="surface-alt border-t border-hairline">
      <div className="shell py-8 text-xs leading-relaxed text-muted-foreground">
        <p className="border-b border-hairline pb-4">
          More ways to connect: email{" "}
          <a href="mailto:kakon.aiubcse@gmail.com" className="text-link underline underline-offset-2">
            kakon.aiubcse@gmail.com
          </a>{" "}
          or call{" "}
          <a href="tel:+8801923089370" className="text-link underline underline-offset-2">
            +880 1923-089370
          </a>
          .
        </p>
        <div className="flex flex-col gap-3 pt-4 md:flex-row md:items-center md:justify-between">
          <p>Copyright © {new Date().getFullYear()} Khairul Islam Kakon. All rights reserved.</p>
          <ul className="flex flex-wrap items-center">
            {links.map((link, i) => (
              <li key={link.label} className="flex items-center">
                {i > 0 && <span aria-hidden="true" className="mx-2.5 h-3 w-px bg-border" />}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 text-foreground/80 transition-colors hover:text-foreground hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
