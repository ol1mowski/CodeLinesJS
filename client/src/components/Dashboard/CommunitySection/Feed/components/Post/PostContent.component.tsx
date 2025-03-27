import { memo } from "react";

type PostContentProps = {
  content: string;
};

export const PostContent = memo(({ content }: PostContentProps) => {
  return (
    <p 
      className="text-gray-300 mb-4 break-words overflow-hidden 
                whitespace-pre-line max-h-[300px] overflow-y-auto 
                hyphens-auto"
    >
      {content}
    </p>
  );
});

PostContent.displayName = "PostContent"; 