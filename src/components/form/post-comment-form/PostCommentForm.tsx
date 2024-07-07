import { Button } from "@/components/ui/Button/button";
import { Textarea } from "@/components/form/textarea/Textarea";

export function PostCommentForm () {
  return (
    <form className="bg-white px-8.5 py-6 rounded-2.5 flex flex-col gap-y-4">
      <p className="mb-2 text-#3A4374 text-4.5 -tracking-0.25px font-bold">Add Comment</p>
      <Textarea name="comment" rows={2} placeholder="Type your comment here" />
      <div className="flex justify-between items-center">
        <p className="text-#647196 text-3.75">250 Characters left</p>
        <button type="submit" className="w35.5">
          <Button fullWidth>Post Comment</Button>
        </button>
      </div>
    </form>
  )
}