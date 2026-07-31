import { clsx } from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
};

export function Container({ children, className, as: Tag = "div" }: Props) {
  return (
    <Tag className={clsx("mx-auto w-full max-w-[70rem] px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </Tag>
  );
}
