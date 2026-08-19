export const PROFILE_QUERY = `
  query leetcodeDashboard($username: String!, $limit: Int) {
    allQuestionsCount {
      difficulty
      count
    }

    matchedUser(username: $username) {
      username

      socialAccounts
      githubUrl

      contributions {
        points
        questionCount
        testcaseCount
      }

      profile {
        realName
        websites
        countryName
        skillTags
        company
        school
        starRating
        aboutMe
        userAvatar
        reputation
        ranking
      }

      submissionCalendar

      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }

        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }

      badges {
        id
        displayName
        icon
        creationDate
      }

      upcomingBadges {
        name
        icon
      }

      activeBadge {
        id
      }
    }

    recentSubmissionList(
      username: $username
      limit: $limit
    ) {
      title
      titleSlug
      timestamp
      statusDisplay
      lang
    }

    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage

      badge {
        name
      }
    }
  }
`;