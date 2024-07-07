import { FeedbackList } from "@/components/Feedback/FeedbackList/FeedbackList";
import { useAppSelector } from "@/store/store-hooks";
import { createSuggestionsListViewmodel } from "./SuggestionsList.viewmodel";
import { Suggestions } from "@/components/Suggestions/Suggestions";
import { EmptyFeedback } from "@/components/Feedback/EmptyFeedback/EmptyFeedback";
import { TagType } from "@/Context/TagFilter/TagFilterType";
import { SortFilter } from "@/Context/SortFilter/SortFilterType";
import { FeedbackCardProps } from "@/components/Feedback/FeedbackCard/FeedbackCard";

interface SuggestionFeedbackListProps {
  tagFilter: TagType,
  sortFilter: SortFilter
}

export function SuggestionFeedbackList ({ tagFilter, sortFilter }: SuggestionFeedbackListProps) {
  const feedbackListElement = useAppSelector(createSuggestionsListViewmodel)
  const feedbacks = tagFilter === "All" ? feedbackListElement : feedbackListElement.filter(f => f.category === tagFilter)
  const sortedFeedbacks = sortFilter === SortFilter.MostUpvotes ? sortBy(feedbacks, true, "upvotes") : 
                          sortFilter === SortFilter.LeastUpvotes ? sortBy(feedbacks, false, "upvotes") :
                          sortFilter === SortFilter.MostComments ? sortBy(feedbacks, true, "comments") :
                          sortBy(feedbacks, false, "comments")
  
  return (
    <>
      <div className="md:px-10 lg:px-0">
        <Suggestions suggestionCount={sortedFeedbacks.length} />
      </div>
      <div className="px-6 py-8 md:px-10 md:py-6 lg:px-0">
        {sortedFeedbacks.length > 0 ? <FeedbackList feedbacks={sortedFeedbacks} /> : <EmptyFeedback />}
      </div>
    </>
  )
}

function sortBy (feedbacks: FeedbackCardProps[], asc: boolean, key: keyof Pick<FeedbackCardProps, "upvotes" | "comments">) {
  return feedbacks.sort((a, b) => asc ? b[key] - a[key] : a[key] - b[key])
}