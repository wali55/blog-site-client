import PaginationComponent from "@/components/layout/PaginationComponent";
import HistoryTable from "@/components/modules/user/history/HistoryTable"
import { blogPostService } from "@/services/blog.service"

const HistoryPage = async ({searchParams}: {searchParams: Promise<{page: string}>}) => {
  const {page} = await searchParams;
  const {data} = await blogPostService.getPosts({page});
  const posts = data?.data || [];
  const pagination = data?.pagination || {total: 0, page: 1, limit: 10, totalPages: 1};
  return (
    <div>
        <h1 className="text-2xl mb-6">Blog History</h1>
        <HistoryTable posts={posts} />
        <PaginationComponent meta={pagination} />
    </div>
  )
}

export default HistoryPage