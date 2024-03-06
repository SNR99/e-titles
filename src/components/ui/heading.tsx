interface HeadingProps {
  title: string;
  description?: string;
}

export const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className="space-y-2">
      <h2 className=" text-2xl font-bold tracking-tight md:text-3xl">
        {title}
      </h2>

      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
