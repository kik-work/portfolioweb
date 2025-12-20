// src/components/ui/typography.tsx
import React from "react";

export function TypographyH1(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      className={`scroll-m-20 text-center text-4xl md:text-5xl font-extrabold tracking-tight text-foreground ${props.className || ""}`}
    />
  );
}

export function TypographyH2(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      {...props}
      className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${props.className || ""}`}
    />
  );
}

export function TypographyH3(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      {...props}
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${props.className || ""}`}
    />
  );
}

export function TypographyH4(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      {...props}
      className={`scroll-m-20 text-xl font-semibold tracking-tight ${props.className || ""}`}
    />
  );
}

export function TypographyP(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={`leading-7 not-first:mt-6 ${props.className || ""}`}
    />
  );
}
export function TypographyP2(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={`leading-7 not-first:mt-1 ${props.className || ""}`}
    />
  );
}

export function TypographyBlockquote(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <blockquote
      {...props}
      className={`mt-6 border-l-2 pl-6 italic ${props.className || ""}`}
    />
  );
}

export function TypographyList(props: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      {...props}
      className={`my-6 ml-6 list-disc [&>li]:mt-2 ${props.className || ""}`}
    />
  );
}

export function TypographyTable(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={`my-6 w-full overflow-y-auto ${props.className || ""}`}>
      {props.children}
    </div>
  );
}

export function TypographyInlineCode(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      {...props}
      className={`bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${props.className || ""}`}
    />
  );
}

export function TypographyLead(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={`text-muted-foreground text-xl ${props.className || ""}`}
    />
  );
}

export function TypographyLarge(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={`text-lg font-semibold ${props.className || ""}`} />
  );
}

export function TypographySmall(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <small {...props} className={`text-sm leading-none font-medium ${props.className || ""}`} />
  );
}

export function TypographyMuted(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p {...props} className={`text-muted-foreground text-sm ${props.className || ""}`} />
  );
}
