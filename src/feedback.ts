import { CommentProps } from "./components/Comment/Comment"

export const feedbacks: {id: string, title: string, category: "ui" | "ux" | "enhancement" | "feature" | "bug", description: string, upvotes: number, comments: number}[] = [
  {
    id: "1",
    title: "Add tags for solutions",
    description: "Easier to search for solutions based on a specific stack.",
    category: "enhancement",
    upvotes: 112,
    comments: 2
  },
  {
    id: "2",
    title: "Add a dark theme option",
    description: "It would help people with light sensitivities and who prefer dark mode.",
    category: "feature",
    upvotes: 99,
    comments: 4
  },
  {
    id: "3",
    title: "Q&A within the challenge hubs",
    description: "Challenge-specific Q&A would make for easy reference.",
    category: "feature",
    upvotes: 65,
    comments: 2
  },
  {
    id: "4",
    title: "Allow image/video upload",
    description: "Images and screencasts can enhance comments on solutions.",
    category: "enhancement",
    upvotes: 51,
    comments: 2
  },
  {
    id: "5",
    title: "Ability to follow others",
    description: "Stay updated on comments and solutions other people post.",
    category: "feature",
    upvotes: 42,
    comments: 3
  },
  {
    id: "6",
    title: "Preview images not loading",
    description: "Challenge preview images are missing when you apply a filter.",
    category: "bug",
    upvotes: 3,
    comments: 0
  }
]

export const comments: CommentProps[] = [{
  comment: "Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.",
  fullName: "Elijah Moss",
  imageUrl: "https://placehold.co/40x40",
  username: "@hexagon.bestagon"
}, {
  comment: "Second this! I do a lot of late night coding and reading. Adding a dark theme can be great for preventing eye strain and the headaches that result. It’s also quite a trend with modern apps and  apparently saves battery life.",
  fullName: "James Skinner",
  imageUrl: "https://placehold.co/40x40",
  username: "@hummingbird1"
},
{
  comment: "@hummingbird1  While waiting for dark mode, there are browser extensions that will also do the job. Search for ”dark theme” followed by your browser. There might be a need to turn off the extension for sites with naturally black backgrounds though.",
  fullName: "Anne Valentine",
  imageUrl: "https://placehold.co/40x40",
  username: "@annev1990"
}]