import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BlogPost } from "@/types";

const HistoryTable = ({posts}: {posts: BlogPost[]}) => {
  return (
    <div className="border rounded-md">
        <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Content</TableHead>
          <TableHead>Views</TableHead>
          <TableHead>Featured</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
            <TableRow key={post.id}>
          <TableCell>{post.title}</TableCell>
          <TableCell>{post.content}</TableCell>
          <TableCell>{post.views}</TableCell>
          <TableCell>{post.isFeatured}</TableCell>
        </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
};

export default HistoryTable;
