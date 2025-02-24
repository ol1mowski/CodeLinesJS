import { memo } from "react";

type PostContentProps = {
  content: string;
};

export const PostContent = memo(({ content }: PostContentProps) => (
  <p className="text-gray-300 mb-4">{content}</p>
));

PostContent.displayName = "PostContent"; 