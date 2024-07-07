import { SortFilterCtx } from "@/Context/SortFilter/SortFilter";
import { TagFilterCtx } from "@/Context/TagFilter/TagFilterCtx";
import Layout from "@/Layout";
import { SuggestionFeedbackList } from "@/store/feedbacks/app/SuggestionsList/SuggestionListComponent";
import { useContext } from "react";

export function FeedbackPage () {
  const { currentFilter: currentSortFilter } = useContext(SortFilterCtx)
  const { currentFilter: currentTagFilter } = useContext(TagFilterCtx)

  return (
    <Layout.withHeader>
        <SuggestionFeedbackList sortFilter={currentSortFilter} tagFilter={currentTagFilter} />
    </Layout.withHeader>
  )
}
