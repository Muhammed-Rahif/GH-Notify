function getReasonDescription(reason: string) {
    switch (reason) {
        case "assign":
            return "You were assigned to the issue.";
        case "author":
            return "You created the thread.";
        case "comment":
            return "You commented on the thread.";
        case "ci_activity":
            return "A GitHub Actions workflow run that you triggered was completed.";
        case "invitation":
            return "You accepted an invitation to contribute to the repository.";
        case "manual":
            return "You subscribed to the thread (via an issue or pull request).";
        case "mention":
            return "You were specifically @mentioned in the content.";
        case "review_requested":
            return "You, or a team you're a member of, were requested to review a pull request.";
        case "security_alert":
            return "GitHub discovered a security vulnerability in your repository.";
        case "state_change":
            return "You changed the thread state (for example, closing an issue or merging a pull request).";
        case "subscribed":
            return "You're watching the repository.";
        case "team_mention":
            return "You were on a team that was mentioned.";
        default:
            return reason ? reason : "Unknown";
    }
}

export { getReasonDescription };
