import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useComments } from "./hooks/useComments.hook.ts";
import { CommentForm } from "./components/Comments/CommentForm.component";
import { CommentsList } from "./components/Comments/CommentsList.component.tsx";
import { CommentsError } from "./components/Comments/CommentsError.component.tsx";
import { LoadingScreen } from "../../../../components/UI/LoadingScreen/LoadingScreen.component";

type CommentsProps = {
  postId: string;
  isOpen: boolean;
};

export const Comments = memo(({ postId, isOpen }: CommentsProps) => {
  const {
    comments,
    isLoading,
    error,
    register,
    errors,
    handleAddComment,
    isSubmitting
  } = useComments(postId, isOpen);


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-4 space-y-4"
        >
          <CommentForm
            register={register}
            errors={errors}
            onSubmit={handleAddComment}
            isSubmitting={isSubmitting}
          />
          
          {error ? (
            <CommentsError onRetry={() => {}} />
          ) : isLoading ? (
            <LoadingScreen />
          ) : (
            <CommentsList comments={comments} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

Comments.displayName = "Comments";
