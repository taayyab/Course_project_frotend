import { Star, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/admin/ui/button"

export function ReviewsTab() {
  const reviews = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=AJ",
      rating: 5,
      date: "2 months ago",
      text: "This course was the best investment I made this year. The hands-on approach really helped solidify my understanding.",
      helpful: 24,
      notHelpful: 2,
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40&text=MR",
      rating: 4,
      date: "1 month ago",
      text: "Great content and well-structured curriculum. The only minor issue is that some videos could be a bit shorter, but overall highly recommended!",
      helpful: 18,
      notHelpful: 1,
    },
    {
      id: 3,
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40&text=DK",
      rating: 5,
      date: "3 weeks ago",
      text: "This course transformed my data science skills. The practical approach and real-world examples made all the difference. Worth every penny!",
      helpful: 31,
      notHelpful: 0,
    },
  ]

  const ratingDistribution = [
    { stars: 5, count: 1847, percentage: 79 },
    { stars: 4, count: 376, percentage: 16 },
    { stars: 3, count: 94, percentage: 4 },
    { stars: 2, count: 18, percentage: 1 },
    { stars: 1, count: 6, percentage: 0 },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Overall Rating Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Left side - Overall rating */}
          <div className="text-center">
            <div className="text-[36px] sm:text-[48px] font-bold text-gray-900 mb-2">4.7</div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${star <= 4 ? "fill-[#fbbf24] text-[#fbbf24]" : "text-gray-300"}`}
                />
              ))}
            </div>
            <p className="text-gray-600 text-sm">2,341 reviews</p>
          </div>

          {/* Right side - Rating distribution */}
          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1 w-8 sm:w-12">
                  <span className="text-sm text-gray-600">{item.stars}</span>
                  <Star className="w-3 h-3 fill-[#fbbf24] text-[#fbbf24]" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-[#fbbf24] h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                </div>
                <span className="text-sm text-gray-600 w-6 sm:w-8">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
          <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 sm:px-6 text-sm sm:text-base">
            Add Review
          </Button>
        </div>
      </div>

      {/* Student Reviews */}
      <div>
        <h3 className="text-lg sm:text-[20px] font-bold text-gray-900 mb-4 sm:mb-6">Student Reviews</h3>

        <div className="space-y-4 sm:space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Avatar */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={review.avatar || "/placeholder.svg"}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{review.name}</h4>
                    <span className="text-xs sm:text-sm text-gray-500">{review.date}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2 sm:mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          star <= review.rating ? "fill-[#fbbf24] text-[#fbbf24]" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-gray-600 text-sm sm:text-[15px] leading-[1.6] mb-3 sm:mb-4">{review.text}</p>

                  {/* Helpful buttons */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-xs sm:text-sm">
                      <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-xs sm:text-sm">
                      <ThumbsDown className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Not helpful ({review.notHelpful})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
