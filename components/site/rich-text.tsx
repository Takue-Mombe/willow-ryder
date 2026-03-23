type RichTextProps = {
  content: string;
  className?: string;
};

export function RichText({ content, className }: RichTextProps) {
  return content
    .split(/\n\n+/)
    .filter(Boolean)
    .map((paragraph) => (
      <p className={className} key={paragraph.slice(0, 48)}>
        {paragraph}
      </p>
    ));
}
